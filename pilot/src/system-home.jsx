import React from 'react';
import {systems,sections} from './data';
import {SystemPreview} from './system-preview';

const pageFor = system => sections.find(section => section.systemId === system.id && section.id.endsWith('page')).id;
const systemUrl = system => `/?panel=system&section=${pageFor(system)}`;

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
