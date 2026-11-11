import React, {useEffect, useRef, useState} from 'react';
import {woloOverview,filmReferences} from './film-reference-data';
import {documentParts,Markdown} from './film-markdown';
import breakdowns from './film-breakdowns.json';
import importedCraft from './film-reference-craft.json';
import {referenceBeatAtTime} from './film-reference-timing';
import {filmLearnings} from './film-learnings-data';
import {withBase} from './base';
import './film-references.css';

const entryUrl=id=>withBase(`/?panel=film&entry=${encodeURIComponent(id)}`);
export const filmReferenceCollectionUrl=()=>withBase('/?panel=films&view=films');
export const filmTime=seconds=>`${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
const preciseTime=seconds=>`${Math.floor(seconds/60)}:${(seconds%60).toFixed(2).padStart(5,'0')}`;
const sceneTime=seconds=>`${Math.floor(seconds/60)}:${(seconds%60).toFixed(1).padStart(4,'0').replace(/\.0$/,'')}`;
const range=beat=>`${sceneTime(beat.start)}–${sceneTime(beat.end)}`;

export function FilmReferenceOverview(){
 return <section className="film-reference-overview" aria-labelledby="film-reference-overview-title">
  <div><h2 id="film-reference-overview-title">Inside the edit</h2><p>{filmReferences.length} video references with timecoded observations and production notes. Explore the editing, motion and art direction, then jump to the moment in the film.</p></div>
 </section>;
}

export function FilmReferenceCard({film}){
 const breakdown=breakdowns.find(item=>item.id===film.id);
 return <article className="system-card film-card film-reference-card" data-kind="film">
  <a className="film-reference-poster" href={entryUrl(film.id)} tabIndex={-1} aria-hidden="true"><img src={withBase(film.poster)} alt="" loading="lazy" width="640" height="360"/></a>
  <div className="system-card-body"><div className="card-meta"><span>{film.studio} · {film.category}</span><span>{filmTime(film.duration)} · {film.coverageKind==='sampled'?'Sampled study':'Film'}</span></div><h2><a href={entryUrl(film.id)}>{film.title}</a></h2><p className="film-card-summary">{film.summary}</p>{breakdown&&<p className="film-breakdown-count">{breakdown.scenes.length} scene breakdowns · {breakdown.techniques.length} transition {breakdown.techniques.length===1?'study':'studies'}</p>}{film.beats?.length>0&&<p className="film-breakdown-count">{film.beats.length} timecoded observations</p>}{film.when&&<p className="film-lesson-use"><span>Use when</span>{film.when}</p>}</div>
 </article>;
}

function CraftRows({rows}){
 return <dl className="film-analysis">{rows.map(([label,text])=><div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>;
}

function SourceFrames({frames,film}){
 return <div className="film-source-frames">{frames.map(frame=><figure key={frame.time}><a href={withBase(frame.src)} target="_blank" rel="noreferrer"><img src={withBase(frame.src)} alt={`${film.title} at ${preciseTime(frame.time)}`} width="720" height="405" loading="lazy"/></a><figcaption>{preciseTime(frame.time)}</figcaption></figure>)}</div>;
}

function FilmNotes({film,breakdown,seek}){
 const related=film.relatedLessons.map(id=>filmLearnings.find(lesson=>lesson.id===id)).filter(Boolean);
 return <details className="film-disclosure film-notes"><summary>Transitions & film notes</summary><div className="film-disclosure-body">
  {breakdown?.techniques.length>0&&<section><h2>Transition studies</h2>{breakdown.techniques.map((study,index)=><details className="film-transition" key={index}><summary>{study.title}</summary><div className="film-disclosure-body"><button className="film-seek-link" type="button" onClick={()=>seek(study.start)}>Jump to {range(study)} ↗</button><ol className="film-note-steps">{study.steps.map((step,i)=><li key={i}>{step}</li>)}</ol><p>{study.takeaway}</p><SourceFrames frames={study.frames} film={film}/>{study.evidenceViewer&&<a href={withBase(study.evidenceViewer)} target="_blank" rel="noreferrer">Consecutive-frame sequence ↗</a>}<p className="film-note-muted">{study.certainty}</p></div></details>)}</section>}
  {breakdown&&<section><h2>Film structure</h2><p>{breakdown.structure}</p></section>}
  <section><h2>Visual language</h2><CraftRows rows={[["Editing",breakdown?.editingSystem||film.editing],["Motion",breakdown?.motionSystem||film.motion],["Art direction",breakdown?.artSystem||film.artDirection]]}/></section>
  <section><h2>Suggested production approach</h2><p>{film.when}</p><ol className="film-note-steps">{(breakdown?.reconstruction||film.apply).map(step=><li key={step}>{step}</li>)}</ol></section>
  {related.length>0&&<section><h2>Related lessons</h2><ul className="film-note-links">{related.map(lesson=><li key={lesson.id}><a href={entryUrl(lesson.id)}>{lesson.title} ↗</a></li>)}</ul></section>}
  <section><h2>Sources</h2><ul className="film-note-links"><li><a href={film.source} target="_blank" rel="noreferrer">Original film ↗</a></li><li><a href="https://wolo.digital/work/" target="_blank" rel="noreferrer">Wolo portfolio ↗</a></li><li><a href={withBase(film.notes)} download>Timecoded analysis ↓</a></li><li><a href={withBase('/film-motion/wolo/film-breakdowns.json')} download>Complete breakdown data ↓</a></li><li><a href={withBase(woloOverview.report)} download>Portfolio distillation ↓</a></li><li><a href={withBase(woloOverview.atlas)} target="_blank" rel="noreferrer">Visual atlas ↗</a></li></ul><p className="film-note-muted">{film.review} Scene boundaries describe approximate visual beats. Reconstruction steps are suggestions; exact source easing, software and project settings are unknown.</p></section>
 </div></details>;
}

function ImportedFilmAnalysis({film}){
 const craft=importedCraft.find(item=>item.id===film.id);
 if(!craft)return null;
 return <section className="film-craft" aria-labelledby="film-craft-title">
  <h2 id="film-craft-title">Across the film</h2>
  <CraftRows rows={[["Editing",craft.editing],["Motion",craft.motion],["Art direction",craft.artDirection]]}/>
  <h3>Apply it</h3><ol className="film-note-steps">{craft.apply.map((step,index)=><li key={index}>{step}</li>)}</ol>
 </section>;
}

function ImportedFilmNotes({film}){
 const blocks=documentParts(film.analysisMarkdown);
 return <details className="film-disclosure film-notes" open={film.beats?.length&&importedCraft.some(item=>item.id===film.id)?undefined:true}>
  <summary>Full timecoded notes & sources</summary>
  <div className="film-disclosure-body film-import-notes">
   <Markdown entry={film} blocks={blocks}/>
   <section><h2>Sources & review coverage</h2><p className="film-note-muted">{film.review}</p><ul className="film-note-links"><li><a href={film.source} target="_blank" rel="noreferrer">Original video ↗</a></li><li><a href={withBase(film.notes)} download>Download the complete analysis ↓</a></li></ul></section>
  </div>
 </details>;
}

export function FilmReference({film}){
 const breakdown=breakdowns.find(item=>item.id===film.id);
 const [sceneIndex,setSceneIndex]=useState(0),[status,setStatus]=useState(''),[error,setError]=useState(false);
 const video=useRef(null),pendingSeek=useRef(film.beats?.[0]?.start??null),selectedIndex=useRef(0);
 const imported=Boolean(film.analysisMarkdown);
 const scenes=breakdown?.scenes||film.beats||[];
 const scene=scenes[sceneIndex];
 const initialStart=film.beats?.[0]?.start||0;
 useEffect(()=>{
  const player=video.current;if(!player)return;
  if(!initialStart){syncScene();return;}
  const start=()=>{if(pendingSeek.current===null){syncScene();return;}player.currentTime=pendingSeek.current;pendingSeek.current=null;};
  if(player.readyState>=1)start();else player.addEventListener('loadedmetadata',start,{once:true});
  return ()=>player.removeEventListener('loadedmetadata',start);
 },[film.id,initialStart]);
 function seek(time){
  const player=video.current;if(!player)return;
  pendingSeek.current=time;setStatus(`Moving to ${preciseTime(time)}.`);
  if(player.readyState>=1){player.currentTime=time;pendingSeek.current=null;}else player.load();
 }
 function chooseScene(index){selectedIndex.current=index;setSceneIndex(index);seek(scenes[index].start);}
 function syncScene(){
  const player=video.current;if(!player||player.seeking)return;
  const index=referenceBeatAtTime(scenes,selectedIndex.current,player.currentTime,player.duration);
  if(index!==selectedIndex.current){selectedIndex.current=index;setSceneIndex(index);}
 }
 function loaded(){if(pendingSeek.current!==null){video.current.currentTime=pendingSeek.current;pendingSeek.current=null;}}
 return <main className="system-panel panel-heading system-detail film-detail film-reference-detail">
  <header className="system-detail-intro"><div className="detail-utility"><a className="back-to-systems" href={filmReferenceCollectionUrl()}>← Reference films</a></div><h1>{film.title}</h1><p className="film-reference-meta">{film.studio} · {filmTime(film.duration)}{film.coverageKind==='sampled'?' · Sampled study':''}</p></header>
  <aside className="system-detail-preview-pane film-preview-pane film-reference-pane" aria-label={`${film.title} video`}>
   <video key={film.id} ref={video} className="film-reference-player" src={withBase(film.video)} poster={withBase(scene?.frames?.[0]?.src||film.openingFrame||film.poster)} controls playsInline preload="metadata" aria-label={`${film.title} video`} onLoadedMetadata={loaded} onTimeUpdate={syncScene} onSeeked={()=>{syncScene();setStatus(`At ${preciseTime(video.current.currentTime)}.`);}} onError={()=>{setError(true);setStatus('');}}/>
   {error&&<p className="film-playback-error" role="alert">The video could not load. <a href={film.source} target="_blank" rel="noreferrer">Open the original ↗</a></p>}
   <p className="sr-only" role="status" aria-live="polite">{status}</p>
  </aside>
  <div className="system-detail-copy">
   {scenes.length>0?<section className="film-scene" aria-label="Scene breakdown">
    {scenes.length>1&&<label className="film-scene-select" htmlFor="film-scene-select"><span>{imported?'Beat':'Scene'}</span><select id="film-scene-select" value={sceneIndex} onChange={event=>chooseScene(Number(event.target.value))}>{sceneIndex<0&&<option value={-1} disabled>No analyzed beat at this time</option>}{scenes.map((beat,index)=><option key={index} value={index}>{String(index+1).padStart(2,'0')} · {beat.title}</option>)}</select></label>}
    <>{scene?<><p className="film-scene-time">{range(scene)}</p><p className="film-scene-description">{scene.description}</p></>:<p className="film-scene-description film-note-muted">This moment is outside the analyzed intervals. Choose a beat to jump to an observed moment.</p>}</>
    {!imported&&scene&&<CraftRows rows={[["Editing",scene.editing],["Motion",scene.motion],["Art direction",scene.art]]}/>}
    {!imported&&scene&&<details className="film-disclosure" key={sceneIndex}><summary>Reconstruction & source frames</summary><div className="film-disclosure-body"><p><span className="film-note-label">Suggested approach</span>{scene.rebuild}</p><SourceFrames frames={scene.frames} film={film}/></div></details>}
   </section>:!imported&&<CraftRows rows={[["Editing",film.editing],["Motion",film.motion],["Art direction",film.artDirection]]}/>}
   <>{imported?<><ImportedFilmAnalysis film={film}/><ImportedFilmNotes film={film}/></>:<FilmNotes film={film} breakdown={breakdown} seek={seek}/>}</>
  </div>
 </main>;
}
