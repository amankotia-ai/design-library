import React from 'react';
import {PagePreview} from './system-browser';

export function PageCard({page,system}){
 const detail=`/?panel=pages&section=${page.id}`;
 return <article className="system-card page-shell-card">
  <PagePreview pageId={page.id} name={page.name} systemId={page.systemId}/>
  <div className="system-card-body">
   <div className="card-meta"><span>{page.type}</span></div>
   <h2><a href={detail}>{page.name}</a></h2>
   <p className="page-shell-system"><a href={`/?panel=system&section=${page.id}`}>{system.name}</a><span aria-hidden="true"> · </span><span>{page.sectionIds.length} sections</span></p>
   <p className="page-shell-description">{page.description}</p>
  </div>
 </article>;
}
