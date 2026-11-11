import React, {useState} from 'react';
import {filmEntries} from './film-data';
import {filmLearnings,learningSourceGuideIds} from './film-learnings-data';
import {filmStudies} from './film-study-registry';
import {withBase} from './base';
import {LessonThumbnail} from './film-lesson-thumbnails';
import {FilmLessonVisual} from './film-lesson-visual';
import {lessonExamples} from './film-lesson-examples';

const entryUrl=id=>withBase(`/?panel=film&entry=${encodeURIComponent(id)}`);
const archivedGuides=new Set(learningSourceGuideIds);
export const filmCatalogEntries=[...filmLearnings,...filmEntries.filter(entry=>entry.kind!=='research'&&!archivedGuides.has(entry.id))];

export function FilmLessonCard({lesson}){
 return <article className="system-card film-card film-lesson-card" data-kind="lesson">
  <a className="film-lesson-preview" href={entryUrl(lesson.id)} tabIndex={-1} aria-hidden="true"><LessonThumbnail lessonId={lesson.id}/></a>
  <div className="system-card-body"><div className="card-meta"><span>{lesson.category}</span><span>Lesson</span></div><h2><a href={entryUrl(lesson.id)}>{lesson.title}</a></h2><p className="film-card-summary">{lesson.summary}</p><p className="film-lesson-use"><span>Use when</span>{lesson.when}</p></div>
 </article>;
}

export function FilmLesson({lesson}){
 const [topic,setTopic]=useState('lesson');
 const example=lessonExamples[lesson.id];
 const lab=filmStudies.find(study=>study.id===example.lab);
 const sources=lesson.sources.map(source=>({...source,entry:filmEntries.find(entry=>entry.id===source.entryId)})).filter(source=>source.entry);
 const related=filmLearnings.filter(entry=>entry.id!==lesson.id&&entry.category===lesson.category).slice(0,2);
 return <main className="system-panel panel-heading system-detail film-detail film-lesson-detail">
  <div className="system-detail-intro">
   <div className="detail-utility"><a className="back-to-systems" href={withBase('/?panel=films')}>← Film & Motion</a></div>
   <p className="film-lesson-category">{lesson.category}</p>
   <h1>{lesson.title}</h1>
   <div className="film-lesson-takeaway"><p>Takeaway</p><strong>{example.takeaway}</strong></div>
  </div>
  <div className="system-detail-preview-pane film-lesson-pane">
   <div className="film-lesson-reader">
    <FilmLessonVisual lesson={lesson} example={example}/>
    <nav className="film-lesson-labs" aria-label="Motion labs">
     {lab&&<a href={entryUrl(lab.id)}>{lab.title} <span aria-hidden="true">↗</span></a>}
     <a href={withBase('/?panel=films&view=labs')}>All motion labs <span aria-hidden="true">↗</span></a>
    </nav>
   </div>
  </div>
  <div className="system-detail-copy">
   <fieldset className="detail-topics"><legend className="sr-only">Lesson information</legend>{[['lesson','Lesson'],['references','References']].map(([id,label])=><label className="detail-topic" data-label={label} key={id}><input type="radio" name="film-lesson-topic" id={`film-lesson-topic-${id}`} value={id} checked={topic===id} onChange={()=>setTopic(id)} aria-controls={`film-lesson-panel-${id}`}/><span>{label}</span></label>)}</fieldset>
   <div className="detail-topic-panel" id="film-lesson-panel-lesson" role="region" aria-labelledby="film-lesson-topic-lesson" hidden={topic!=='lesson'}>
    <section className="detail-row"><h2 className="detail-label">When to use it</h2><div className="detail-content"><p>{lesson.when}</p></div></section>
    <section className="detail-row film-lesson-steps"><h2 className="detail-label">Put it into practice</h2><div className="detail-content"><ol>{lesson.steps.map((step,index)=><li key={index}>{step}</li>)}</ol></div></section>
    <section className="detail-row"><h2 className="detail-label">Watch for</h2><div className="detail-content"><p>{lesson.watchFor}</p></div></section>
    {related.length>0&&<section className="detail-row"><h2 className="detail-label">Keep learning</h2><div className="detail-content"><ul className="film-related">{related.map(entry=><li key={entry.id}><a href={entryUrl(entry.id)}>{entry.title} ↗</a></li>)}</ul></div></section>}
   </div>
   <div className="detail-topic-panel" id="film-lesson-panel-references" role="region" aria-labelledby="film-lesson-topic-references" hidden={topic!=='references'}>
    <section className="detail-row"><h2 className="detail-label">Source notes</h2><div className="detail-content"><ul className="film-references">{sources.map((source,index)=><li key={`${source.entryId}-${index}`}><a href={entryUrl(source.entryId)}>{source.entry.title} ↗</a>{source.section&&<span>{source.section}</span>}</li>)}</ul></div></section>
   </div>
  </div>
 </main>;
}
