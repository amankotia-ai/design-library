import React,{useLayoutEffect,useRef,useState} from 'react';
import {systems,sections} from './data';
import {cn} from './utils';

const pageFor = system => sections.find(section => section.systemId === system.id && section.id.endsWith('page')).id;
const partsFor = system => sections.filter(section => section.systemId === system.id && !section.id.endsWith('page'));
const systemUrl = system => `/?panel=system&section=${pageFor(system)}`;

export function PagePreview({pageId,name,systemId}){
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
   {size.scale>0&&<iframe src={`/?view=${pageId}&embed=1`} title={`${name} page preview`} loading="lazy" width="1440" height={size.height} style={{height:size.height,transform:`scale(${size.scale})`}}/>}
  </div>
 </div>
}

export function SystemCard({system}){
 const href=systemUrl(system);
 return <article className="system-card">
  <PagePreview pageId={pageFor(system)} name={system.name} systemId={system.id}/>
  <div className="system-card-body"><div className="card-meta"><span>{system.family}</span>{system.id!=='editorial-01'&&<span>{system.mode}</span>}</div><h2><a href={href}>{system.name}</a></h2><div className="card-palette" aria-label={`${system.name} palette`}>{system.swatches.map(([name,color])=><span key={name} style={{background:color}} title={`${name} ${color}`}/>)}<span className="palette-type">{system.typeLabel}</span></div></div>
 </article>;
}

export function SystemHome(){
 return <main className="system-home">
  <div className="catalog-heading"><h1>Design Systems</h1></div>
  <div className="system-cards">{systems.map(system=><SystemCard key={system.id} system={system}/>)}</div>
 </main>
}

export function SystemPanel({system}){
 const insight=system.insight;
 return <main className="system-panel panel-heading system-detail">
  <a className="back-to-systems" href="/?panel=systems">← All systems</a>
  <p className="eyebrow">{system.family} / {system.mode}</p><h1>{system.name}</h1><p className="system-signature">{system.signature}</p><p>{system.description}</p>
  <div className="system-detail-preview"><img src={system.preview.image} alt={system.preview.alt}/><span>{system.preview.caption}</span></div>
  <div className="system-summary"><p className="eyebrow">The system in one idea</p><h2>{insight.thesis}</h2><p>{insight.logic}</p></div>
  <section className="insight-section"><h2>When to choose it</h2><dl className="fit-list"><div><dt>Best for</dt><dd>{insight.bestFor}</dd></div><div><dt>Consider another direction</dt><dd>{insight.tradeoff}</dd></div></dl></section>
  <section className="insight-section"><h2>What makes it work</h2><div className={cn('principle-list',system.id==='editorial-01'&&'editorial-principles')}>{insight.principles.map(([title,body],i)=><div key={title}>{system.id!=='editorial-01'&&<span className="principle-index">0{i+1}</span>}<div><h3>{title}</h3><p>{body}</p></div></div>)}</div>{system.id==='editorial-01'&&<a className="study-link" href="/?panel=library&section=hero">Explore the adaptation & reveal its grid ↗</a>}</section>
  <section className="insight-section"><h2>Build within the language</h2><p>{insight.extension}</p><dl className="system-list">{system.rules.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
  <section className="insight-section"><h2>Palette & typography</h2><div className="token-swatches">{system.swatches.map(([name,color])=><div key={name}><span style={{background:color}}/><p>{name}<br/>{color}</p></div>)}</div><div className={cn('type-specimen',system.id==='blueprint-source'&&'source-specimen')}>{system.specimen.map(line=><React.Fragment key={line}>{line}<br/></React.Fragment>)}</div><p>{system.typography}</p></section>
  <section className="insight-section"><h2>What’s in this collection</h2><div className="section-inventory">{partsFor(system).map(section=><a key={section.id} href={`/?panel=sections&section=${section.id}`}><span>{section.name}</span><span>{section.layout} ↗</span></a>)}</div><a className="study-link" href={`/?panel=pages&section=${pageFor(system)}`}>Preview the assembled page ↗</a></section>
  <section className="insight-section evidence-note"><p className="eyebrow">Evidence & limits</p><h2>{system.mode === 'Source study'?'A reconstruction, with boundaries.':'A direction, with documented decisions.'}</h2><p>{insight.evidence}</p><p>{insight.relationship}</p><details className="reference-details"><summary>References & attribution</summary><p><a href={`/?panel=sources&section=${pageFor(system)}`}>View {system.name} references ↗</a></p></details></section>
 </main>
}
