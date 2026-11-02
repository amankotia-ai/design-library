import React,{useLayoutEffect,useRef,useState} from 'react';
import sourceParts from './steel-source-parts.json';
import mobileParts from './steel-mobile-parts.json';
import {rebase,withBase} from './base.js';
const source=rebase(sourceParts),mobileSource=rebase(mobileParts);

// Source DOM is split into portable section fragments; fonts, tokens, and media stay shared.
const styleObject=text=>Object.fromEntries((text||'').split(';').filter(Boolean).map(x=>{const i=x.indexOf(':');const key=x.slice(0,i).trim();return[key.startsWith('--')?key:key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),x.slice(i+1).trim()]}));
export function SteelSection({id,mobile=false}){
 const ref=useRef(null);
 const [status,setStatus]=useState('');
 async function activate(event){
  const button=event.target.closest('button');if(!button)return;
  if(button.hasAttribute('data-use-case')){
   const description=ref.current.querySelector(`[id="${button.getAttribute('aria-describedby')}"]`);
   setStatus(description?.textContent||button.textContent);return;
  }
  if(button.getAttribute('aria-label')?.includes('Copy')||button.dataset.analytics==='copy-agent-prompt'){
   try{await navigator.clipboard.writeText(button.dataset.analytics==='copy-agent-prompt'?'Use Steel browser infrastructure to search the web and summarize the results. See https://docs.steel.dev/ for setup.':'npm install -g @steel-dev/cli');setStatus('Copied to clipboard.');}catch{setStatus('Copy unavailable. Select the command text to copy it.');}return;
  }
  const panelId=button.getAttribute('aria-controls');
  if(panelId){
   const panel=ref.current.querySelector(`[id="${panelId}"]`);if(!panel)return;
   const expanded=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(expanded));
   panel.removeAttribute('inert');panel.hidden=!expanded;
   if(expanded){panel.dataset.steelOpen='';if(button.getAttribute('aria-label')==='Menu'){panel.dataset.steelMenu='';panel.style.top='110px';}panel.querySelectorAll('[inert]').forEach(e=>e.removeAttribute('inert'));}else delete panel.dataset.steelOpen;
   if(expanded)panel.style.cssText+=';display:block;opacity:1;visibility:visible;clip-path:none;transform:none;max-height:80vh;overflow:auto;background:var(--bg);position:absolute;z-index:40;min-width:220px;padding:20px;';
  }
 }
 const markup=(mobile?mobileSource:source).parts[id]||'';
 const parsed=new DOMParser().parseFromString(markup,'text/html');
 const element=parsed.body.children.length===1?parsed.body.firstElementChild:null;
 const attributes=element?Object.fromEntries([...element.attributes].map(a=>[a.name==='class'?'className':a.name,a.name==='style'?styleObject(a.value):a.value])):{className:'contents'};
 const Tag=element?.tagName.toLowerCase()||'div';
 return <><Tag {...attributes} ref={ref} data-steel-section={id} onClick={activate} dangerouslySetInnerHTML={{__html:element?element.innerHTML:markup}}/>{status&&<p className="steel-action-status" role="status">{status}</p>}</>;

}
export function SteelStudy({view='steel-page'}){
 const [ready,setReady]=useState(false);const [mobile,setMobile]=useState(innerWidth<768);
 useLayoutEffect(()=>{
  // Each standalone preview is a document. Do not mix the library's CSS with source utility layers.
  document.querySelectorAll('style[data-vite-dev-id],link[rel="stylesheet"]').forEach(n=>n.remove());
  for(const [key,value] of Object.entries(source.html))document.documentElement.setAttribute(key,Array.isArray(value)?value.join(' '):value);
  document.documentElement.dataset.steelStudy='';
  if(new URLSearchParams(location.search).has('embed'))document.documentElement.dataset.steelEmbed='';
  document.body.className=source.body.class.join(' ');document.body.setAttribute('data-pastel-dark','');
  const link=document.createElement('link');link.rel='stylesheet';link.href=withBase('/steel-source/source.css');link.onload=()=>setReady(true);document.head.append(link);
  const tokens=document.createElement('link');tokens.rel='stylesheet';tokens.href=withBase('/steel-source/tokens.css');document.head.append(tokens);
  const local=document.createElement('link');local.rel='stylesheet';local.href=withBase('/steel-source/layout.css');document.head.append(local);
  document.title='Steel — Design Library';
  const sizing=new ResizeObserver(()=>{setMobile(innerWidth<768);parent.postMessage({type:'steel-preview-height',height:document.body.scrollHeight},location.origin)});sizing.observe(document.body);
  return()=>sizing.disconnect();
 },[]);
 const page=view==='steel-page';
 const attrs={'data-experiment-2':'','data-pastel-dark':'',className:`steel-study ${page?'steel-complete':'steel-standalone'}`,style:Object.fromEntries(source.experiment.style.split(';').filter(Boolean).map(x=>{const i=x.indexOf(':');return[x.slice(0,i).trim(),x.slice(i+1).trim()]}))};
 return <div {...attrs} style={{...attrs.style,visibility:ready?'visible':'hidden'}}>{page?<><SteelSection id="steel-header" mobile={mobile}/><SteelSection id="steel-hero" mobile={mobile}/><main className="flex-1">{source.ids.slice(2,-1).map(id=><SteelSection key={id} id={id} mobile={mobile}/>)}</main><SteelSection id="steel-footer" mobile={mobile}/></>:view==='steel-hero'?<><SteelSection id="steel-header" mobile={mobile}/><SteelSection id="steel-hero" mobile={mobile}/></>:<SteelSection id={view} mobile={mobile}/>}</div>;
}
export function SteelSourceNotes(){return <section className="steel-source-notes"><h2>Steel references</h2><p><a href="https://steel.dev" target="_blank" rel="noreferrer">Steel’s public landing page ↗</a> was captured with REA at 1440 × 1000 and inspected at 390 × 844. Source fonts, SVG artwork, responsive utility styles, and the public hero program are retained for this local study.</p><p>FAQ disclosures, navigation toggles, and clipboard controls run locally. Animated product scenes are retained as settled illustrations; the use-case field is a responsive adaptation. Accounts, browsers, billing and backend services remain on Steel.</p></section>}
