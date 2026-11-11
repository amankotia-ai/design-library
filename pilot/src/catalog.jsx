import React,{useState} from 'react';
import {sections,systems,comparisons} from './data';
import {PageCard} from './page-browser';
import {pageShells} from './page-shells';
import {PreviewImage} from './library-loading';
import {isPage} from './library-routing';
import {withBase} from './base.js';

const types={'conare-evals-header':'Navigation','conare-evals-hero':'Metrics','conare-evals-directory':'Metrics','conare-evals-price':'Comparisons','conare-evals-losses':'Comparisons','conare-evals-method':'Editorial','conare-evals-closing':'Calls to action','conare-evals-footer':'Footers','conare-header':'Navigation','conare-hero':'Heroes','conare-integrations':'Integrations','conare-workflow':'Features','conare-products':'Features','conare-security':'Trust','conare-parse':'Product demos','conare-benchmarks':'Metrics','conare-price':'Comparisons','conare-faq':'FAQs','conare-footer':'Footers','mnh-header':'Navigation','mnh-hero':'Heroes','mnh-portfolio':'Projects','mnh-content':'Editorial','mnh-about':'Features','mnh-footer':'Footers','conversion-header':'Navigation','conversion-hero':'Heroes','conversion-logos':'Social proof','conversion-agents':'Product demos','conversion-context':'Features','conversion-platform':'Features','conversion-testimonial':'Testimonials','conversion-security':'Trust','conversion-resources':'Editorial','conversion-closing':'Calls to action','conversion-footer':'Footers',"steel-header":"Navigation","steel-hero":"Heroes","steel-demo":"Product demos","steel-customers":"Social proof","steel-stats":"Metrics","steel-use-cases":"Applications","steel-features":"Features","steel-integrations":"Integrations","steel-enterprise":"Features","steel-stealth":"Features","steel-faq":"FAQs","steel-blog":"Editorial","steel-cta":"Calls to action","steel-footer":"Footers",'interfere-header':'Navigation','interfere-hero':'Heroes','interfere-trust':'Social proof','interfere-overview':'Features','interfere-testimonial':'Testimonials','interfere-monitoring':'Features','interfere-triage':'Features','interfere-resolution':'Features','interfere-security':'Trust','interfere-releases':'Changelog','interfere-footer':'Footers','salesloft-header':'Navigation','salesloft-hero':'Heroes','salesloft-pipeline':'Features','salesloft-risk':'Features','salesloft-integrations':'Integrations','salesloft-footer':'Footers',hero:'Heroes',feature:'Features',quote:'Testimonials',footer:'Footers','image-index':'Galleries','project-detail':'Projects','split-material':'Features','image-rail':'Galleries','blueprint-header':'Navigation','blueprint-hero':'Heroes','blueprint-editor':'Product demos','blueprint-examples':'Galleries','blueprint-compare':'Comparisons','blueprint-features':'Features','blueprint-pricing':'Pricing','blueprint-faq':'FAQs','blueprint-prompt':'Calls to action','blueprint-footer':'Footers'};
Object.assign(types,Object.fromEntries([['header','Navigation'],['hero','Heroes'],['downloads','Calls to action'],['features','Features'],['feature-1','Features'],['feature-2','Features'],['feature-3','Features'],['feature-4','Features'],['feature-5','Features'],['why','Features'],['pricing','Pricing'],['creativity','Features'],['testimonials','Testimonials'],['faq','FAQs'],['footer','Footers']].map(([id,type])=>['plasticity-'+id,type])));
Object.assign(types,Object.fromEntries([['header','Navigation'],['hero','Heroes'],['customers','Social proof'],['decision','Features'],['how','Features'],['fit','Applications'],['products','Product demos'],['industries','Applications'],['stories','Testimonials'],['resources','Editorial'],['closing','Calls to action'],['footer','Footers']].map(([id,type])=>['unifize-'+id,type])));
const thumbnail=section=>section.id.startsWith('unifize-')?withBase(`/previews/unifize/${section.id.slice(8)}.png`):section.id.startsWith('conare-evals-')?withBase(`/previews/conare-evals/${section.id.slice(13)}.png`):section.id.startsWith('conare-')?withBase(`/previews/conare/${section.id.slice(7)}.png`):section.id.startsWith('mnh-')?withBase(`/previews/mnh/${section.id.slice(4)}.png`):section.id.startsWith('plasticity-')?withBase(`/previews/plasticity/${section.id.slice(11)}.png`):section.id.startsWith('conversion-')?withBase(`/previews/conversion/${section.id.slice(11)}.png`):section.id.startsWith('steel-')?withBase(`/evidence/steel/${section.id.slice(6)}.png`):section.id.startsWith('interfere-')?withBase(`/previews/interfere/${section.id.replace('interfere-','')}.png`):section.systemId==='salesloft'?withBase(`/previews/${section.id}.png`):['hero','feature','footer','page'].includes(section.id)?withBase(`/previews/library/${section.id}.png`):section.id==='blueprint-page'?withBase('/previews/library/blueprint-page.png'):comparisons[section.id]?.implementation||withBase(`/previews/editorial/${section.id}.png`);

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
  history.replaceState(history.state,'',withBase(`/?${next}`));
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
   const detail=withBase(`/?panel=${pages?'pages':'sections'}&section=${section.id}`);
   const name=pages?`${system.name} page`:section.name;
   return <article className="system-card asset-card" key={section.id}>
    <a className="asset-preview" href={detail} tabIndex={-1} aria-hidden="true"><PreviewImage src={thumbnail(section)}/></a>
    <div className="system-card-body"><div className="card-meta"><span>{system.name}</span></div><h2><a href={detail}>{name}</a></h2><p className="asset-layout">{section.layout}</p></div>
   </article>;
  })}</div>):<div className="catalog-empty"><h2>No {pages?'pages':'sections'} match these filters.</h2><button onClick={()=>update('all','all')}>Clear filters</button></div>}
 </main>;
}
