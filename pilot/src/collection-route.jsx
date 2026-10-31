import React,{Suspense,useLayoutEffect,useRef} from 'react';
import {CollectionSkeleton} from './library-loading';

class CollectionErrorBoundary extends React.Component {
 constructor(props){super(props);this.state={failed:false};}
 static getDerivedStateFromError(){return {failed:true};}
 render(){
  if(this.state.failed)return <main className="collection-error" role="alert"><h1>{this.props.title}</h1><p>Couldn’t load this collection. <a href={location.href}>Try again</a></p></main>;
  return this.props.children;
 }
}
function PendingCollection({panel,seen}){
 useLayoutEffect(()=>{seen.current=true},[seen]);
 return <CollectionSkeleton panel={panel}/>;
}
function ReadyCollection({panel,seen,restoreY,children}){
 useLayoutEffect(()=>{if(typeof restoreY==='number')window.scrollTo({top:restoreY,behavior:'instant'});},[restoreY]);
 return <div className="collection-reveal">{children}{seen.current&&<div className="collection-skeleton-overlay" aria-hidden="true"><CollectionSkeleton panel={panel}/></div>}</div>;
}
export function CollectionRoute({panel,restoreY,children}){
 const seen=useRef(false);
 const title=panel==='systems'?'Design Systems':panel==='sections'?'Sections':'Pages';
 return <CollectionErrorBoundary title={title}><Suspense fallback={<PendingCollection panel={panel} seen={seen}/>}><ReadyCollection panel={panel} seen={seen} restoreY={restoreY}>{children}</ReadyCollection></Suspense></CollectionErrorBoundary>;
}
