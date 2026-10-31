import React,{useLayoutEffect,useRef,useState} from 'react';
import {systems,sections} from './data';
import {cn} from './utils';

const pageFor = system => sections.find(section => section.systemId === system.id && section.id.endsWith('page')).id;
const partsFor = system => sections.filter(section => section.systemId === system.id && !section.id.endsWith('page'));
const systemUrl = system => `/?panel=system&section=${pageFor(system)}`;

function CollectionPagePreview({system}){
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
 return <div className={cn('style-preview',`style-preview-${system.id}`)}>
  <div className="page-viewport" ref={viewport}>
   {size.scale>0&&<iframe src={`/?view=${pageFor(system)}&embed=1`} title={`${system.name} page preview`} loading="lazy" width="1440" height={size.height} style={{height:size.height,transform:`scale(${size.scale})`}}/>}
  </div>
 </div>
}

export function SystemHome(){
 return <main className="system-home">
  <div className="catalog-heading"><h1>Design systems</h1></div>
  <div className="system-cards">{systems.map(system=><article className="system-card" key={system.id}>
   <CollectionPagePreview system={system}/>
   <div className="system-card-body"><div className="card-meta"><span>{system.family}</span>{system.id!=='editorial-01'&&<span>{system.mode}</span>}</div><h2><a href={systemUrl(system)}>{system.name}</a></h2><div className="card-palette" aria-label={`${system.name} palette`}>{system.swatches.map(([name,color])=><span key={name} style={{background:color}} title={`${name} ${color}`}/>)}<span className="palette-type">{system.typeLabel}</span></div><div className="card-bottom"><span>{partsFor(system).length} sections</span><a href={systemUrl(system)}>Explore system <span aria-hidden="true">↗</span></a></div></div>
  </article>)}</div>
 </main>
}

export function SystemPanel({system}){
 const insight=system.insight;
 return <main className="system-panel panel-heading system-detail">
  <a className="back-to-systems" href="/">← All systems</a>
  <p className="eyebrow">{system.family} / {system.mode}</p><h1>{system.name}</h1><p className="system-signature">{system.signature}</p><p>{system.description}</p>
  <div className="system-detail-preview"><img src={system.preview.image} alt={system.preview.alt}/><span>{system.preview.caption}</span></div>
  <div className="system-summary"><p className="eyebrow">The system in one idea</p><h2>{insight.thesis}</h2><p>{insight.logic}</p></div>
  <section className="insight-section"><h2>When to choose it</h2><dl className="fit-list"><div><dt>Best for</dt><dd>{insight.bestFor}</dd></div><div><dt>Consider another direction</dt><dd>{insight.tradeoff}</dd></div></dl></section>
  <section className="insight-section"><h2>What makes it work</h2><div className={cn('principle-list',system.id==='editorial-01'&&'editorial-principles')}>{insight.principles.map(([title,body],i)=><div key={title}>{system.id!=='editorial-01'&&<span className="principle-index">0{i+1}</span>}<div><h3>{title}</h3><p>{body}</p></div></div>)}</div>{system.id==='editorial-01'&&<a className="study-link" href="/?panel=library&section=hero">Explore the adaptation & reveal its grid ↗</a>}</section>
  <section className="insight-section"><h2>Build within the language</h2><p>{insight.extension}</p><dl className="system-list">{system.rules.map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
  <section className="insight-section"><h2>Palette & typography</h2><div className="token-swatches">{system.swatches.map(([name,color])=><div key={name}><span style={{background:color}}/><p>{name}<br/>{color}</p></div>)}</div><div className={cn('type-specimen',system.id==='blueprint-source'&&'source-specimen')}>{system.specimen.map(line=><React.Fragment key={line}>{line}<br/></React.Fragment>)}</div><p>{system.typography}</p></section>
  <section className="insight-section"><h2>What’s in this collection</h2><div className="section-inventory">{partsFor(system).map(section=><a key={section.id} href={`/?panel=library&section=${section.id}`}><span>{section.name}</span><span>{section.layout} ↗</span></a>)}</div><a className="study-link" href={`/?panel=library&section=${pageFor(system)}`}>Study the assembled page ↗</a></section>
  <section className="insight-section evidence-note"><p className="eyebrow">Evidence & limits</p><h2>{system.mode === 'Source study'?'A reconstruction, with boundaries.':'A direction, with documented decisions.'}</h2><p>{insight.evidence}</p><p>{insight.relationship}</p><a href="/?panel=sources">View original references & attribution ↗</a></section>
 </main>
}
