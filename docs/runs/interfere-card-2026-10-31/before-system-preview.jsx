import React from 'react';
import {cn} from './utils';
import './system-preview-tokens.css';
import './system-preview.css';

// A system specimen shows the ingredients; PagePreview shows an assembled page.
export function SystemPreview({system}){
 if(system.id==='salesloft') return <div className="system-preview"><img src={system.preview.image} alt={system.preview.alt} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'top'}}/></div>;
 const editorial=system.id==='editorial-01';const steel=system.id==='steel-source';
 if(system.id==='interfere')return <div className="system-preview interfere-specimen" role="img" aria-label="Interfere: dark surfaces, Inter typography, fine rules and an issue activity timeline"><div className="interfere-specimen-type"><span>Typography / Inter</span><strong>Aa</strong><p>See the signal.<br/>Understand the issue.</p></div><div className="interfere-specimen-palette">{system.swatches.map(([name,color])=><span key={name}><i style={{background:color}}/>{name}</span>)}</div><div className="interfere-specimen-issue"><span>↗ &nbsp; Issue detected <small>Just now</small></span><strong>Broken password reset link</strong><p><i/> Investigating <span>High priority</span></p></div></div>;
 const colors=Object.fromEntries(system.swatches);
 const palette={
  '--specimen-paper':colors.Paper,
  '--specimen-ink':colors.Ink,
  '--specimen-rule':colors.Rule||colors.Paper,
  '--specimen-accent':colors.Blue||colors.Blueprint||colors.Ink,
 };
 const description=steel?'Schengen sans-serif and monospace, cyan wireframes and compact technical controls.':editorial
  ? 'Light condensed serif with sans-serif details, neutral paper and ink, fine rules and sharp photographic crops.'
  : 'Geist sans-serif and monospace, vivid blue with paper and ink, rounded actions and parameter surfaces.';
 return <div className={cn('system-preview',steel?'system-preview-steel':editorial?'system-preview-editorial':'system-preview-blueprint')} style={palette} role="img" aria-label={`${system.name} typography, palette and component specimen. ${description}`}>
  <div className="system-specimen" aria-hidden="true">
   <div className="specimen-typography">
    <div className="specimen-label"><span>Typography</span><span>01</span></div>
    <div className="specimen-letterforms"><span className="specimen-aa">Aa</span><div className="specimen-alphabet">Aa Bb Cc Dd<br/>Ee Ff Gg Hh<br/><span>0123456789</span></div></div>
    <div className="specimen-phrase">{system.specimen.map(line=><span key={line}>{line}</span>)}</div>
   </div>
   <div className="specimen-palette">
    <div className="specimen-label"><span>Palette</span><span>02</span></div>
    <div className="specimen-colors">{system.swatches.map(([name,color])=><div key={name}><span className="specimen-color" style={{background:color}}/><span className="specimen-color-name">{name}</span></div>)}</div>
   </div>
   <div className="specimen-elements">
    <div className="specimen-label"><span>Elements</span><span>03</span></div>
    {steel?<div className="specimen-tool-elements"><div className="specimen-actions"><span className="specimen-action">Start a session <span>↗</span></span><span className="specimen-chip">API</span></div><div className="specimen-parameter"><span>Browser ready</span><code>200 OK</code></div></div>:editorial?<div className="specimen-editorial-elements"><img src="/assets/practice.webp" alt=""/><div><span className="specimen-caption">Light, form,<br/>presence.</span><span className="specimen-text-link">View project <span>↗</span></span></div></div>:<div className="specimen-tool-elements"><div className="specimen-actions"><span className="specimen-action">Create a tool <span>↗</span></span><span className="specimen-chip">4:5</span></div><div className="specimen-parameter"><span>Spacing</span><span className="specimen-slider"><i/></span><span>24</span></div></div>}
   </div>
  </div>
 </div>;
}
