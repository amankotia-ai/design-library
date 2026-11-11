import {withBase} from './base.js';

export const unifizeSystem={
 id:'unifize',languageId:'decision-rails',name:'Decision Rails',family:'Quality & operations software',mode:'reference',
 description:'A disciplined enterprise system with charcoal and paper surfaces, fine structural rails, blue actions, and detailed workflow scenes. Designed for products that make complex decisions traceable.',
 signature:'Fine rails. Clear decisions. Product evidence.',typeLabel:'IBM Plex Sans + Inter + JetBrains Mono',
 swatches:[['Paper','#ffffff'],['Ink','#17191f'],['Charcoal','#1f2126'],['Rule','#e4e7eb'],['Blue','#005bb7'],['Sky','#70aeff']],
 specimen:['Every decision','made right.'],
 typography:'IBM Plex Sans headings · Inter body and interface · JetBrains Mono utility labels · retained public font assets',
 rules:[
  ['Frame','Continuous outer rails; desktop split hero; shared alignment across full-width sections'],
  ['Type','Compact sans-serif headings, readable body copy, and small monospace record metadata'],
  ['Color','Charcoal opens and closes the story; pale surfaces support explanation; blue marks actions and emphasis'],
  ['Product evidence','Readable owners, dates, records and approval states inside framed software scenes']
 ],
 preview:{image:withBase('/previews/unifize/hero.png'),alt:'Unifize split hero with a charcoal headline panel and blue field containing decision and exception cards.',caption:'Unifize landing page hero'},
 insight:{
  thesis:'Make a complex decision feel visible, owned and manageable.',
  logic:'Thin rails carry alignment through changing surfaces. Short headlines state the outcome, while recognizable records, owners and approval states explain the mechanism. Dark introduction and proof sections frame a lighter sequence of product explanations.',
  bestFor:'Enterprise workflow, quality management, operations, compliance and platforms whose value depends on coordination across teams.',
  tradeoff:'Simple consumer propositions or image-led brands with little process detail. Dense product scenes need concrete content and a clear reading order.',
  principles:[
   ['Keep the rails continuous.','Align section edges, dividers and content columns so the page reads as one connected system.'],
   ['Show decisions as records.','Use owners, timestamps, status labels and evidence to give abstract workflow claims a visible form.'],
   ['Let contrast set the pace.','Alternate charcoal narrative and proof sections with light explanation panels; reserve blue for action, progress and selected emphasis.']
  ],
  extension:'Preserve the rail alignment, restrained typography, blue action language and realistic record details. Choose a split explanation, structured list or product frame to suit the content. Treat new content and unseen interaction states as authored additions and document them separately.',
  evidence:'The live Unifize homepage was captured at 1440 × 1000 and 390 × 844 on 10 November 2026. Source markup, styles, public fonts and assets were retained. Product scenes are retained as captured states; public service and account actions remain on Unifize. Late source sections include reveal and lazy-loading states, so static output exposes their available content. No backend or pixel-identical animation is claimed.',
  relationship:'An independent enterprise visual language in the library. Unifize owns the source identity, copy and media. This entry records their public site as a local design reference.'
 }
};

export const unifizeSections=[
 ['header','Navigation','Navigation','Brand + disclosure navigation + actions'],
 ['hero','Decision hero','Introduction','Split statement + exception illustration'],
 ['customers','Customer logos','Social proof','Dark customer mark rail'],
 ['decision','Decision record','Features','Fragmented work + governed record comparison'],
 ['how','How it works','Features','Three numbered explanation and product rows'],
 ['fit','Starting points','Applications','Three solution, product and industry paths'],
 ['products','Product platform','Features','Large software scene + four product links'],
 ['industries','Industries','Applications','Category selector + regulated industry cards'],
 ['stories','Customer stories','Testimonials','Horizontal video story reel'],
 ['resources','Resources','Editorial','Three evidence and reading cards'],
 ['closing','Walkthrough invitation','Call to action','Centered mark + invitation + action'],
 ['footer','Footer','Navigation','Product, resource, solution and industry link groups'],
 ['page','Quality operations landing page','Landing page','Complete enterprise product narrative']
].map(([id,name,category,layout])=>({id:`unifize-${id}`,systemId:'unifize',name,category,layout,mode:'Source reconstruction with recorded adaptations'}));

export const unifizeReference={
 id:'unifize',systemId:'unifize',name:'Decisions, with the record attached',author:'Unifize',url:'https://www.unifize.com/',
 caption:'Live public homepage captured on 10 November 2026',image:withBase('/references/unifize/viewport.png'),
 dimensions:'1440 × 1000 desktop / 390 × 844 mobile',role:'Landing page and section reference',
 note:'Live browser capture takes precedence over differing indexed page text. Original public markup, CSS, fonts and available media are retained; dynamic product scenes, delayed reveals and lazy media are recorded as capture limitations.'
};

// The implementation owner adds only screenshot pairs verified at matching dimensions.
export const unifizeComparisons=Object.fromEntries(Object.entries({"unifize-header": {"width": 1440, "height": 72, "source": "/references/unifize/header.png", "implementation": "/previews/unifize/header.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-hero": {"width": 1440, "height": 980, "source": "/references/unifize/hero.png", "implementation": "/previews/unifize/hero.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-customers": {"width": 1440, "height": 232, "source": "/references/unifize/customers.png", "implementation": "/previews/unifize/customers.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-decision": {"width": 1440, "height": 1841, "source": "/references/unifize/decision.png", "implementation": "/previews/unifize/decision.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-how": {"width": 1440, "height": 1845, "source": "/references/unifize/how.png", "implementation": "/previews/unifize/how.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-fit": {"width": 1440, "height": 778, "source": "/references/unifize/fit.png", "implementation": "/previews/unifize/fit.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-products": {"width": 1440, "height": 1263, "source": "/references/unifize/products.png", "implementation": "/previews/unifize/products.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-industries": {"width": 1440, "height": 1050, "source": "/references/unifize/industries.png", "implementation": "/previews/unifize/industries.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-stories": {"width": 1440, "height": 794, "source": "/references/unifize/stories.png", "implementation": "/previews/unifize/stories.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-resources": {"width": 1440, "height": 796, "source": "/references/unifize/resources.png", "implementation": "/previews/unifize/resources.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-closing": {"width": 1440, "height": 637, "source": "/references/unifize/closing.png", "implementation": "/previews/unifize/closing.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}, "unifize-footer": {"width": 1440, "height": 1006, "source": "/references/unifize/footer.png", "implementation": "/previews/unifize/footer.png", "author": "Unifize", "note": "Source fonts and geometry; static video frames and native disclosure adaptations"}}).map(([id,pair])=>[id,{...pair,source:withBase(pair.source),implementation:withBase(pair.implementation)}]));
