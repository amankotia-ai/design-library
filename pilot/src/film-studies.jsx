import React from 'react';
import {MotionStudies} from './film-motion-studies';
import {TimingStudies} from './film-timing-studies';
import {filmStudies} from './film-study-registry';
import {withBase} from './base';
import './film-studies.css';

export function StudyNavigation({activeId}){
 return <nav className="study-navigation" aria-label="Interactive film studies"><label><span>Explore the mathematics</span><select aria-label="Interactive example" value={activeId} onChange={event=>{location.href=withBase(`/?panel=film&entry=${encodeURIComponent(event.target.value)}`);}}>{filmStudies.map((study,i)=><option key={study.id} value={study.id}>{String(i+1).padStart(2,'0')} · {study.short}</option>)}</select></label></nav>;
}

export function FilmStudy({studyId}){
 const study=filmStudies.find(item=>item.id===studyId);
 if(!study)return <p>Choose an interactive example above.</p>;
 return study.family==='motion'?<MotionStudies key={studyId} studyId={studyId}/>:<TimingStudies key={studyId} studyId={studyId}/>;
}
