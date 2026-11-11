import React,{useLayoutEffect,useRef,useState} from 'react';
import {withBase} from './base.js';

// Each section shares the retained stylesheet, fonts, tokens, assets and interaction adapter.
export function UnifizeStudy({view='unifize-page'}){
 const frame=useRef(null);const observer=useRef(null);const [height,setHeight]=useState(1000);
 useLayoutEffect(()=>()=>observer.current?.disconnect(),[]);
 const loaded=()=>{const doc=frame.current?.contentDocument;if(!doc)return;const measure=()=>{const main=doc.querySelector('main');if(main)setHeight(Math.ceil(main.getBoundingClientRect().height))};doc.fonts.ready.then(()=>{observer.current?.disconnect();observer.current=new ResizeObserver(measure);observer.current.observe(doc.body);doc.addEventListener('toggle',measure,true);measure()})};
 return <iframe ref={frame} onLoad={loaded} title={`Unifize ${view.replace('unifize-','')}`} src={withBase(`/unifize-source/${view.replace('unifize-','')}.html?embed=1`)} style={{display:'block',width:'100%',height,border:0,background:'#1f2126'}}/>;
}
export function UnifizeNotes(){return <section className="article-section"><h2>Unifize: reference and limits</h2><p>The public homepage was captured on 10 November 2026 at 1440px and 390px. IBM Plex Sans, Inter, JetBrains Mono, public illustrations and customer imagery are retained locally. Twelve section layouts share the same tokens and source styles.</p><p>Decorative motion is held at a captured state. Navigation disclosures, product and industry selectors, outcome views and the customer rail use local controls. Booking, customer stories and product destinations open Unifize; its application backend and tracking are not reproduced. Reference captures reveal all section content and omit the cookie banner.</p><p><a href="https://www.unifize.com/" target="_blank" rel="noreferrer">View Unifize ↗</a></p></section>}
