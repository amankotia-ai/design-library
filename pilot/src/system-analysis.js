import {withBase} from './base.js';
// Signal Grid's system-level analysis. Source measurements and limitations are
// recorded in docs/runs/2026-10-31-system-tabs-signal-grid.md.
export const systemAnalysis={
 conare:{
  palette:[
   {name:'Paper',value:'#fefefe',role:'The open background around the page narrative.'},
   {name:'Ink',value:'#020202',role:'Primary text and high-contrast controls.'},
   {name:'Muted',value:'#6c6a68',role:'Supporting copy and secondary information.'},
   {name:'Rule',value:'#dedddc',role:'The fine structure around grids and surfaces.'},
   {name:'Red',value:'#ea3325',role:'Labels, active states and moments of emphasis.'}
  ],
  foundations:[
   ['Frame','The captured homepage uses a 1440px maximum frame, with 40px side gutters at 1280px and 16px at 390px.'],
   ['Spacing','A 4px spacing unit underpins the source styles. Major sections use generous, varied padding; the integrations section has 96px below it in both captures.'],
   ['Responsive layout','The integrations grid changes from seven columns at 1280px to two at 390px. Other sections recompose for their content rather than sharing one grid.'],
   ['Type','Faculty Glyphic carries headings; Geist carries the homepage’s body and interface. The evaluations page also uses Inter. Heading sizes respond to viewport width and, in the hero, height.']
  ],
  patterns:[
   {title:'Lead with the promise',body:'A short statement and small category label establish the idea before a large product scene shows the work behind it.',image:withBase('/references/conare/home-deep-hero.png'),alt:'Conare homepage with a centered heading above the product demonstration.',caption:'Homepage introduction'},
   {title:'Make the system visible',body:'Fine rectangular rules organize connected tools and workflow steps. Dark, framed software windows give the abstract process a concrete form.',image:withBase('/references/conare/reference-workflow.png'),alt:'Conare workflow with ruled steps surrounding a dark product window.',caption:'Retrieval workflow'},
   {title:'Use contrast to direct attention',body:'Open light surfaces make room for dense technical imagery. Dark panels carry product detail, while red identifies labels, selected states and key moments.',image:withBase('/references/conare/reference-products.png'),alt:'Conare product section with light surroundings and dark, gridded product panels.',caption:'Product capabilities'},
   {title:'Recompose for smaller screens',body:'The page keeps the same visual hierarchy while grids and product scenes reorganize for narrow widths. The observed integrations grid moves from seven columns to two.',image:withBase('/references/conare/reference-integrations-mobile.png'),alt:'Conare’s integrations heading and two-column grid on mobile.',caption:'Integrations on mobile',portrait:true}
  ],
  references:[
   {name:'Conare homepage',url:'https://conare.ai/',capture:withBase('/references/conare/home-deep-hero.png')},
   {name:'Conare evaluations',url:'https://conare.ai/evals',capture:withBase('/references/conare-evals/desktop-hero.png')}
  ]
 }
};

systemAnalysis.unifize={
 palette:[{name:'Paper',value:'#ffffff',role:'Light explanation surfaces.'},{name:'Ink',value:'#17191f',role:'Text on light surfaces.'},{name:'Charcoal',value:'#1f2126',role:'Hero, proof and closing backgrounds.'},{name:'Rule',value:'#e4e7eb',role:'Thin rails and boundaries on light surfaces.'},{name:'Blue',value:'#005bb7',role:'Primary actions and product emphasis.'},{name:'Sky',value:'#70aeff',role:'Highlighted words against charcoal.'}],
 foundations:[['Frame','At 1440px, outer rails sit at x48 and x1392. The hero splits at x720; content starts near x91.'],['Spacing','Source styles use a 4px scale with 20–48px responsive content padding and larger section intervals.'],['Typography','IBM Plex Sans headings, Inter body, and JetBrains Mono utility labels. All are retained source fonts.'],['Responsive layout','At 390px the hero stacks copy above the illustration. Multi-column explanations and industry cards reflow; navigation uses native disclosures.']],
 patterns:[{title:'Make the exception visible',body:'A quiet statement sits beside a vivid field of owners, decisions and the single item needing attention.',image:withBase('/previews/unifize/hero.png'),alt:'Dark split hero and blue decision illustration.',caption:'Decision hero'},{title:'Explain the record',body:'Contrast scattered work with a governed record, then show rules, ownership and evidence in numbered rows.',image:withBase('/previews/unifize/how.png'),alt:'Three numbered workflow explanation rows.',caption:'How it works'},{title:'Offer a relevant starting point',body:'Parallel routes by solution, product and industry let different evaluators find the same platform.',image:withBase('/previews/unifize/fit.png'),alt:'Solution, product and industry starting points.',caption:'Starting points'}],
 references:[{name:'Unifize homepage',url:'https://www.unifize.com/',capture:withBase('/references/unifize/viewport.png')}]
};
