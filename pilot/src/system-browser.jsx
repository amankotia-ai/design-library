import React,{useLayoutEffect,useRef,useState} from 'react';
import {systems,sections} from './data';
import {cn} from './utils';
import {typeSystems} from './type-systems';
import {systemAnalysis} from './system-analysis';
import {applyPreviewPalette} from './preview-palette';
import './type-systems.css';
import {PreviewSkeleton} from './library-loading';

const pageFor = system => sections.find(section => section.systemId === system.id && section.id.endsWith('page')).id;
const systemUrl = system => `/?panel=system&section=${pageFor(system)}`;
const signalDefaults=Object.fromEntries(systemAnalysis.conare.palette.map(({name,value})=>[name,value]));

export function PagePreview({pageId,name,systemId,interactive=false,palette}){
 const viewport=useRef(null);
 const frame=useRef(null);
 const paletteRef=useRef(palette);
 paletteRef.current=palette;
 useLayoutEffect(()=>{if(palette)applyPreviewPalette(frame.current?.contentDocument,palette,signalDefaults)},[palette]);
 const [size,setSize]=useState({scale:0,height:900});
 const [loaded,setLoaded]=useState(false);
 const [error,setError]=useState(false);
 useLayoutEffect(()=>{
  const node=viewport.current;
  const resize=()=>{
   const scale=node.clientWidth/1440;
   const height=scale?Math.ceil(node.clientHeight/scale):900;
   setSize(current=>current.scale===scale&&current.height===height?current:{scale,height});
  };
  resize();
  const observer=new ResizeObserver(resize);
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);
 return <div className={cn('style-preview',`style-preview-${systemId}`)}>
  <div className="page-viewport" ref={viewport} aria-busy={interactive&&!loaded&&!error?true:undefined}>
   {!error&&<PreviewSkeleton revealing={loaded}/>}
   {interactive&&!loaded&&!error&&<span className="sr-only" role="status">Loading page preview</span>}
   {error&&<span className="preview-frame-error" role={interactive?"status":undefined}>Preview unavailable</span>}
   {size.scale>0&&<iframe ref={frame} className={loaded?'preview-loaded':'preview-loading'} src={interactive&&pageId==='interfere-page'?'/interfere/page.html':interactive&&pageId==='conversion-page'?'/conversion/index.html?part=page':`/?view=${pageId}&embed=1${interactive&&systemId==='conare'?'&livePalette=1':''}`} title={`${name} page preview`} {...(!interactive?{inert:true,'aria-hidden':true,tabIndex:-1}:{inert:!loaded||undefined})} onError={()=>setError(true)} onLoad={e=>{const doc=e.currentTarget.contentDocument;if(!doc?.documentElement||!doc.body){setError(true);return}setError(false);setLoaded(true);if(paletteRef.current)applyPreviewPalette(doc,paletteRef.current,signalDefaults);if(interactive){doc.documentElement.style.overscrollBehaviorY='none';doc.body.style.overscrollBehaviorY='none'}}} loading="lazy" width="1440" height={size.height} style={{height:size.height,transform:`scale(${size.scale})`}}/>}
  </div>
 </div>
}

function LayoutGrid(){
 const overlay=useRef(null);
 const [height,setHeight]=useState(0);
 useLayoutEffect(()=>{
  const node=overlay.current;
  const update=()=>setHeight(node.clientHeight);
  const observer=new ResizeObserver(update);
  observer.observe(node);
  update();
  return()=>observer.disconnect();
 },[]);
 return <div className="layout-grid-overlay" ref={overlay} aria-hidden="true">
  <div className="layout-grid-columns">{Array.from({length:12},(_,i)=><div className="layout-grid-column" key={i}><span>{String(i+1).padStart(2,'0')}</span></div>)}</div>
  <div className="layout-grid-rows">{Array.from({length:Math.ceil(height/32)},(_,i)=><span key={i} style={{top:i*32}}>R{String(i).padStart(2,'0')}</span>)}</div>
 </div>;
}

function normalizeHex(text){
 const match=text.trim().match(/^#?([\da-f]{3}|[\da-f]{6})$/i);
 if(!match)return null;
 const hex=match[1].toLowerCase();
 return '#'+(hex.length===3?[...hex].map(char=>char+char).join(''):hex);
}
function ColorEditor({palette,setPalette,drafts,setDrafts,errors,setErrors,roles}){
 const dirty=roles.some(({name,value})=>palette[name]!==value||drafts[name]!==value);
 function changeText(name,text){
  setDrafts(current=>({...current,[name]:text}));
  setErrors(current=>({...current,[name]:false}));
  const color=normalizeHex(text);
  if(color)setPalette(current=>({...current,[name]:color}));
 }
 function finishText(name){
  const color=normalizeHex(drafts[name]);
  if(color){setDrafts(current=>({...current,[name]:color}));setErrors(current=>({...current,[name]:false}));}
  else setErrors(current=>({...current,[name]:true}));
 }
 function changePicker(name,value){
  setPalette(current=>({...current,[name]:value}));
  setDrafts(current=>({...current,[name]:value}));
  setErrors(current=>({...current,[name]:false}));
 }
 function reset(){setPalette({...signalDefaults});setDrafts({...signalDefaults});setErrors({});}
 return <div className="color-editor"><div className="color-editor-heading"><p>Choose colors to update the preview. Changes last until you leave this page.</p><button type="button" onClick={reset} disabled={!dirty}>Reset colors</button></div><div className="color-editor-swatches">{roles.map(({name,role})=>{
  const label=name==='Red'?'Accent':name;
  const id=`foundation-${name.toLowerCase()}`;
  return <div className="color-editor-item" key={name}><input className="color-editor-picker" id={id} type="color" value={palette[name]} aria-label={`Choose ${label} color`} onChange={event=>changePicker(name,event.target.value)}/><div className="color-editor-fields"><label htmlFor={id}>{label} <small>Change</small></label><input className="color-editor-hex" type="text" value={drafts[name]} aria-label={`${label} hex color`} aria-invalid={errors[name]||undefined} aria-describedby={errors[name]?`${id}-error`:undefined} spellCheck={false} onChange={event=>changeText(name,event.target.value)} onBlur={()=>finishText(name)} onKeyDown={event=>{if(event.key==='Enter')event.currentTarget.blur()}}/></div><p>{role}</p>{errors[name]&&<p className="color-editor-error" id={`${id}-error`}>Enter a hex color, for example #123456.</p>}</div>;
 })}</div></div>;
}

function TypographySystem({system}){
 const type=typeSystems[system.id];
 if(!type)return <div className="type-system"><p className="type-system-note">{system.typography}</p></div>;
 return <div className="type-system"><p className="type-system-intro">Styles observed in the assembled page at 1440px. Sizes and line heights may change across sections and screens; large samples scale down on narrow screens.</p>{type.note&&<p className="type-system-note">{type.note}</p>}<ul className="type-system-list">{type.roles.map(item=><li className="type-system-item" key={item.name}><div className="type-system-meta"><strong>{item.name}</strong><span>{item.family} · {item.size}px / {item.line==='normal'?'normal':`${item.line}px`} · {item.weight}{item.tracking&&` · tracking ${item.tracking}`}{item.stretch&&` · width ${item.stretch}`}</span></div><div className="type-system-sample" style={{'--type-family':item.font,'--type-size':`${item.size}px`,'--type-leading':typeof item.line==='number'?item.line/item.size:item.line,'--type-weight':item.weight,'--type-stretch':item.stretch||'normal','--type-tracking':item.tracking?`${parseFloat(item.tracking)/item.size}em`:'normal'}}>{item.sample}</div></li>)}</ul></div>;
}

export function SystemPanel({system}){
 const insight=system.insight;
 const analysis=systemAnalysis[system.id];
 const editableColors=system.id==='conare';
 const [palette,setPalette]=useState(()=>({...signalDefaults}));
 const [drafts,setDrafts]=useState(()=>({...signalDefaults}));
 const [colorErrors,setColorErrors]=useState({});
 const [topic,setTopic]=useState('overview');
 const [showLayoutGrid,setShowLayoutGrid]=useState(false);
 const topics=[['overview','Overview'],['foundations','Foundations'],['patterns','Patterns'],['references','References']];
 return <main className="system-panel panel-heading system-detail">
  <div className="system-detail-intro">
   <div className="detail-utility"><a className="back-to-systems" href="/?panel=systems">← All systems</a><button className="layout-grid-toggle" type="button" aria-pressed={showLayoutGrid} onClick={()=>setShowLayoutGrid(value=>!value)}>Grid</button></div>
   <h1>{system.name}</h1>
   <p className="system-signature">{system.signature}</p>
   <p className="system-description">{system.description}</p>
  </div>
  <aside className="system-detail-preview-pane" aria-label={`${system.name} assembled page preview`}>
   <PagePreview key={system.id} pageId={pageFor(system)} name={system.name} systemId={system.id} interactive palette={editableColors?palette:undefined}/>
  </aside>
  <div className="system-detail-copy">
   <fieldset className="detail-topics">
    <legend className="sr-only">System information</legend>
    {topics.map(([id,label])=><label className="detail-topic" key={id} data-label={label}><input type="radio" name="system-topic" id={`topic-${id}`} value={id} checked={topic===id} onChange={()=>setTopic(id)} aria-controls={`topic-panel-${id}`}/><span>{label}</span></label>)}
   </fieldset>
   <div className="detail-topic-panel" id="topic-panel-overview" role="region" aria-labelledby="topic-overview" hidden={topic!=='overview'}>
   <section className="detail-row" aria-labelledby="system-overview">
    <h2 id="system-overview" className="detail-label">Overview</h2>
    <div className="detail-content"><p className="detail-thesis">{insight.thesis}</p><p>{insight.logic}</p></div>
   </section>
   <section className="detail-row" aria-labelledby="system-fit">
    <h2 id="system-fit" className="detail-label">When to choose it</h2>
    <div className="detail-content"><dl className="detail-fit"><div><dt>Best for</dt><dd>{insight.bestFor}</dd></div><div><dt>Consider another direction</dt><dd>{insight.tradeoff}</dd></div></dl></div>
   </section>
   <section className="detail-row" aria-labelledby="system-explore">
    <h2 id="system-explore" className="detail-label">Explore</h2>
    <div className="detail-content"><a className="study-link" href={`/?panel=sections&system=${encodeURIComponent(system.id)}`}>Explore sections ↗</a><a className="study-link" href={`/?panel=pages&section=${pageFor(system)}`}>Preview the assembled page ↗</a></div>
   </section>
   </div>
   <div className="detail-topic-panel" id="topic-panel-foundations" role="region" aria-labelledby="topic-foundations" hidden={topic!=='foundations'}>
   <section className="detail-row" aria-labelledby="system-tokens">
    <h2 id="system-tokens" className="detail-label">Color</h2>
    <div className="detail-content">{editableColors?<ColorEditor palette={palette} setPalette={setPalette} drafts={drafts} setDrafts={setDrafts} errors={colorErrors} setErrors={setColorErrors} roles={analysis.palette}/>:<div className="token-swatches">{(analysis?.palette||system.swatches.map(([name,value])=>({name,value}))).map(({name,value,role})=><div key={name}><span style={{background:value}}/><p>{name}<br/>{value}{role&&<><br/>{role}</>}</p></div>)}</div>}</div>
   </section>
   <section className="detail-row" aria-labelledby="system-foundation-rules">
    <h2 id="system-foundation-rules" className="detail-label">Space & structure</h2>
    <div className="detail-content"><dl className="detail-rules">{(analysis?.foundations||system.rules.filter(([label])=>label!=='Mode')).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
   </section>
   <section className="detail-row" aria-labelledby="system-typography">
    <h2 id="system-typography" className="detail-label">Typography</h2>
    <div className="detail-content"><TypographySystem system={system}/></div>
   </section>
   </div>
   <div className="detail-topic-panel" id="topic-panel-patterns" role="region" aria-labelledby="topic-patterns" hidden={topic!=='patterns'}>
   <section className="detail-row" aria-labelledby="system-patterns">
    <h2 id="system-patterns" className="detail-label">How the language works</h2>
    <div className="detail-content">{analysis?.patterns?<div className="system-patterns">{analysis.patterns.map(({title,body,image,alt,caption,portrait})=><article className="system-pattern" key={title}><h3>{title}</h3><p>{body}</p><figure className={portrait?"system-pattern-portrait":undefined}><img src={image} alt={alt} loading="lazy"/><figcaption>{caption}</figcaption></figure></article>)}</div>:<><ol className="detail-principles">{insight.principles.map(([title,body],i)=><li key={title}><span className="detail-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>{system.id==='editorial-01'&&<a className="study-link" href="/?panel=library&section=hero">Explore the adaptation & reveal its grid ↗</a>}</>}</div>
   </section>
   </div>
   <div className="detail-topic-panel" id="topic-panel-references" role="region" aria-labelledby="topic-references" hidden={topic!=='references'}>
   <section className="detail-row detail-evidence" aria-labelledby="system-evidence">
    <h2 id="system-evidence" className="detail-label">References & attribution</h2>
    <div className="detail-content"><p>{insight.evidence}</p><p>{insight.relationship}</p>{analysis?.references&&<ul className="system-references">{analysis.references.map(ref=><li key={ref.name}><a href={ref.url} target="_blank" rel="noreferrer">{ref.name} ↗</a><a href={ref.capture} target="_blank" rel="noreferrer">View capture ↗</a></li>)}</ul>}<a className="study-link" href={`/?panel=sources&section=${pageFor(system)}`}>View all references ↗</a></div>
   </section>
   </div>
  </div>
  {showLayoutGrid&&<LayoutGrid/>}
 </main>
}
