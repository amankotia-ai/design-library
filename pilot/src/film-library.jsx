import React, {useMemo, useRef, useState} from 'react';
import {filmEntries} from './film-data';
import {filmLearnings} from './film-learnings-data';
import {filmReferences} from './film-reference-data';
import {FilmReference,FilmReferenceCard,FilmReferenceOverview} from './film-references';
import {filmCatalogEntries,FilmLessonCard,FilmLesson} from './film-learnings';
import {FilmLab} from './film-lab';
import {StudyThumbnail} from './film-study-thumbnails';
import {FilmStudy,StudyNavigation} from './film-studies';
import {studiesForEntry,studyGuidance} from './film-study-registry';
import {withBase} from './base';
import {cn} from './utils';
import {plain,documentParts,Markdown} from './film-markdown';
import './film-library.css';

const kindNames={lesson:'Lesson',study:'Interactive example',calculus:'Interactive model',guide:'Guide',role:'Specialist role',research:'Research'};
const entryUrl=id=>withBase(`/?panel=film&entry=${encodeURIComponent(id)}`);

function FilmSpecimen({entry}){
 if(entry.kind==='study')return <StudyThumbnail studyId={entry.id}/>;
 if(entry.kind!=='calculus')return null;
 return <div className="film-specimen film-specimen-calculus" aria-hidden="true">
  <div className="film-specimen-top"><span>Position</span><span>Velocity</span></div>
  <div className="film-specimen-symbol">x(t)</div>
  <svg viewBox="0 0 400 200" aria-hidden="true"><path className="film-diagram-guide" d="M25 170H380M25 25V170M25 120H380M25 70H380"/><path className="film-diagram-ink" d="M25 170C125 170 110 40 210 40S320 70 380 30"/><path className="film-diagram-accent" d="M25 165C80 165 90 55 145 55S180 160 250 160S315 120 380 120"/><circle className="film-diagram-point" cx="210" cy="40" r="5"/></svg>
  <div className="film-specimen-caption"><span>{entry.category}</span><span>↗</span></div>
 </div>;
}

export function FilmHome(){
 const [view,setView]=useState(()=>{
  const requested=new URLSearchParams(location.search).get('view');
  return ['lessons','labs','films','guides'].includes(requested)?requested:'all';
 });
 const viewEntries=view==='films'?filmReferences:filmCatalogEntries.filter(entry=>view==='all'?['lesson','study','calculus'].includes(entry.kind):view==='lessons'?entry.kind==='lesson':view==='labs'?['study','calculus'].includes(entry.kind):!['lesson','study','calculus'].includes(entry.kind));
 return <main className="system-home film-home">
  <div className="catalog-heading"><div><h1>Film & Motion</h1><p className="film-collection-description">Practical lessons for directing a scene, shaping motion, and making a clearer cut.</p></div></div>
  <fieldset className="detail-topics film-collection-tabs"><legend className="sr-only">Collection view</legend>{[['all','Learnings & motion labs'],['lessons','Lessons'],['labs','Motion labs'],['films','Reference films'],['guides','Production guides']].map(([id,label])=><label className="detail-topic" data-label={label} key={id}><input type="radio" name="film-collection-view" value={id} checked={view===id} onChange={()=>setView(id)}/><span>{label}</span></label>)}</fieldset>
  {view==='films'&&<FilmReferenceOverview/>}
  <div className="system-cards film-catalog-cards">{viewEntries.map(entry=>entry.kind==='film'?<FilmReferenceCard key={entry.id} film={entry}/>:entry.kind==='lesson'?<FilmLessonCard key={entry.id} lesson={entry}/>:<article className={cn('system-card film-card',!['study','calculus'].includes(entry.kind)&&'film-text-card')} data-kind={entry.kind} key={entry.id}>
   {['study','calculus'].includes(entry.kind)&&<a className="film-specimen-link" href={entryUrl(entry.id)} tabIndex={-1} aria-hidden="true"><FilmSpecimen entry={entry}/></a>}
   <div className="system-card-body"><div className="card-meta"><span>{entry.category}</span><span>{kindNames[entry.kind]||'Guide'}</span></div><h2><a href={entryUrl(entry.id)}>{entry.title}</a></h2><p className="film-card-summary">{entry.summary}</p></div>
  </article>)}</div>
  <footer className="film-collection-footer"><span>Lessons to apply, motion to explore, and guides for production.</span><a href={withBase('/film-motion/manifest.json')} download>Download source manifest ↗</a></footer>
 </main>;
}

function sourceLinks(body){
 const named=[...String(body).matchAll(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)(?:\s+"[^"]*")?\)/g)].map(match=>({name:plain(match[1]),url:match[2]}));
 const bare=[...String(body).matchAll(/https?:\/\/[^\s<>\]"`]+/g)].map(match=>{const url=match[0].replace(/[).,;]+$/,'');try{return {name:new URL(url).hostname,url};}catch{return null;}}).filter(Boolean);
 const seen=new Set();return [...named,...bare].filter(item=>{if(seen.has(item.url))return false;seen.add(item.url);return true;});
}
const useDescriptions={
 study:'Change the inputs to see the visual and mathematical results update together. The equations are visible in the example, with units and assumptions for interpreting them.',
 calculus:'Change a parameter, inspect the rendered motion, and compare its position, velocity, parameter sensitivity, and timing. Use these measurements to diagnose a choice, then review the actual film.',
 guide:'Use this guide at the relevant production step. Keep its assumptions and evidence limits alongside the decisions you make.',
 role:'Use this role to give a specialist a concrete brief, source material, and a reviewable deliverable. Its review informs the next revision.',
 research:'Trace a technique back to the material inspected. Distinguish what the source demonstrates from the conclusions drawn for this workflow.'
};

export function FilmPanel({entryId}){
 const reference=filmReferences.find(item=>item.id===entryId);
 if(reference)return <FilmReference key={reference.id} film={reference}/>;
 const lesson=filmLearnings.find(item=>item.id===entryId);
 if(lesson)return <FilmLesson key={lesson.id} lesson={lesson}/>;
 const entry=filmEntries.find(item=>item.id===entryId);
 if(!entry)return <main className="film-not-found"><h1>Entry not found</h1><p>This film entry is unavailable.</p><a className="study-link" href={withBase('/?panel=films')}>Return to Film & Motion ↗</a></main>;
 return <FilmEntry key={entry.id} entry={entry}/>;
}
function FilmEntry({entry}){
 const [topic,setTopic]=useState('overview');const reader=useRef(null);
 const blocks=useMemo(()=>documentParts(entry.body),[entry.body]);
 const headings=blocks.filter(block=>block.type==='heading');
 const refs=useMemo(()=>sourceLinks(entry.body),[entry.body]);
 const isLab=entry.id==='film-calculus'||entry.kind==='study';
 const guidance=studyGuidance[entry.id];
 const availableStudies=studiesForEntry(entry);
 const relatedStudies=guidance?guidance.next.map(id=>availableStudies.find(item=>item.id===id)).filter(Boolean):availableStudies;
 const related=filmCatalogEntries.filter(item=>item.id!==entry.id&&item.category===entry.category).slice(0,3);
 const download=entry.download?withBase(entry.download):null;
 function goToHeading(id){const target=reader.current?.querySelector(`#${id}`);if(target){const top=target.getBoundingClientRect().top-reader.current.getBoundingClientRect().top+reader.current.scrollTop-24;reader.current.scrollTo({top:Math.max(0,top),behavior:'instant'});if(matchMedia('(max-width:700px)').matches)reader.current.closest('aside')?.scrollIntoView({block:'start',behavior:'instant'});}}
 return <main className={cn('system-panel panel-heading system-detail film-detail',isLab&&'film-detail-lab')}>
  <div className="system-detail-intro">
   <div className="detail-utility"><a className="back-to-systems" href={withBase('/?panel=films')}>← Film & Motion</a>{download&&<a className="film-download" href={download} download>Download ↗</a>}</div>
   <h1>{entry.title}</h1><p className="system-signature">{entry.category}</p><p className="system-description">{entry.summary}</p>
  </div>
  <aside className={cn('system-detail-preview-pane','film-preview-pane',isLab&&'film-lab-preview-pane')} aria-label={isLab?'Interactive motion lab':`${entry.title} complete guide`}>
   {isLab?<div className="film-lab-container" data-lenis-prevent><StudyNavigation activeId={entry.id}/>{entry.kind==='study'?<FilmStudy studyId={entry.id}/>:<FilmLab/>}</div>:<div className="film-reader-shell"><div className="film-reader-heading"><span>{kindNames[entry.kind]||'Guide'}</span>{download&&<a href={download} download>Download file ↗</a>}</div><div className="film-reader" ref={reader} tabIndex={0} aria-label="Scrollable complete guide" data-lenis-prevent><Markdown entry={entry} blocks={blocks}/><p className="film-document-end">End of guide</p></div></div>}
  </aside>
  <div className="system-detail-copy">
   <fieldset className="detail-topics"><legend className="sr-only">Film entry information</legend>{[['overview','Overview'],['guide',isLab?'Guide':'Contents'],['references','References']].map(([id,label])=><label className="detail-topic" data-label={label} key={id}><input type="radio" name="film-topic" id={`film-topic-${id}`} value={id} checked={topic===id} onChange={()=>setTopic(id)} aria-controls={`film-panel-${id}`}/><span>{label}</span></label>)}</fieldset>
   <div className="detail-topic-panel" id="film-panel-overview" role="region" aria-labelledby="film-topic-overview" hidden={topic!=='overview'}>
    <section className="detail-row"><h2 className="detail-label">How to use it</h2><div className="detail-content"><p>{guidance?.use||useDescriptions[entry.kind]||useDescriptions.guide}</p>{isLab&&<p>These are inspectable models, not a prediction of audience response or a guarantee of quality.</p>}</div></section>
    {relatedStudies.length>0&&<section className="detail-row"><h2 className="detail-label">{isLab?'Explore next':'Explore with an example'}</h2><div className="detail-content"><ul className="study-related-links">{relatedStudies.map(study=><li key={study.id}><a href={entryUrl(study.id)}>{study.title} ↗</a><small>{study.summary}</small></li>)}</ul></div></section>}
    {headings.length>0&&<section className="detail-row"><h2 className="detail-label">Inside this {isLab?'model':'guide'}</h2><div className="detail-content"><ul className="film-overview-list">{headings.filter(item=>item.level<=2).slice(isLab?0:1,5).map(item=><li key={item.id}>{plain(item.text)}</li>)}</ul><button className="film-text-button" type="button" onClick={()=>setTopic('guide')}>{isLab?'Read the model guide':'Browse all contents'} ↗</button></div></section>}
    {related.length>0&&<section className="detail-row"><h2 className="detail-label">Keep exploring</h2><div className="detail-content"><ul className="film-related">{related.map(item=><li key={item.id}><a href={entryUrl(item.id)}>{item.title} ↗</a></li>)}</ul></div></section>}
   </div>
   <div className="detail-topic-panel" id="film-panel-guide" role="region" aria-labelledby="film-topic-guide" hidden={topic!=='guide'}>
    <section className="detail-row"><h2 className="detail-label">{isLab?'Model guide':'In this guide'}</h2><div className="detail-content">{isLab?<Markdown entry={entry} blocks={blocks}/>:headings.length?<ol className="film-contents">{headings.map(item=><li className={item.level>2?'film-contents-sub':undefined} key={item.id}><button type="button" onClick={()=>goToHeading(item.id)}>{plain(item.text)}</button></li>)}</ol>:<p>The complete document is available in the reading pane.</p>}</div></section>
   </div>
   <div className="detail-topic-panel" id="film-panel-references" role="region" aria-labelledby="film-topic-references" hidden={topic!=='references'}>
    <section className="detail-row"><h2 className="detail-label">Source document</h2><div className="detail-content"><p className="film-source-path">{entry.sourcePath||entry.title}</p>{entry.mathSource&&<a className="study-link" href={withBase(entry.mathSource)} download>Download executable math functions ↗</a>}{download&&<a className="study-link" href={download} download>Download complete document ↗</a>}</div></section>
    <section className="detail-row"><h2 className="detail-label">Links in this document</h2><div className="detail-content">{refs.length?<ul className="film-references">{refs.map(ref=><li key={ref.url}><a href={ref.url} target="_blank" rel="noreferrer">{ref.name} ↗</a><span>{(()=>{try{return new URL(ref.url).hostname;}catch{return ref.url;}})()}</span></li>)}</ul>:<p>No external links are included in this document. Consult its guide and related entries for the working context.</p>}</div></section>
   </div>
  </div>
 </main>;
}
