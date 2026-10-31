import React,{useRef,useState,useLayoutEffect} from 'react';
import {editorialLayout} from './editorial-layout';
import {cn} from './utils';
import './editorial-adaptation.css';
const position=block=>({...block,left:block.x,top:block.y,lineHeight:block.lineHeight?`${block.lineHeight}px`:undefined,x:undefined,y:undefined});
export function EditorialAdaptation({content,standalone=false,showGrid=false}){
 const host=useRef(null),[layout,setLayout]=useState(()=>editorialLayout(1440));
 useLayoutEffect(()=>{const observer=new ResizeObserver(([entry])=>setLayout(editorialLayout(entry.contentRect.width)));observer.observe(host.current);return()=>observer.disconnect()},[]);
 const b=layout.blocks,href=id=>standalone?`/?view=page#${id}`:`#${id}`;
 return <div className="adaptation-host" ref={host}><section className={cn('editorial-adaptation',layout.mobile&&'editorial-recomposed')} aria-label="Introduction" style={{width:layout.width,height:layout.height}} data-layout-unit={layout.unit} data-row-pitch={layout.pitch}>
  <header className="adaptation-header" style={position(b.header)}><a className="wordmark" href={href('top')}>{content.name}</a><nav aria-label="Portfolio"><a href={href('work')}>Work</a><a href={href('notes')}>Articles</a><a href={href('about')}>About</a><a href={href('contact')}>Contact</a></nav></header>
  <h1 style={position(b.title)}>{content.title.map(line=><span key={line}>{line}</span>)}</h1>
  <img className="adaptation-portrait" src={content.portrait} alt={content.portraitAlt} style={position(b.portrait)}/>
  <p className="adaptation-copy" style={position(b.copy)}>{content.description}</p>
  <span className="adaptation-year" style={position(b.year)}>{content.year}</span><a className="adaptation-next" href={href('work')} style={position(b.next)}>Next Project</a>
  <img className="adaptation-image" src={content.image} alt={content.imageAlt} style={position(b.image)}/>
  {showGrid&&<svg className="adaptation-grid" width={layout.width} height={layout.height} aria-hidden="true">{Array.from({length:layout.columns},(_,i)=><g key={i}><rect x={layout.margin+i*(layout.column+layout.gutter)} y="0" width={layout.column} height={layout.height}/><text x={layout.margin+i*(layout.column+layout.gutter)+4} y="14">{i+1}</text></g>)}{Array.from({length:Math.floor(layout.height/layout.pitch)+1},(_,i)=><line key={i} x1="0" x2={layout.width} y1={i*layout.pitch} y2={i*layout.pitch} className={i%4===0?'major-row':''}/>)}</svg>}
 </section></div>
}
