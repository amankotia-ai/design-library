import React from 'react';
import './interfere-preview.css';

// An authored type, palette and interface specimen; the page preview stays separate.
export function InterferePreview({system}){
 return <div className="system-preview interfere-specimen" role="img" aria-label="Interfere design system: Inter sans-serif paired with Heldane serif, a four-tone dark palette, and an issue panel showing a broken password reset link under investigation at high priority.">
  <div className="interfere-specimen-content" aria-hidden="true">
   <div className="interfere-specimen-type">
    <div className="interfere-specimen-label"><span>Typography</span><span>01</span></div>
    <div className="interfere-specimen-letterforms">
     <div><span className="interfere-specimen-sans">Aa</span><span className="interfere-specimen-font-name">Inter</span></div>
     <div><span className="interfere-specimen-serif">Aa</span><span className="interfere-specimen-font-name">Heldane</span></div>
    </div>
    <p className="interfere-specimen-phrase">See the signal.<br/>Understand the issue.</p>
   </div>
   <div className="interfere-specimen-palette">
    <div className="interfere-specimen-label"><span>Palette</span><span>02</span></div>
    <div className="interfere-specimen-colors">{system.swatches.map(([name,color])=><div key={name}><i style={{background:color}}/><span>{name}</span></div>)}</div>
   </div>
   <div className="interfere-specimen-elements">
    <div className="interfere-specimen-label"><span>Elements</span><span>03</span></div>
    <div className="interfere-specimen-issue">
     <div className="interfere-specimen-event"><span><span className="interfere-specimen-event-mark">↗</span> Issue detected</span><span>Just now</span></div>
     <strong>Broken password reset link</strong>
     <div className="interfere-specimen-status"><span><i/>Investigating</span><span>High priority</span></div>
    </div>
   </div>
  </div>
 </div>;
}
