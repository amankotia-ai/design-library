import React,{useLayoutEffect,useRef,useState} from 'react';
import {systems,sections} from './data';
import {cn} from './utils';
import {SystemPreview} from './system-preview';

const pageFor = system => sections.find(section => section.systemId === system.id && section.id.endsWith('page')).id;
const partsFor = system => sections.filter(section => section.systemId === system.id && !section.id.endsWith('page'));
const systemUrl = system => `/?panel=system&section=${pageFor(system)}`;

export function PagePreview({pageId,name,systemId,interactive=false}){
 const viewport=useRef(null);
 const [size,setSize]=useState({scale:0,height:900});
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
  <div className="page-viewport" ref={viewport}>
   {size.scale>0&&<iframe src={interactive&&pageId==='interfere-page'?'/interfere/page.html':interactive&&pageId==='conversion-page'?'/conversion/index.html?part=page':`/?view=${pageId}&embed=1`} title={`${name} page preview`} {...(!interactive?{inert:true,'aria-hidden':true,tabIndex:-1}:{})} onLoad={interactive?e=>{const doc=e.currentTarget.contentDocument;if(doc){doc.documentElement.style.overscrollBehaviorY='none';doc.body.style.overscrollBehaviorY='none'}}:undefined} loading="lazy" width="1440" height={size.height} style={{height:size.height,transform:`scale(${size.scale})`}}/>}
  </div>
 </div>
}

export function SystemCard({system}){
 const href=systemUrl(system);
 return <article className="system-card">
  <SystemPreview system={system}/>
  <div className="system-card-body"><div className="card-meta"><span>{system.family}</span></div><h2><a href={href}>{system.name}</a></h2><div className="card-palette" aria-label={`${system.name} palette`}>{system.swatches.map(([name,color])=><span key={name} style={{background:color}} title={`${name} ${color}`}/>)}<span className="palette-type">{system.typeLabel}</span></div></div>
 </article>;
}

export function SystemHome(){
 return <main className="system-home">
  <div className="catalog-heading"><h1>Design Systems</h1></div>
  <div className="system-cards">{systems.map(system=><SystemCard key={system.id} system={system}/>)}</div>
 </main>
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

export function SystemPanel({system}){
 const insight=system.insight;
 const parts=partsFor(system);
 const [topic,setTopic]=useState('overview');
 const [showLayoutGrid,setShowLayoutGrid]=useState(false);
 const topics=[['overview','Overview'],['design','Design'],['collection','Collection'],['sources','Sources']];
 return <main className="system-panel panel-heading system-detail">
  <div className="system-detail-intro">
   <div className="detail-utility"><a className="back-to-systems" href="/?panel=systems">← All systems</a><button className="layout-grid-toggle" type="button" aria-pressed={showLayoutGrid} onClick={()=>setShowLayoutGrid(value=>!value)}>Grid</button></div>
   <h1>{system.name}</h1>
   <p className="system-signature">{system.signature}</p>
   <p className="system-description">{system.description}</p>
  </div>
  <aside className="system-detail-preview-pane" aria-label={`${system.name} assembled page preview`}>
   <PagePreview key={system.id} pageId={pageFor(system)} name={system.name} systemId={system.id} interactive/>
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
   <section className="detail-row" aria-labelledby="system-principles">
    <h2 id="system-principles" className="detail-label">What makes it work</h2>
    <div className="detail-content"><ol className="detail-principles">{insight.principles.map(([title,body],i)=><li key={title}><span className="detail-number">{String(i+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>{system.id==='editorial-01'&&<a className="study-link" href="/?panel=library&section=hero">Explore the adaptation & reveal its grid ↗</a>}</div>
   </section>
   </div>
   <div className="detail-topic-panel" id="topic-panel-design" role="region" aria-labelledby="topic-design" hidden={topic!=='design'}>
   <section className="detail-row" aria-labelledby="system-rules">
    <h2 id="system-rules" className="detail-label">Build within the language</h2>
    <div className="detail-content"><p>{insight.extension}</p><dl className="detail-rules">{system.rules.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div>
   </section>
   <section className="detail-row" aria-labelledby="system-tokens">
    <h2 id="system-tokens" className="detail-label">Palette & typography</h2>
    <div className="detail-content"><div className="token-swatches">{system.swatches.map(([name,color])=><div key={name}><span style={{background:color}}/><p>{name}<br/>{color}</p></div>)}</div><div className={cn('type-specimen',`type-specimen-${system.id}`)}>{system.specimen.map(line=><React.Fragment key={line}>{line}<br/></React.Fragment>)}</div><p>{system.typography}</p></div>
   </section>
   </div>
   <div className="detail-topic-panel" id="topic-panel-collection" role="region" aria-labelledby="topic-collection" hidden={topic!=='collection'}>
   <section className="detail-row" aria-labelledby="system-collection">
    <h2 id="system-collection" className="detail-label">In this collection <span>{String(parts.length).padStart(2,'0')}</span></h2>
    <div className="detail-content"><div className="section-inventory">{parts.map(section=><a key={section.id} href={`/?panel=sections&section=${section.id}`}><span>{section.name}</span><span>{section.layout} ↗</span></a>)}</div><a className="study-link" href={`/?panel=pages&section=${pageFor(system)}`}>Preview the assembled page ↗</a></div>
   </section>
   </div>
   <div className="detail-topic-panel" id="topic-panel-sources" role="region" aria-labelledby="topic-sources" hidden={topic!=='sources'}>
   <section className="detail-row detail-evidence" aria-labelledby="system-evidence">
    <h2 id="system-evidence" className="detail-label">Evidence & limits</h2>
    <div className="detail-content"><p className="detail-evidence-title">{system.id === 'blueprint-source'?'A reconstruction, with boundaries.':'A direction, with documented decisions.'}</p><p>{insight.evidence}</p><p>{insight.relationship}</p><details className="reference-details"><summary>References & attribution</summary><p><a href={`/?panel=sources&section=${pageFor(system)}`}>View {system.name} references ↗</a></p></details></div>
   </section>
   </div>
  </div>
  {showLayoutGrid&&<LayoutGrid/>}
 </main>
}
