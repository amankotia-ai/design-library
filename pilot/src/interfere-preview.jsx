import React from 'react';
import './interfere-preview.css';

// An authored type and palette specimen; the page preview stays separate.
export function InterferePreview({system}){
 return <div className="system-preview interfere-specimen" role="img" aria-label="Interfere design system: Inter sans-serif paired with Heldane serif and a four-tone dark palette.">
  <div className="interfere-specimen-content" aria-hidden="true">
   <div className="interfere-specimen-type">
    <div className="interfere-specimen-letterforms">
     <div><span className="interfere-specimen-sans">Aa</span><span className="interfere-specimen-font-name">Inter</span></div>
     <div><span className="interfere-specimen-serif">Aa</span><span className="interfere-specimen-font-name">Heldane</span></div>
    </div>
    <p className="interfere-specimen-phrase">See the signal.<br/>Understand the issue.</p>
   </div>
   <div className="interfere-specimen-palette">
    <div className="interfere-specimen-colors">{system.swatches.map(([name,color])=><div key={name}><i style={{background:color}}/><span>{name}</span></div>)}</div>
   </div>
  </div>
 </div>;
}
