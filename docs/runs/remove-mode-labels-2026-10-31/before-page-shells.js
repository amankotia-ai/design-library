// A page is a composition with its own identity, separate from its design system.
// IDs preserve the existing full-page and library-detail URLs.
export const pageShells=[
 {
  id:'page',systemId:'editorial-01',name:'Portfolio homepage',type:'Portfolio',mode:'Original expansion',
  description:'An image-led portfolio, from selected work and project stories to a studio note and contact footer.',
  sectionIds:['hero','image-index','project-detail','feature','split-material','quote','image-rail','footer']
 },
 {
  id:'blueprint-page',systemId:'blueprint-source',name:'Creative tool landing page',type:'Landing page',mode:'Source study',
  description:'A complete product story with a working demo, examples, features, pricing, FAQs, and a closing call to action.',
  sectionIds:['blueprint-header','blueprint-hero','blueprint-editor','blueprint-examples','blueprint-compare','blueprint-features','blueprint-pricing','blueprint-faq','blueprint-prompt','blueprint-footer']
 }
];
