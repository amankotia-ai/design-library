import React,{useState} from 'react';

// The placeholder occupies the existing preview frame only while its content loads.
export function PreviewSkeleton({revealing=false}){
 return <div className={revealing?'preview-skeleton is-revealing':'preview-skeleton'} aria-hidden="true"><div className="preview-skeleton-nav"><i/><i/><i/></div><div className="preview-skeleton-body"><i/><i/><i/><i/></div><div className="preview-skeleton-block"/></div>;
}

export function PreviewImage({src}){
 const [state,setState]=useState('loading');
 return <>
  {state!=='error'&&<PreviewSkeleton revealing={state==='loaded'}/>}
  {state==='error'?<span className="preview-unavailable">Preview unavailable</span>:<img src={src} alt="" loading="lazy" className={state==='loaded'?'preview-loaded':'preview-loading'} onLoad={()=>setState('loaded')} onError={()=>setState('error')}/>}
 </>;
}

// Shown only while a collection's code is actually loading.
export function CollectionSkeleton({panel}){
 const isSystems=panel==='systems';
 const isPages=panel==='pages';
 const title=isSystems?'Design Systems':isPages?'Pages':'Sections';
 return <main className={isSystems?'system-home collection-skeleton':'asset-catalog collection-skeleton'} aria-busy="true">
  <div className="catalog-heading"><h1>{title}</h1>{!isSystems&&<div className="collection-skeleton-filters" aria-hidden="true"><i/>{!isPages&&<i/>}</div>}</div>
  <span className="sr-only" role="status">Loading {title}</span>
  <div className="system-cards" aria-hidden="true">{Array.from({length:3},(_,i)=><div className="system-card" key={i}><div className={`collection-skeleton-preview ${isSystems?'for-systems':isPages?'for-pages':'for-sections'}`}><PreviewSkeleton/></div><div className="collection-skeleton-caption"><i/><i/><i/></div></div>)}</div>
 </main>;
}
