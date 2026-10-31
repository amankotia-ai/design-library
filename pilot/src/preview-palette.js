// The editable Signal Grid preview has its own document. These variables cross
// its open shadow boundaries while leaving the library and source defaults alone.
const colorVariables={Paper:'paper',Ink:'ink',Muted:'muted',Rule:'rule',Red:'accent'};
export function applyPreviewPalette(doc,colors,defaults){
 if(!doc?.documentElement||!colors||!defaults)return;
 if(Object.keys(colorVariables).some(name=>colors[name]!==defaults[name])){
  doc.querySelectorAll('.conare-source-section').forEach(host=>host.setAttribute('data-palette-edited',''));
 }
 for(const [name,variable] of Object.entries(colorVariables)){
  const value=colors[name];
  if(value&&value!==defaults[name])doc.documentElement.style.setProperty(`--preview-${variable}`,value);
  else doc.documentElement.style.removeProperty(`--preview-${variable}`);
 }
}

const colorAliases={
 '#fefefe':'paper','#020202':'ink','#6c6a68':'muted',
 '#dedddc':'rule','#dfdedd':'rule','#d6d6d6':'rule','#ea3325':'accent'
};
export function bindPreviewColors(css){
 return css.replace(/#(?:fefefe|020202|6c6a68|dedddc|dfdedd|d6d6d6|ea3325)(?![\da-f])/gi,
  value=>`var(--preview-${colorAliases[value.toLowerCase()]},${value})`);
}
