import React from 'react';
import {cn} from './utils';
import {quoteContent,quoteReferenceContent} from './data';

export function Quote({content,faithful=false,layout='portrait',id='perspective'}){
 const value=content||(faithful?quoteReferenceContent:quoteContent);
 return <section id={id} className={cn('editorial-quote',faithful?'quote-faithful':`quote-adapted quote-${layout}`)} aria-label={faithful?'Attributed testimonial reference study':'On composition'}>
  {layout==='portrait'&&value.image&&<img className="quote-image" src={value.image} alt={value.imageAlt}/>}
  <figure className="quote-text">
   <blockquote><p>{faithful&&value.lines?value.lines.map(line=><span key={line}>{line}</span>):value.quote}</p></blockquote>
   <figcaption><span>{value.attribution}</span><span>{value.context}</span></figcaption>
  </figure>
  {!faithful&&<p className="quote-disclosure">{value.disclosure}</p>}
 </section>;
}

export function QuoteStudy(){return <main className="section-canvas"><Quote faithful/><aside className="study-disclosure">Reference reproduction / Bernardo Lickfold. Source quotation and names are reproduced as design-study content, not a verified endorsement. Fonts are substitutes. <a href="/?panel=sources">Source & limitations</a></aside></main>}
