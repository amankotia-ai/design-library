import {SourceFeatureMosaic} from './blueprint-faithful-motion';
import React,{useLayoutEffect,useMemo,useRef} from 'react';
import sourceParts from './blueprint-source-parts.json';
import {useSourceGalleryPreviews} from './blueprint-faithful-gallery';
import {rebase,withBase} from './base.js';
const parts=rebase(sourceParts);

// reference reconstruction markup and public assets are preserved with attribution in the
// intake manifest. These functions retain reusable section boundaries while the
// reconstructed page supplies local behavior rather than the source Next app.
const defaultPageHref=withBase('/?view=blueprint-page');
function safeMarkup(html){return html.replace(/action="javascript:[^"]*"/g,'action="https://blueprint.page/login"')}
function followSectionLink(event,pageHref){
 const anchor=event.target.closest?.('a[href]');if(!anchor)return;
 const href=anchor.getAttribute('href');if(!href?.startsWith('#'))return;
 if(!document.getElementById(href.slice(1))){event.preventDefault();location.assign(pageHref+href)}
}
export function SourceMarkup({html,pageHref=defaultPageHref,onClick,onSubmit,innerRef}){
 return <div ref={innerRef} style={{display:'contents'}} onClick={e=>{followSectionLink(e,pageHref);onClick?.(e)}} onSubmit={onSubmit} dangerouslySetInnerHTML={{__html:safeMarkup(html)}}/>;
}

export function SourceHeader({pageHref=defaultPageHref,standalone=false}){
 const ref=useRef(null);const html=useMemo(()=>parts.header.replace('href="https://blueprint.page/welcome"',`href="${pageHref}"`),[pageHref]);
 useLayoutEffect(()=>{const header=ref.current?.querySelector('.l-head');if(!header)return;
  const update=()=>{const hero=document.querySelector('.l-hero');const inHero=hero?hero.getBoundingClientRect().bottom>60:standalone;header.dataset.tone=inHero?'hero':'base';if(standalone)header.style.backgroundColor='var(--brand)'};
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[standalone]);
 return <SourceMarkup innerRef={ref} html={html} pageHref={pageHref}/>;
}
export function SourceHero({pageHref=defaultPageHref}){return <SourceMarkup html={parts.hero} pageHref={pageHref}/>}

function examplesMarkup(){
 const start=parts.showcase.indexOf('<div class="examples-head"');
 if(start<0)throw new Error('Blueprint source examples were not preserved');
 // Keep the exact heading, rail and closing CTA, excluding the editor and only
 // the outer showcase/.l-wrap closing tags owned by the assembled component.
 return parts.showcase.slice(start).replace(/<\/div><\/section>\s*$/,'');
}
export function SourceExamples({pageHref=defaultPageHref,standalone=false}){
 const ref=useRef(null);const html=useMemo(examplesMarkup,[]);
 useSourceGalleryPreviews(ref);
 useLayoutEffect(()=>{const node=ref.current,track=node?.querySelector('.g-cards'),rail=node?.querySelector('.g-rail');if(!track||!rail)return;
  const previous=node.querySelector('.g-prev'),next=node.querySelector('.g-next');
  // Source uses native horizontal scrolling and snap. The reconstruction keeps
  // both arrows in the tab order so the same controls are keyboard reachable.
  previous?.removeAttribute('tabindex');next?.removeAttribute('tabindex');
  const update=()=>{const max=track.scrollWidth-track.clientWidth,start=track.scrollLeft<2,end=track.scrollLeft>=max-2;rail.toggleAttribute('data-start',start);rail.toggleAttribute('data-end',end);if(previous)previous.disabled=start;if(next)next.disabled=end};
  let drag=null;
  const down=e=>{if(e.pointerType!=='mouse'||e.button!==0||e.target.closest('a,button,form,input,iframe'))return;drag={id:e.pointerId,x:e.clientX,left:track.scrollLeft,moved:false}};
  const move=e=>{if(!drag||e.pointerId!==drag.id)return;const delta=e.clientX-drag.x;if(!drag.moved&&Math.abs(delta)>6){drag.moved=true;track.setAttribute('data-dragging','');track.setPointerCapture(e.pointerId)}if(drag.moved){e.preventDefault();track.scrollLeft=drag.left-delta}};
  const end=e=>{if(!drag||e.pointerId!==drag.id)return;track.removeAttribute('data-dragging');if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId);drag=null;update()};
  track.scrollLeft=0;update();track.addEventListener('scroll',update,{passive:true});track.addEventListener('pointerdown',down);track.addEventListener('pointermove',move);track.addEventListener('pointerup',end);track.addEventListener('pointercancel',end);const observer=new ResizeObserver(update);observer.observe(track);
  return()=>{track.removeEventListener('scroll',update);track.removeEventListener('pointerdown',down);track.removeEventListener('pointermove',move);track.removeEventListener('pointerup',end);track.removeEventListener('pointercancel',end);observer.disconnect()};
 },[html]);
 const click=e=>{const arrow=e.target.closest?.('.g-arrow');if(!arrow)return;const track=ref.current.querySelector('.g-cards'),card=track.querySelector('.g-card'),style=getComputedStyle(track);const stride=card.getBoundingClientRect().width+(parseFloat(style.columnGap)||12);const available=track.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);const step=Math.max(1,Math.floor(available/stride))*stride;track.scrollBy({left:(arrow.classList.contains('g-prev')?-1:1)*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
 const submit=e=>{const form=e.target.closest?.('form');if(!form)return;e.preventDefault();const card=form.closest('.g-card'),link=card?.querySelector('a.g-act');if(link){const target=new URL(link.href);location.assign(`https://blueprint.page/login?next=${encodeURIComponent(target.pathname)}`)}else{location.assign('https://blueprint.page/new?prompt='+encodeURIComponent('Make a dither design tool with Atkinson, Bayer and error diffusion, on noise or my own images.'))}};
 const content=<SourceMarkup innerRef={ref} html={html} pageHref={pageHref} onClick={click} onSubmit={submit}/>;
 return standalone?<section className="l-showcase"><div className="l-wrap">{content}</div></section>:content;
}
export function SourceComparison({pageHref=defaultPageHref}){
 const ref=useRef(null);
 useLayoutEffect(()=>{const videos=[...ref.current.querySelectorAll('video')];const reduced=matchMedia('(prefers-reduced-motion: reduce)');let visible=false;
  const update=()=>videos.forEach(video=>{video.muted=true;if(visible&&!reduced.matches){video.play().catch(()=>{})}else video.pause()});
  const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);update()},{threshold:.05});videos.forEach(video=>observer.observe(video));reduced.addEventListener('change',update);
  return()=>{observer.disconnect();reduced.removeEventListener('change',update);videos.forEach(video=>video.pause())};
 },[]);
 return <SourceMarkup innerRef={ref} html={parts.compare} pageHref={pageHref}/>;
}
export function SourceFeatures(){
 const source=parts.features;const heading=source.match(/<div class="s-head"[^>]*>([\s\S]*?)<\/div>/)?.[1]||'';const action=source.match(/<p class="l-try"[^>]*>([\s\S]*?)<\/p>/)?.[1]||'';
 return <section className="l-section" id="features"><div className="l-wrap"><div className="s-head" dangerouslySetInnerHTML={{__html:heading}}/><SourceFeatureMosaic/><p className="l-try" dangerouslySetInnerHTML={{__html:action}}/></div></section>
}
