'use strict';
const $=s=>document.querySelector(s);
const recipes={
 editorial:{name:'Offset editorial',note:'A quiet text rail, an intentional blank column, and a photograph below.',material:'portrait',offset:1,ratio:'portrait'},
 product:{name:'Quiet commerce',note:'A generous image window, compact details, and a clear purchase row.',material:'linen',offset:0,ratio:'square'},
 index:{name:'Image index',note:'Paired images for mobile scanning; four images across on desktop.',material:'landscape',offset:0,ratio:'portrait'},
 campaign:{name:'Full-frame campaign',note:'The image carries the page. A short title anchors its lower edge.',material:'portrait',offset:0,ratio:'portrait'},
 split:{name:'Split feature',note:'A title, a small detail and a dominant image meet on a shared horizontal band.',material:'linen',offset:0,ratio:'square'},
 rail:{name:'Image + index',note:'A compact image rail sits beside a numbered index, including on mobile.',material:'portrait',offset:0,ratio:'portrait'}
};
const initial={preset:'editorial',material:'portrait',columns:4,font:'sans',margin:20,gutter:8,offset:1,ratio:'portrait',paper:'light',grid:true,rows:true,unit:4,rowMultiple:8,device:'mobile',compare:false};let state={...initial};let baseline={...initial};
const materialCopy={portrait:{title:'Studies in<br>stillness.',name:'The everyday shirt',description:'An exploration of form and presence. Soft light, natural cloth, and a moment held still. A small study in how the ordinary becomes worth looking at.',detail:'Charcoal linen / Studio collection',price:'€148'},linen:{title:'Material<br>matters.',name:'The linen study',description:'A collection shaped by touch. Woven linen, softened edges, and the small irregularities that make a material feel alive. Made to be lived with, season after season.',detail:'Natural linen / Material study',price:'€96'},landscape:{title:'Somewhere,<br>slowly.',name:'The coastal journal',description:'A record of places where time stretches out. Wind across the grass, a house on the headland, and the quiet distance between one horizon and the next.',detail:'Faroe Islands / Field journal',price:'€32'}};
materialCopy.linen.studyDescription='A study of natural cloth, observed through touch and light. The weave stays visible: loose threads, folded edges, and the small irregularities that give linen its character. Each photograph moves between the complete form and a close detail of the surface. Soft daylight reveals the weight of the fabric without hiding its texture. The material is left to settle into its own shape, quietly changing from one frame to the next.';
const asset=name=>`assets/${name}.webp`;
const image=(name,cls='p-photo')=>`<img class="${cls}" src="${asset(name)}" alt="${name==='linen'?'Sculptural natural linen':name==='portrait'?'Editorial fashion portrait':'Remote coastal landscape'}">`;

// Geometry is calculated before content is rendered; no content-edge tracing.
function renderComposition(s,g=GridMath.calculate(s,materialCopy[s.material])){
 const copy=materialCopy[s.material],imgs=[s.material,...['portrait','linen','landscape'].filter(x=>x!==s.material),s.material];
 function content(b){
  switch(b.type){
   case 'header':return '<span>FORME — STUDIO</span><span>'+ (s.preset==='product'?'BAG (0)':'MENU [+]')+'</span>';
   case 'footer':return '<span>INDEPENDENT STUDIES</span><span>© 2026</span>';
   case 'title':case 'campaign-title':return `<h3>${copy.title}</h3>`;
   case 'index-title':return '<h3>Selected<br>observations.</h3>';
   case 'copy':return `<p>${copy.description}</p>`;
   case 'study-copy':return `<p>${copy.studyDescription||copy.description}</p>`;
   case 'image':return image(s.material,'math-photo');
   case 'project-photo':return image(s.material,'math-photo').replace('<img ',`<img style="object-position:${b.position}" `);
   case 'project-data':return '<dl><div><dt>Project</dt><dd>The coastal journal</dd></div><div><dt>Year</dt><dd>2026</dd></div><div><dt>Category</dt><dd>Landscape</dd></div><div><dt>Location</dt><dd>Faroe Islands</dd></div></dl>';
   case 'detail-image':return image(s.material==='linen'?'portrait':'linen','math-photo');
   case 'tile':return image(imgs[b.index],'math-photo');
   case 'tile-caption':return `<span>0${b.index+1} / ${imgs[b.index].toUpperCase()}</span><span>2026</span>`;
   case 'caption':return `<span>${copy.detail}</span><span>01 / 03</span>`;
   case 'product-title':return `<h3>${copy.name}</h3><span>${copy.price}</span>`;
   case 'detail':return `<span>${b.label}</span><span>+</span>`;
   case 'sizes':return '<span>XS</span><span>S</span><span>M</span><span>L</span><span>XL</span>';
   case 'action':return `<span>ADD TO BAG — DEMO</span><span>${copy.price}</span>`;
   case 'text-index':return `<p class="math-index-label">INDEX / 03</p>${imgs.slice(0,3).map((a,i)=>`<div class="math-index-item ${i===0?'active':''}"><span>0${i+1}</span><span>${materialCopy[a].name}</span></div>`).join('')}<p class="math-index-note">Three observations on form, material, and place.</p>`;
  }
 }
 const blocks=g.blocks.map(b=>`<div class="math-box math-${b.type}" data-block="${b.id}" data-row="${b.row}" data-row-span="${b.rows}" data-col="${b.col}" data-col-span="${b.span}" style="grid-column:${b.col} / span ${b.span};grid-row:${b.row*g.multiple+1} / span ${b.rows*g.multiple}">${content(b)}</div>`).join('');
 const columns=`<div class="p-grid" aria-hidden="true">${Array.from({length:g.columns},(_,i)=>`<span data-n="${String(i+1).padStart(2,'0')}"></span>`).join('')}</div>`;
 const rows=`<div class="p-rows" aria-hidden="true">${Array.from({length:g.rowCount*g.multiple+1},(_,i)=>`<div class="p-row ${i%g.multiple===0?'major':'minor'}" style="top:${i*g.unit}px">${i%g.multiple===0?`<span>R${String(i/g.multiple).padStart(2,'0')} · ${i*g.unit}</span>`:''}</div>`).join('')}</div>`;
 return blocks+columns+rows;
}
function fitComposition(el,available){
 const scale=Math.min(1,Math.max(1,available)/Number(el.dataset.designWidth));el.style.transform=`scale(${scale})`;el.dataset.previewScale=scale.toFixed(5);const slot=el.parentElement;slot.style.width=(Number(el.dataset.designWidth)*scale)+'px';slot.style.height=(Number(el.dataset.designHeight)*scale)+'px';return scale;
}
function fitPreviews(){
 const stage=$('.preview-stage'),items=[...stage.querySelectorAll('.preview:not([hidden])')],available=(stage.clientWidth-(items.length-1)*24)/items.length;
 items.forEach(el=>fitComposition(el,available));
 const main=$('#preview'),scale=Number(main.dataset.previewScale),width=Number(main.dataset.designWidth);
 $('.measurement').style.width=(width*scale)+'px';
}
const stageObserver=new ResizeObserver(fitPreviews);
function applyPreview(el,s){
 const g=GridMath.calculate(s,materialCopy[s.material]);
 el.className=`preview math-preview ${s.preset} ${s.font==='serif'?'serif':''} ${s.paper==='dark'?'ink':''} ${s.grid?'':'no-grid'} ${s.rows===false?'no-rows':''} ${s.device==='desktop'?'desktop':''}`;
 el.dataset.designWidth=g.width;el.dataset.designHeight=g.height;el.dataset.unit=g.unit;el.dataset.rowPitch=g.pitch;el.dataset.margin=g.margin;
 el.style.cssText=`width:${g.width}px;height:${g.height}px;--unit:${g.unit}px;--row-pitch:${g.pitch}px;--grid-units:${g.rowCount*g.multiple};--columns:${g.columns};--column-size:${g.column}px;--gutter:${g.gutter}px;--margin:${g.margin}px;--body-size:${g.bodySize}px;--body-line:${g.bodyLine}px;--body-weight:${g.bodyWeight};--title-size:${g.titleSize}px;--title-line:${g.titleLine}px;--title-family:var(--font-${g.titleFamily});--title-weight:${g.titleWeight};--title-stretch:${g.titleStretch}%;--meta-size:${g.metaSize}px;--meta-line:${g.metaLine}px`;
 el.innerHTML=renderComposition(s,g);return g;
}
function renderLab(){
 state.margin=Math.min(8*state.unit,Math.max(2*state.unit,Math.round(state.margin/state.unit)*state.unit));state.gutter=Math.min(6*state.unit,Math.max(state.unit,Math.round(state.gutter/state.unit)*state.unit));
 for(const [id,min,max] of [['margin',2,8],['gutter',1,6]]){const input=$('#'+id);input.min=min*state.unit;input.max=max*state.unit;input.step=state.unit;}
 for(const id of ['preset','columns','font','margin','gutter','offset','ratio','paper','unit','rowMultiple'])$(`#${id}`).value=state[id];
 $('#offset').disabled=state.preset!=='editorial'||state.device==='desktop';$('#ratio').disabled=['campaign','split'].includes(state.preset)||(state.device==='desktop'&&state.preset==='editorial');
 $('#rows').checked=state.rows;$('#rows').disabled=!state.grid;
 $('#grid').checked=state.grid;$('#compare').checked=state.compare;
 document.querySelectorAll('[data-material]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.material===state.material));
 document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.device===state.device));
 $('#margin-value').textContent=`${state.margin} px · ${state.margin/state.unit}u`;$('#gutter-value').textContent=`${state.gutter} px · ${state.gutter/state.unit}u`;$('#offset-value').textContent=state.offset+' col';
 $('#recipe-note').textContent=recipes[state.preset].note;$('#settings-summary').textContent=`${state.unit} px unit · ${state.unit*state.rowMultiple} px rows`;

 $('#canvas-caption').textContent=`${recipes[state.preset].name.toUpperCase()} / ${state.columns} COLUMNS${state.grid&&state.rows?' + HORIZONTAL ROWS':''}${state.compare?' · ORIGINAL AT RIGHT':''}`;
 const g=applyPreview($('#preview'),state);$('#comparison').hidden=!state.compare;$('#comparison').parentElement.hidden=!state.compare;
 $('.measurement').innerHTML=[0,g.width/4,g.width/2,g.width*3/4,g.width].map(n=>`<span>${n}</span>`).join('');
 $('#grid-calculation').innerHTML=`<p class="numeric-label">CALCULATED GRID · DESIGN PIXELS</p><dl><div><dt>Base unit</dt><dd>${g.unit} px</dd></div><div><dt>Row pitch</dt><dd>${g.multiple}u = ${g.pitch} px</dd></div><div><dt>Column width</dt><dd>${g.column/g.unit}u = ${g.column} px</dd></div><div><dt>Canvas</dt><dd>${g.width} × ${g.height}</dd></div></dl><p class="grid-equation">W = 2M + NC + (N−1)G<br>${2*g.margin} + ${g.columns}×${g.column} + ${g.columns-1}×${g.gutter} = ${g.width} px</p><p class="grid-equation">H = 2M + RP<br>${2*g.margin} + ${g.rowCount}×${g.pitch} = ${g.height} px</p><p class="grid-equation">x(c) = ${g.margin} + c×${g.column+g.gutter}<br>y(r) = ${g.margin} + r×${g.pitch}</p><p class="grid-calculation-note">c and r start at zero. Blocks occupy whole rows and columns. Image heights round up to the next row; crops adapt.</p>`;
 $('.preview-stage').classList.toggle('is-comparing',state.compare);
 if(state.compare)applyPreview($('#comparison'),{...baseline,device:state.device,columns:state.device==='desktop'?12:4});
 fitPreviews();
 $('#export-status').textContent='';$('#export-status').hidden=true;
}
function setRecipe(preset){state={...state,preset,material:recipes[preset].material,offset:recipes[preset].offset,ratio:recipes[preset].ratio};baseline={...state};renderLab();}
for(const id of ['columns','font','margin','gutter','offset','ratio','paper','unit','rowMultiple'])$(`#${id}`).addEventListener('input',e=>{state[id]=['columns','margin','gutter','offset','unit','rowMultiple'].includes(id)?Number(e.target.value):e.target.value;renderLab();});
$('#preset').addEventListener('change',e=>setRecipe(e.target.value));
$('#rows').addEventListener('change',e=>{state.rows=e.target.checked;renderLab();});
$('#grid').addEventListener('change',e=>{state.grid=e.target.checked;renderLab();});$('#compare').addEventListener('change',e=>{state.compare=e.target.checked;renderLab();});
$('[data-material="portrait"]').parentElement.addEventListener('click',e=>{const b=e.target.closest('[data-material]');if(b){state.material=b.dataset.material;renderLab();}});
$('.device-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-device]');if(b){state.device=b.dataset.device;state.columns=state.device==='desktop'?12:4;renderLab();}});
$('#reset').addEventListener('click',()=>{state={...initial};baseline={...initial};renderLab();});
const dateText=r=>new Date(r.date).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'});
let currentReference=null,mediaIndex=0;
function renderMedia(){const m=currentReference.media[mediaIndex];$('#dialog-media').innerHTML=`${m.type==='video'?`<video src="${m.video}" controls playsinline preload="metadata" poster="${m.local}" aria-label="Original layout animation by Bernardo Lickfold"></video>`:`<img src="${m.local}" alt="${currentReference.title}, reference image ${mediaIndex+1} of ${currentReference.media.length}">`}<div class="media-fullsize"><a href="${m.type==='video'?m.video:m.url}" target="_blank" rel="noopener">Open full-size ${m.type==='video'?'video':'image'} ↗</a></div><div class="media-counter"><button id="prev-media" ${mediaIndex===0?'disabled':''} aria-label="Previous reference image">←</button><span>${String(mediaIndex+1).padStart(2,'0')} / ${String(currentReference.media.length).padStart(2,'0')} · ${m.type.toUpperCase()}</span><button id="next-media" ${mediaIndex===currentReference.media.length-1?'disabled':''} aria-label="Next reference image">→</button></div>`;$('#prev-media').addEventListener('click',()=>{mediaIndex--;renderMedia();});$('#next-media').addEventListener('click',()=>{mediaIndex++;renderMedia();});}
function openReference(n){currentReference=references[n-1];mediaIndex=0;const r=currentReference;$('#dialog-kicker').textContent=`FIELD NOTES / STUDY ${String(n).padStart(2,'0')} / ${dateText(r)}`;$('#dialog-type').textContent=`${r.kind.toUpperCase()} · @BERLICKFOLD`;$('#dialog-title').textContent=r.title;$('#dialog-description').textContent=r.summary;$('#dialog-notes').innerHTML=`<h3>What is visible</h3><p>${r.observation}</p><h3>What to carry forward</h3><p>${r.transfer}</p>`;$('#dialog-source').href=r.url;renderMedia();if(!$('#reference-dialog').open)$('#reference-dialog').showModal();}
$('#close-dialog').addEventListener('click',()=>$('#reference-dialog').close());$('#reference-dialog').addEventListener('close',()=>{$('#dialog-media').querySelector('video')?.pause();});
$('#try-recipe').addEventListener('click',()=>{setRecipe(currentReference.recipe);$('#reference-dialog').close();$('#playground').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#preset').focus({preventScroll:true});});
$('#export').addEventListener('click',async()=>{
 const button=$('#export');button.disabled=true;$('#export-status').hidden=false;$('#export-status').textContent='Preparing your layout…';
 try{
  const files=await Promise.all(['portrait','linen','landscape'].map(async name=>{const response=await fetch(asset(name));if(!response.ok)throw new Error('Image unavailable');const blob=await response.blob();const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});return [asset(name),data];}));
  let markup=renderComposition({...state,grid:state.grid});for(const [url,data]of files)markup=markup.replaceAll(url,data);
  const sheets=await Promise.all(['style.css','composition.css'].map(async path=>{const response=await fetch(path);if(!response.ok)throw new Error('Styles unavailable');return response.text();}));let css=sheets.join('\n');
  for(const file of ['inter-regular.ttf','inter-medium.ttf','noto-serif-display-variable.woff2','general-sans-variable.woff2']){const path=`assets/fonts/${file}`,response=await fetch(path);if(!response.ok)throw new Error('Font unavailable');const blob=await response.blob();const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});css=css.replaceAll(path,data);}
  const classes=$('#preview').className;const inline=$('#preview').getAttribute('style');
  const documentText=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${recipes[state.preset].name} — Ruled study</title><style>${css}\nbody{padding:16px;display:flex;justify-content:center;background:#e8e7e1;max-width:none}</style></head><body><div class="preview-slot"><main class="${classes}" style="${inline}" data-design-width="${$('#preview').dataset.designWidth}" data-design-height="${$('#preview').dataset.designHeight}">${markup}</main></div><script>${fitComposition.toString()};const composition=document.querySelector('main');const fit=()=>fitComposition(composition,document.documentElement.clientWidth-32);window.addEventListener('resize',fit);fit();</script></body></html>`;
  const blob=new Blob([documentText],{type:'text/html'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`ruled-${state.preset}-${state.device}.html`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#export-status').textContent='Layout exported. All photographs are included in the file.';
 }catch(error){$('#export-status').textContent='Could not export. Please try again once the images have loaded.';}finally{button.disabled=false;}
});
renderLab();stageObserver.observe($('.preview-stage'));


function renderEvidence(){
 const r=references.find(r=>r.number===Number($('#evidence-study').value));
 $('#evidence-grid').src=r.media[0].local;$('#evidence-grid').alt=r.title+' — original grid overlay';
 $('#evidence-final').src=r.media[1].local;$('#evidence-final').alt=r.title+' — original finished layout';
 $('#evidence-note').textContent=r.number===21?'The title, inset detail and portrait occupy regions already reserved in the grid.':'The title, small image and room photograph share a horizontal starting line.';
 $('#evidence-source').href=r.url;
}
$('#evidence-study').addEventListener('change',renderEvidence);
$('#evidence-reveal').addEventListener('input',e=>{$('.evidence-view').style.setProperty('--reveal',e.target.value+'%');$('#evidence-value').textContent=e.target.value+'%';});
$('#evidence-detail').addEventListener('click',()=>openReference(Number($('#evidence-study').value)));
renderEvidence();
