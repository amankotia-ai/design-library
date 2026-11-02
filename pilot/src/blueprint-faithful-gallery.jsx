import {useEffect} from 'react';
import {withBase} from './base.js';

let programsRequest;
const resourceCache=new Map();
const resourceUrl=value=>value?.startsWith('/landing/')?withBase('/blueprint-source'+value):value;
const FONT_FILES={
 'g:jetbrains-mono':{path:withBase('/blueprint-source/api/fonts/google/ofl/jetbrainsmono/JetBrainsMono%5Bwght%5D.ttf'),family:'JetBrains Mono',weight:[100,800]},
 'g:space-grotesk':{path:withBase('/blueprint-source/api/fonts/google/ofl/spacegrotesk/SpaceGrotesk%5Bwght%5D.ttf'),family:'Space Grotesk',weight:[300,700]},
};
function programs(){
 if(!programsRequest)programsRequest=fetch(withBase('/blueprint-source/gallery-programs.json')).then(r=>{if(!r.ok)throw Error('Source preview programs are unavailable.');return r.json()}).catch(error=>{programsRequest=null;throw error});
 return programsRequest;
}
function resource(url){
 if(!resourceCache.has(url))resourceCache.set(url,fetch(url).then(async r=>{if(!r.ok)throw Error('Source preview asset is unavailable: '+url);return {bytes:await r.arrayBuffer(),type:r.headers.get('content-type')||''}}).catch(error=>{resourceCache.delete(url);throw error}));
 return resourceCache.get(url);
}
function parameters(program){
 const controls=(program.spec.sections||[]).flatMap(section=>section.controls||[]),params={};
 for(const control of controls)if(control.default!==undefined)params[control.key]=control.default;
 Object.assign(params,program.start||{});
 for(const control of controls)if(['slider','seed'].includes(control.type)&&params[control.key]!==undefined)params[control.key]=Number(params[control.key]);
 return {controls,params};
}
async function assetsFor(controls,params){
 const images=[],fonts=[];
 for(const control of controls){
  if(control.type==='image'&&typeof params[control.key]==='string'&&params[control.key]){
   const url=resourceUrl(params[control.key]);const data=await resource(url);const bitmap=await createImageBitmap(new Blob([data.bytes],{type:data.type||'image/png'}));images.push({key:control.key,id:url,bitmap});
  }
  if(control.type==='type'){
   let value=params[control.key];try{if(typeof value==='string')value=JSON.parse(value)}catch{throw Error('The source type setting could not be read.')}
   const id=value?.font;if(!id||id.startsWith('sys:')){fonts.push({key:control.key,id:null});continue}
   const info=FONT_FILES[id];if(!info)throw Error('The exact source preview font is unavailable: '+id);
   const data=await resource(info.path);fonts.push({key:control.key,id,face:{id,family:info.family,weight:info.weight,italic:false,axes:[]},bytes:data.bytes});
  }
 }
 return {images,fonts};
}

/** Reconnect the original gallery tools inside the source's network-isolated
 * rendering bridge. Preserved thumbnails remain visible until rendered ACKs;
 * failures keep that exact still rather than revealing an empty substitute. */
export function useSourceGalleryPreviews(hostRef){
 useEffect(()=>{
  const root=hostRef.current;if(!root)return;
  let disposed=false;const states=[],ownedWindows=new Map();const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const status=document.createElement('span');status.className='sr-only';status.setAttribute('role','status');root.append(status);
  const send=(state,message,transfer=[])=>state.frame?.contentWindow?.postMessage(message,'*',transfer);
  const fit=state=>{if(!state.inner)return;const {width,height}=state.thumb.getBoundingClientRect();if(!width||!height)return;const scale=Math.max(1,700/Math.max(width,height));state.inner.style.width=width*scale+'px';state.inner.style.height=height*scale+'px';state.inner.style.transform=`scale(${1/scale})`};
  const shouldPlay=state=>state.hovered&&state.visible&&!document.hidden&&!reduced.matches&&Boolean(state.program?.animated??state.program?.spec?.animated);
  function destroy(state){
   state.generation++;clearTimeout(state.timer);if(state.frame){send(state,{type:'play',playing:false});ownedWindows.delete(state.frame.contentWindow)}state.layer?.remove();state.layer=null;state.inner=null;state.frame=null;state.initialized=false;state.rendered=false;state.thumb.removeAttribute('data-live');if(!state.failed)state.thumb.dataset.previewState='idle';
  }
  function fail(state,error){
   if(disposed)return;state.failed=true;const message=error?.message||String(error||'The source live preview could not render.');state.thumb.dataset.previewError=message;state.thumb.dataset.previewState='fallback';status.textContent=state.name+': live preview unavailable; the preserved source thumbnail remains visible.';destroy(state);
  }
  async function initialize(state){
   if(state.initialized||!state.frame||!state.program)return;state.initialized=true;const generation=state.generation;
   try{
    const {controls,params}=parameters(state.program),assets=await assetsFor(controls,params);
    if(disposed||!state.frame||generation!==state.generation){for(const image of assets.images)image.bitmap.close?.();return}
    // Image state is retained by the bridge across load. Supplying it first
    // lets source setup hooks see the actual imported logo on their first run.
    for(const image of assets.images)send(state,{type:'image',...image,batch:true},[image.bitmap]);
    send(state,{type:'load',code:state.program.spec.code,renderer:state.program.spec.renderer,animated:Boolean(state.program.animated??state.program.spec.animated),params,resolution:1,imageKeys:controls.filter(c=>c.type==='image').map(c=>c.key),typeKeys:controls.filter(c=>c.type==='type').map(c=>c.key),listKeys:controls.filter(c=>c.type==='images').map(c=>c.key)});
    for(const font of assets.fonts)send(state,{type:'font',...font,batch:true});
    send(state,{type:'params',params,interactive:false});send(state,{type:'play',playing:shouldPlay(state)});fit(state);
   }catch(error){if(generation===state.generation&&state.frame)fail(state,error)}
  }
  async function activate(state){
   if(disposed||!state.hovered||!state.visible||state.frame||state.loading)return;
   state.failed=false;state.loading=true;state.thumb.dataset.previewState='loading';delete state.thumb.dataset.previewError;
   try{
    const list=await programs();if(disposed||!state.hovered||!state.visible)return;
    state.program=list.find(p=>p.name===state.name);if(!state.program)throw Error('The source program for this example was not recovered.');if(reduced.matches&&!state.program.interactive){state.thumb.dataset.previewState='idle';return}
    const layer=document.createElement('div'),inner=document.createElement('div'),frame=document.createElement('iframe');layer.className='frame-fit thumb-live';inner.className='frame-fit-inner';frame.className='tool-frame';frame.title=state.name+' live preview';frame.tabIndex=-1;frame.setAttribute('sandbox','allow-scripts');frame.referrerPolicy='no-referrer';frame.style.pointerEvents='none';frame.src=withBase('/blueprint-source/op-art.html');
    state.layer=layer;state.inner=inner;state.frame=frame;state.initialized=false;state.rendered=false;state.generation++;state.thumb.toggleAttribute('data-interactive',Boolean(state.program.interactive));inner.append(frame);layer.append(inner);state.thumb.append(layer);ownedWindows.set(frame.contentWindow,state);fit(state);frame.addEventListener('load',()=>initialize(state),{once:true});
    state.timer=setTimeout(()=>{if(state.frame&&!state.rendered)fail(state,Error('The source renderer did not acknowledge a completed frame.'))},10000);
   }catch(error){fail(state,error)}finally{state.loading=false}
  }
  const message=event=>{const state=ownedWindows.get(event.source);if(!state||event.source!==state.frame?.contentWindow)return;const data=event.data;if(!data||typeof data!=='object')return;if(data.type==='ready')initialize(state);else if(data.type==='rendered'&&state.initialized){state.rendered=true;clearTimeout(state.timer);state.thumb.dataset.previewState='ready';state.thumb.setAttribute('data-live','');state.frame.style.pointerEvents=state.program.interactive?'auto':'none'}else if(data.type==='error')fail(state,Error(data.message||data.error||'The source renderer reported an error.'))};
  window.addEventListener('message',message);
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){const state=states.find(s=>s.thumb===entry.target);if(!state)continue;state.visible=entry.isIntersecting;if(state.visible){if(state.hovered)activate(state)}else destroy(state)}},{threshold:.01});
  const resizer=new ResizeObserver(entries=>{for(const entry of entries){const state=states.find(s=>s.thumb===entry.target);if(state)fit(state)}});
  for(const card of root.querySelectorAll('.g-card')){
   const thumb=card.querySelector('.thumb'),name=card.querySelector('.g-card-name')?.textContent.trim();if(!thumb||!name)continue;
   const state={card,thumb,name,hovered:false,visible:false,program:null,frame:null,inner:null,layer:null,generation:0,initialized:false,rendered:false,failed:false,loading:false,timer:null};thumb.removeAttribute('data-live');thumb.dataset.previewState='idle';
   state.enter=()=>{state.hovered=true;activate(state)};state.leave=()=>{state.hovered=false;destroy(state)};state.focus=()=>{state.hovered=true;activate(state)};state.blur=event=>{if(!card.contains(event.relatedTarget)){state.hovered=false;destroy(state)}};
   card.addEventListener('pointerenter',state.enter);card.addEventListener('pointerleave',state.leave);card.addEventListener('focusin',state.focus);card.addEventListener('focusout',state.blur);states.push(state);observer.observe(thumb);resizer.observe(thumb);
  }
  const updatePlayback=()=>{for(const state of states){if(reduced.matches&&!state.program?.interactive)destroy(state);else if(state.frame)send(state,{type:'play',playing:shouldPlay(state)});else if(state.hovered&&state.visible)activate(state)}};
  reduced.addEventListener('change',updatePlayback);document.addEventListener('visibilitychange',updatePlayback);
  return()=>{disposed=true;observer.disconnect();resizer.disconnect();window.removeEventListener('message',message);reduced.removeEventListener('change',updatePlayback);document.removeEventListener('visibilitychange',updatePlayback);for(const state of states){state.card.removeEventListener('pointerenter',state.enter);state.card.removeEventListener('pointerleave',state.leave);state.card.removeEventListener('focusin',state.focus);state.card.removeEventListener('focusout',state.blur);destroy(state)}status.remove()};
 },[hostRef]);
}
