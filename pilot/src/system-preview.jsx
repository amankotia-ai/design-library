import React from 'react';
import {cn} from './utils';
import {InterferePreview} from './interfere-preview';
import './system-preview-tokens.css';
import './system-preview.css';

// A system specimen shows the ingredients; PagePreview shows an assembled page.
export function SystemPreview({system}){
 const editorial=system.id==='editorial-01';const steel=system.id==='steel-source';const signal=system.id==='salesloft';
 if(system.id==='interfere')return <InterferePreview system={system}/>;
 const colors=Object.fromEntries(system.swatches);
 const palette={
  '--specimen-paper':colors.Paper||colors.White,
  '--specimen-ink':colors.Ink||colors.Black,
  '--specimen-rule':colors.Rule||colors.Paper,
  '--specimen-accent':colors.Teal||colors.Blue||colors.Blueprint||colors.Red||colors.Ink,
  '--specimen-highlight':colors.Lime||colors.Paper,
  ...(system.id==='unifize'?{'--specimen-paper':'#1f2126','--specimen-ink':'#f7f8fa','--specimen-rule':'#41444b','--specimen-accent':'#70aeff'}:{}),
 };
 return <div className={cn('system-preview',system.id==='unifize'?'system-preview-unifize':system.id==='conare'?'system-preview-conare':system.id==='mnh'?'system-preview-mnh':system.id==='plasticity'?'system-preview-plasticity':signal?'system-preview-signal':steel?'system-preview-steel':editorial?'system-preview-editorial':'system-preview-blueprint')} style={palette} role="img" aria-label={`${system.name} typography and color palette specimen.`}>
  <div className="system-specimen" aria-hidden="true">
   <div className="specimen-typography">
    <div className="specimen-letterforms"><span className="specimen-aa">Aa</span><div className="specimen-alphabet">Aa Bb Cc Dd<br/>Ee Ff Gg Hh<br/><span>0123456789</span></div></div>
    <div className="specimen-phrase">{signal?<><span>Know which <em>deals</em></span><span>to close <em>next.</em></span></>:system.specimen.map(line=><span key={line}>{line}</span>)}</div>
   </div>
   <div className="specimen-palette">
    <div className="specimen-colors">{system.swatches.map(([name,color])=><div key={name}><span className="specimen-color" style={{background:color}}/><span className="specimen-color-name">{name}</span></div>)}</div>
   </div>
  </div>
 </div>;
}
