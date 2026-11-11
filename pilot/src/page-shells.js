// A page is a composition with its own identity, separate from its design system.
// IDs preserve the existing full-page and library-detail URLs.
export const pageShells=[
 {
  id:'page',systemId:'editorial-01',name:'Portfolio homepage',type:'Portfolio',
  description:'An image-led portfolio, from selected work and project stories to a studio note and contact footer.',
  sectionIds:['hero','image-index','project-detail','feature','split-material','quote','image-rail','footer']
 },
 {
  id:'blueprint-page',systemId:'blueprint-source',name:'Creative tool landing page',type:'Landing page',
  description:'A complete product story with a working demo, examples, features, pricing, FAQs, and a closing call to action.',
  sectionIds:['blueprint-header','blueprint-hero','blueprint-editor','blueprint-examples','blueprint-compare','blueprint-features','blueprint-pricing','blueprint-faq','blueprint-prompt','blueprint-footer']
 },
 {id:'salesloft-page',systemId:'salesloft',name:'Revenue platform landing page',type:'Landing page',description:'A product-led sales platform story with an agent demo, alternating features, integrations and a closing invitation.',sectionIds:['salesloft-header','salesloft-hero','salesloft-pipeline','salesloft-risk','salesloft-integrations','salesloft-footer']},
 {id:'interfere-page',systemId:'interfere',name:'Observability landing page',type:'Landing page',description:'A product-led story from issue detection and investigation to resolution, security and the latest releases.',sectionIds:['interfere-header','interfere-hero','interfere-trust','interfere-overview','interfere-testimonial','interfere-monitoring','interfere-triage','interfere-resolution','interfere-security','interfere-releases','interfere-footer']}
];

pageShells.push({"id": "steel-page", "systemId": "steel-source", "name": "Browser infrastructure landing page", "type": "Landing page", "description": "A technical product story with wireframe architecture, browser demonstrations, use cases, integrations, enterprise features, FAQs and open-source links.", "sectionIds": ["steel-header", "steel-hero", "steel-demo", "steel-customers", "steel-stats", "steel-use-cases", "steel-features", "steel-integrations", "steel-enterprise", "steel-stealth", "steel-faq", "steel-blog", "steel-cta", "steel-footer"]});

pageShells.push({id:'conversion-page',systemId:'conversion',name:'Marketing automation landing page',type:'Landing page',description:'A product-led marketing platform story with agent examples, a context diagram, feature mosaic, customer proof and security.',sectionIds:['conversion-header','conversion-hero','conversion-logos','conversion-agents','conversion-context','conversion-platform','conversion-testimonial','conversion-security','conversion-resources','conversion-closing','conversion-footer']});

pageShells.push({id:'plasticity-page',systemId:'plasticity',name:'CAD product landing page',type:'Landing page',description:'A creative CAD product story with modeling demonstrations, pricing, customer perspectives and FAQs.',sectionIds:['plasticity-header','plasticity-hero','plasticity-downloads','plasticity-features','plasticity-why','plasticity-pricing','plasticity-creativity','plasticity-testimonials','plasticity-faq','plasticity-footer']});

pageShells.push({id:'mnh-page',systemId:'mnh',name:'Venture capital homepage',type:'Landing page',description:'An investment firm introduction with portfolio highlights, editorial content, a company statement and contact information.',sectionIds:['mnh-header','mnh-hero','mnh-portfolio','mnh-content','mnh-about','mnh-footer']});

pageShells.push({id:'conare-page',systemId:'conare',name:'Retrieval platform landing page',type:'Landing page',description:'A technical product story with a use-case demo, integrations, workflow, capabilities, security and FAQs.',sectionIds:['conare-header','conare-hero','conare-integrations','conare-workflow','conare-products','conare-security','conare-parse','conare-benchmarks','conare-price','conare-faq','conare-footer']});

pageShells.push({id:'conare-evals-page',systemId:'conare',name:'Benchmark evaluations page',type:'Research',description:'An evaluation overview with featured benchmarks, ranked comparison cards, a price chart, losses and methodology.',sectionIds:['conare-evals-header','conare-evals-hero','conare-evals-directory','conare-evals-price','conare-evals-losses','conare-evals-method','conare-evals-closing','conare-evals-footer']});

pageShells.push({id:'unifize-page',systemId:'unifize',name:'Decision platform landing page',type:'Landing page',description:'A governed-work platform with decision diagrams, product walkthroughs, industry routes, customer stories and a closing invitation.',sectionIds:['unifize-header','unifize-hero','unifize-customers','unifize-decision','unifize-how','unifize-fit','unifize-products','unifize-industries','unifize-stories','unifize-resources','unifize-closing','unifize-footer']});
