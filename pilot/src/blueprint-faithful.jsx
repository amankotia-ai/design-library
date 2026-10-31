import React from 'react';
import {SourceHeader,SourceHero,SourceExamples,SourceComparison,SourceFeatures} from './blueprint-faithful-static';
import {SourcePricing,SourceFAQ,SourceFinal,SourceFooter} from './blueprint-faithful-commerce';
import {SourceEditor} from './blueprint-faithful-editor';
import {SourceFinalTexture} from './blueprint-faithful-texture';
import sourceStyles from './blueprint-source-styles.json';

export function BlueprintStudy({view='blueprint-page'}){
 const embedded=typeof location!=='undefined'&&new URLSearchParams(location.search).get('embed')==='1';const page=view==='blueprint-page';const hero=view==='blueprint-hero';
 return <>{sourceStyles.map(href=><link key={href} rel="stylesheet" href={href}/>)}<div data-source-embed={embedded?'':undefined} className={`site landing bp-faithful ${page?'':'bp-standalone'} bp-source-view-${view.replace('blueprint-','')}`}>
 {(page||hero||view==='blueprint-header')&&<SourceHeader standalone={view==='blueprint-header'}/>}
 {view!=='blueprint-header'&&<main>
 {(page||hero)&&<SourceHero/>}
 {page?<section className="l-showcase" aria-label="The Blueprint editor and examples"><div className="l-wrap"><SourceEditor/><SourceExamples/></div></section>:view==='blueprint-editor'?<section className="l-showcase"><div className="blueprint-editor-context" aria-hidden="true" inert><SourceHero/></div><div className="l-wrap"><SourceEditor/></div></section>:view==='blueprint-examples'?<SourceExamples standalone/>:null}
 {(page||view==='blueprint-compare')&&<SourceComparison/>}
 {(page||view==='blueprint-features')&&<SourceFeatures/>}
 {(page||view==='blueprint-pricing')&&<SourcePricing/>}
 {(page||view==='blueprint-faq')&&<SourceFAQ/>}
 {(page||view==='blueprint-prompt')&&<><SourceFinal/><SourceFinalTexture/></>}
 </main>}
 {(page||view==='blueprint-footer')&&<SourceFooter/>}
 </div></>
}
export function BlueprintSourceNotes(){return <><section className="article-section"><h2>The complete source page.</h2><p>This collection reconstructs Blueprint’s public landing page section by section: navigation, hero, editor, examples, comparison, features, pricing, questions, closing prompt, and footer.</p><p>The source’s Geist fonts, wordmark, illustrations, gallery artwork, comparison videos, component markup, and responsive rules are preserved locally. Pricing toggles, native question disclosures, carousel navigation, editor controls, and exports are rebuilt as working components.</p><p><a href="https://blueprint.page/" target="_blank" rel="noreferrer">Original page: Blueprint ↗</a></p></section><section className="article-section"><h2>Reproduction and expansion stay distinct.</h2><p>Blueprint follows the reference. New sections and original tool behavior must be documented as extensions, separately from recovered source behavior. Source service actions such as sign-in, paid checkout, remixing, and creating a tool link to Blueprint; this local study does not provide its accounts or generation service.</p><p>Animation frames and typed example prompts vary over time. Reference and implementation captures use the same viewport and declared states. Exact asset recovery is recorded separately from measured visual fidelity.</p></section></>}
