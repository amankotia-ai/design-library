import React,{useState} from 'react';
import {sections,systems,comparisons} from './data';
import {PageCard} from './page-browser';
import {pageShells} from './page-shells';

const types={hero:'Heroes',feature:'Features',quote:'Testimonials',footer:'Footers','image-index':'Galleries','project-detail':'Projects','split-material':'Features','image-rail':'Galleries','blueprint-header':'Navigation','blueprint-hero':'Heroes','blueprint-editor':'Product demos','blueprint-examples':'Galleries','blueprint-compare':'Comparisons','blueprint-features':'Features','blueprint-pricing':'Pricing','blueprint-faq':'FAQs','blueprint-prompt':'Calls to action','blueprint-footer':'Footers'};
export const isPage=section=>section.id.endsWith('page');
const thumbnail=section=>['hero','feature','footer','page'].includes(section.id)?`/previews/library/${section.id}.png`:section.id==='blueprint-page'?'/previews/library/blueprint-page.png':comparisons[section.id]?.implementation||`/previews/editorial/${section.id}.png`;

export function Catalog({pages=false}){
 const params=new URLSearchParams(location.search);
 const availableTypes=[...new Set(pages?pageShells.map(page=>page.type):Object.values(types))].sort();
 const [systemId,setSystemId]=useState(systems.some(s=>s.id===params.get('system'))?params.get('system'):'all');
 const [type,setType]=useState(availableTypes.includes(params.get('type'))?params.get('type'):'all');
 const inventory=pages?pageShells:sections.filter(section=>!isPage(section));
 const matches=inventory.filter(section=>(pages||systemId==='all'||section.systemId===systemId)&&(type==='all'||(pages?section.type:types[section.id])===type));
 const update=(nextSystem,nextType)=>{
  setSystemId(nextSystem);setType(nextType);
  const next=new URLSearchParams({panel:pages?'pages':'sections'});
  if(!pages&&nextSystem!=='all')next.set('system',nextSystem);
  if(nextType!=='all')next.set('type',nextType);
  history.replaceState(null,'',`/?${next}`);
 };
 return <main className="asset-catalog">
  <div className="catalog-heading"><h1>{pages?'Pages':'Sections'}</h1>
  <div className="catalog-filters">
   <label><span className="sr-only">{pages?'Page type':'Section type'}</span><select className="library-select" aria-label={pages?'Page type':'Section type'} value={type} onChange={e=>update(systemId,e.target.value)}><option value="all">{pages?'Page type':'Section type'}</option>{availableTypes.map(value=><option key={value}>{value}</option>)}</select></label>
   {!pages&&<label><span className="sr-only">Design system</span><select className="library-select" aria-label="Design system" value={systemId} onChange={e=>update(e.target.value,type)}><option value="all">Design system</option>{systems.map(system=><option key={system.id} value={system.id}>{system.name}</option>)}</select></label>}
   {((!pages&&systemId!=='all')||type!=='all')&&<button className="clear-filters" onClick={()=>update('all','all')}>Clear filters</button>}
  </div></div>
  {matches.length?(pages?<div className="system-cards page-cards">{matches.map(page=><PageCard key={page.id} page={page} system={systems.find(system=>system.id===page.systemId)}/>)}</div>:<div className="system-cards asset-cards">{matches.map(section=>{
   const system=systems.find(item=>item.id===section.systemId);
   const detail=`/?panel=${pages?'pages':'sections'}&section=${section.id}`;
   const name=pages?`${system.name} page`:section.name;
   return <article className="system-card asset-card" key={section.id}>
    <a className="asset-preview" href={detail} tabIndex={-1} aria-hidden="true"><img src={thumbnail(section)} alt="" loading="lazy"/></a>
    <div className="system-card-body"><div className="card-meta"><span>{system.name}</span>{(system.mode==='Source study'||section.id==='quote')&&<span>{section.id==='quote'?'Source study + adaptation':'Source study'}</span>}</div><h2><a href={detail}>{name}</a></h2><p className="asset-layout">{section.layout}</p></div>
   </article>;
  })}</div>):<div className="catalog-empty"><h2>No {pages?'pages':'sections'} match these filters.</h2><button onClick={()=>update('all','all')}>Clear filters</button></div>}
 </main>;
}
