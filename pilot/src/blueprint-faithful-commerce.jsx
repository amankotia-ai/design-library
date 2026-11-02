import {SourceFaqItems} from './blueprint-faithful-motion';
import React,{useState,useEffect,useRef} from 'react';
import sourceParts from './blueprint-source-parts.json';
import {rebase,withBase} from './base.js';
const parts=rebase(sourceParts);

// Source markup is retained as declarative section content. React owns the visible
// controls and state; no source application bundle, account code or analytics runs.
const clean=html=>(html||'').replace(/\sdata-rv="[^"]*"/g,'').replace(/<!--[^]*?-->/g,'');
function elementByClass(html,tag,className){
 const startTag=new RegExp(`<${tag}\\b[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>`,'g');
 const found=startTag.exec(html);if(!found)return '';
 const tokens=new RegExp(`</?${tag}\\b[^>]*>`,'g');tokens.lastIndex=found.index;let depth=0,token;
 while((token=tokens.exec(html))){depth+=token[0].startsWith('</')?-1:1;if(depth===0)return html.slice(found.index,tokens.lastIndex)}
 return '';
}
function inner(html){return html.slice(html.indexOf('>')+1,html.lastIndexOf('</'))}
function contents(html,tag,className){return inner(elementByClass(html,tag,className))}
function pageLinks(html,pageHref){return clean(html).replace(/href="([^"]*)"/g,(_,href)=>{let url=href;if(href==='https://blueprint.page/welcome')url=pageHref;else if(href.startsWith('https://blueprint.page/welcome#'))url=pageHref+href.slice('https://blueprint.page/welcome'.length);else if(href==='/welcome')url=pageHref;else if(href.startsWith('/welcome#'))url=pageHref+href.slice(8);else if(href.startsWith('/')&&!href.startsWith('//')&&!href.startsWith(withBase('/?view=')))url='https://blueprint.page'+href;return 'href="'+url+'"'})}
function Markup({html,onClick}){return <div style={{display:'contents'}} onClick={onClick} dangerouslySetInnerHTML={{__html:html}}/>}
const compareChevron=<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;

export function SourcePricing(){
 const [period,setPeriod]=useState('year');const [expanded,setExpanded]=useState(false);
 const source=clean(period==='month'?(parts.pricingMonthly||parts.pricing):parts.pricing);
 const header=contents(source,'div','s-head');
 const plans=pageLinks(contents(source,'div','plans'),withBase('/?view=blueprint-page'));
 const free=pageLinks(contents(source,'div','plan-free'),withBase('/?view=blueprint-page'));
 const facts=contents(source,'ul','pricing-facts');
 const comparison=contents(contents(source,'div','pricing-compare'),'div','pc-body');
 return <section className="l-section" id="pricing"><div className="l-wrap">
  <div className="s-head" dangerouslySetInnerHTML={{__html:header}}/>
  <div className="pricing">
   <div className="pricing-toggle" id="launch" data-period={period} role="group" aria-label="Billing period">
    <button className={period==='month'?'on':''} aria-pressed={period==='month'} onClick={()=>setPeriod('month')}>Monthly<span className="pricing-save">30% off 1st month</span></button>
    <button className={period==='year'?'on':''} aria-pressed={period==='year'} onClick={()=>setPeriod('year')}>Yearly <span className="pricing-save">2 months free</span></button>
   </div>
   <div className="plans" dangerouslySetInnerHTML={{__html:plans}}/>
   <div className="plan-free" dangerouslySetInnerHTML={{__html:free}}/>
   <div className="pricing-meta"><ul className="pricing-facts" dangerouslySetInnerHTML={{__html:facts}}/><button type="button" className="pricing-compare-btn" aria-expanded={expanded} aria-controls="compare-plans" onClick={()=>setExpanded(v=>!v)}>{expanded?'Hide comparison':'Compare all plans'}{compareChevron}</button></div>
   <div className="pricing-compare" id="compare-plans" data-open={expanded?'':undefined} inert={!expanded}><div><div className="pc-body" dangerouslySetInnerHTML={{__html:pageLinks(comparison,withBase('/?view=blueprint-page'))}}/></div></div>
  </div>
 </div></section>
}

export function SourceFAQ(){const html=clean(parts.faq);const title=html.match(/<div class="s-head"[^>]*>([\s\S]*?)<\/div>/)?.[1]||'';const items=[...html.matchAll(/<details[^>]*><summary>([\s\S]*?)<span class="faq-icon"[\s\S]*?<div class="faq-a"><p>([\s\S]*?)<\/p><\/div><\/details>/g)].map(m=>({q:m[1],a:m[2].replace(/<[^>]+>/g,'')}));return <section className="l-section l-faq" id="faq"><div className="l-wrap"><div className="s-head" dangerouslySetInnerHTML={{__html:title}}/><SourceFaqItems items={parts.faqItems||items}/></div></section>}

export function SourceFinal({examplePrompt=parts.finalPrompt||''}){
 const ref=useRef(null);const examples=parts.finalExamples||[examplePrompt];
 const [user,setUser]=useState(examples.length?null:'');const [clock,setClock]=useState({index:0,shown:0});const [focused,setFocused]=useState(false);const [sending,setSending]=useState(false);const [visible,setVisible]=useState(false);const [reduced,setReduced]=useState(()=>typeof window!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);mq.addEventListener('change',update);const io=new IntersectionObserver(entries=>setVisible(entries.some(e=>e.isIntersecting)));io.observe(ref.current);const restore=e=>{if(e.persisted)setSending(false)};window.addEventListener('pageshow',restore);return()=>{io.disconnect();mq.removeEventListener('change',update);window.removeEventListener('pageshow',restore)}},[]);
 const ghost=user===null;const sample=examples[clock.index%Math.max(1,examples.length)]||'';
 useEffect(()=>{if(!ghost||!visible||focused||sending||!examples.length)return;const {index,shown}=clock;const full=examples[index%examples.length];let delay,next;
  if(reduced){delay=shown===full.length?5000:0;next=shown===full.length?{index:index+1,shown:examples[(index+1)%examples.length].length}:{index,shown:full.length}}
  else if(shown<full.length){delay=28+46*Math.random()+180*Number(/[,.:]/.test(full[shown-1]||''));next={index,shown:shown+1}}
  else if(shown===full.length){delay=2600;next={index,shown:shown+1}}
  else if(shown<2*full.length+1){delay=14+10*Math.random();next={index,shown:shown+1}}
  else{delay=500;next={index:index+1,shown:0}}
  const id=setTimeout(()=>setClock(next),delay);return()=>clearTimeout(id)
 },[ghost,visible,focused,sending,clock,reduced,examples]);
 const displayed=ghost?sample.slice(0,clock.shown>sample.length?Math.max(0,2*sample.length+1-clock.shown):clock.shown):user;const prompt=ghost?sample:user;const valid=!!prompt.trim();
 return <section className="l-final" aria-labelledby="final-title"><div className="ft" aria-hidden="true"><canvas className="ft-canvas"/></div><div className="l-wrap"><div className="final-stage"><div className="final-card"><h2 id="final-title">What tool do you need?</h2><p className="l-final-sub">Describe it in a sentence. Your first tool is free.</p><form ref={ref} className="cta-form" aria-busy={sending} action="https://blueprint.page/new" method="get" onSubmit={e=>{if(sending||!valid)e.preventDefault();else setSending(true)}}><label className="sr-only" htmlFor="cta-prompt">Describe the tool you need</label><input type="hidden" name="prompt" value={prompt}/><div className="cta-box"><textarea id="cta-prompt" rows="2" maxLength="500" readOnly={sending} aria-live="off" aria-describedby={ghost?'cta-hint':undefined} value={displayed} placeholder={ghost?undefined:'Describe the tool you need…'} onFocus={()=>{setFocused(true);if(ghost)setClock(c=>({...c,shown:sample.length}))}} onBlur={()=>setFocused(false)} onChange={e=>setUser(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(valid)e.currentTarget.form?.requestSubmit()}}}/><button type="submit" className="cta-send" aria-label={sending?'Creating your tool':'Create the tool'} disabled={!valid} data-sending={sending||undefined}>{sending?<span className="send-spinner" aria-hidden="true"/>:<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5"/></svg>}</button></div>{ghost&&<p id="cta-hint" className="sr-only">The field shows example requests. Send one as it is, or type your own.</p>}<p className="cta-status" aria-live="polite">{sending?'Creating your tool…':''}</p></form></div></div></div></section>
}

export function SourceFooter({pageHref=withBase('/?view=blueprint-page'),onFeedback}){
 function handleClick(event){const button=event.target.closest?.('button.sf-link');if(!button)return;if(onFeedback){onFeedback();return}location.href='https://blueprint.page/support'}
 return <footer className="sf" onClick={handleClick} dangerouslySetInnerHTML={{__html:inner(pageLinks(parts.footer,pageHref))}}/>;
}
