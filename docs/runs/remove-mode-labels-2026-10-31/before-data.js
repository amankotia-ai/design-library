export const systems = [{id:'editorial-01',name:'Quiet Direction',family:'Editorial',description:'An editorial system with slender serif headlines, generous spacing, precise grids, and photography that carries the color. Designed for portfolios and creative studios.'}];
systems[0].swatches=[['Paper','#f8f8fa'],['Ink','#202020'],['Rule','#dedee0']];
systems[0].specimen=['Strong form.','Quiet direction.'];
systems[0].typography='Noto Serif Display · extra-condensed · 200 / General Sans · 400, 500';
systems[0].rules=[['Grid','12 columns desktop · 4 columns mobile'],['Rhythm','8px base · 24px gaps · 28px desktop edge'],['Image','Continuous planes, deliberate crops, color from photography'],['Branch rule','A new branch needs a meaningful layout or visual difference']];
export const system = systems[0];
export const heroContent={name:'Luca Rossi',title:['Strong Form,','Quiet Direction'],description:'Work shaped by light, body language, and the space between gesture and pose, focusing on quiet movement, and natural presence.',year:'2026',image:'/assets/campaign.webp',portrait:'/assets/portrait.webp',imageAlt:'Fragrance campaign study: bottle against a sunlit figure, with blue sea behind.',portraitAlt:'Campaign portrait holding a fragrance bottle beside the face.'};
export const featureContent={eyebrow:'01 / The practice',title:'An eye for the\nspace between.',body:'A study in observation. How a gesture, a texture, or a change in light can give an image its character.',details:[['Observe','Start with what is already there. Light, material, movement.'],['Compose','Give each element room. Keep the frame deliberate.'],['Refine','Remove what competes. Let the image do the work.']],image:'/assets/practice.webp',imageAlt:'Black-and-white portrait study showing braided hair and the back of a dark shirt.'};
export const references=[{id:'21',name:'The split, before and after',author:'Bernardo Lickfold',handle:'berlickfold',url:'https://x.com/berlickfold/status/2021190651505680513',caption:'grid vs final result',image:'/references/21-final.jpg',grid:'/references/21-grid.jpg',dimensions:'2350 × 2700',role:'Hero reproduction',note:'Source section: 2030 × 1128. Exact photo crops; substitute fonts.'},{id:'17',name:'A portrait and a pull quote',author:'Bernardo Lickfold',handle:'berlickfold',url:'https://x.com/berlickfold/status/2028922909201195269',caption:'Testimonial card',image:'/references/17-testimonial.jpg',dimensions:'3044 × 1760',role:'Quote reproduction + system evidence',note:'Source-sized quote study: 1943 × 724. Source wording is shown only as attributed design-study content; fonts are substitutes.'}];
export const sections=[{id:'page',systemId:'editorial-01',name:'Assembled page',category:'Portfolio shell',layout:'Split + offset + statement + open',mode:'Reproduction + original extensions'},{id:'hero',systemId:'editorial-01',name:'Hero',category:'Introduction',layout:'Split / image-led',mode:'Faithful reproduction study'},{id:'feature',systemId:'editorial-01',name:'Feature',category:'Practice / capabilities',layout:'Offset image + text rail',mode:'Original system expansion'},{id:'quote',systemId:'editorial-01',name:'Quote',category:'Statement / testimonial',layout:'Portrait + inset quote / text-only statement',mode:'Source study + original studio note'},{id:'footer',systemId:'editorial-01',name:'Footer',category:'Contact / navigation',layout:'Open typographic close',mode:'Original system expansion'}];

export const quoteContent={quote:'A good frame gives every gesture room to be seen.',attribution:'On composition',context:'Studio note · illustrative copy',disclosure:'An original statement for this sample portfolio.',image:'/assets/practice.webp',imageAlt:'Black-and-white reference portrait showing braided hair and the back of a dark shirt.',sourceId:'17'};
export const quoteReferenceContent={quote:'“The final film and image series not only elevated our campaign, it redefined how our audience perceives us.”',lines:['“The final film and image','series not only elevated our','campaign, it redefined how','our audience perceives us.”'],attribution:'DANIEL MOREAU - CREATIVE LEAD',context:'AETHER APPAREL CO.',image:'/assets/quote-portrait.png',imageAlt:'Black-and-white portrait crop from the testimonial design reference; subject identity unverified.',sourceId:'17'};
export const comparisons={hero:{width:2030,height:1128,source:'/references/hero-source.png',implementation:'/evidence/hero-faithful.png',author:'Bernardo Lickfold'},quote:{width:1943,height:724,source:'/references/quote-source.png',implementation:'/evidence/quote-faithful.png',author:'Bernardo Lickfold'}};

references.push({id:'blueprint',name:'A bold opening, a quiet workshop',author:'Blueprint',url:'https://blueprint.page/',caption:'Public landing page captured with REA on 30 October 2026',image:'/references/blueprint/desktop.png',dimensions:'1440 × 857',role:'Blueprint source study',note:'Hero comparison is cropped at y594. Geist is declared by the source; Inter and the wordmark are disclosed approximations. The original generator and unseen application behavior are not recovered.'});
// Faithful Blueprint source collection.
systems.push({id:'blueprint-source',name:'Blueprint Study',family:'Faithful source / Creative tools',description:'The complete Blueprint landing page, reconstructed section by section with source Geist fonts, exact media, vivid blue grid surfaces, product demos, and the original responsive layouts.',swatches:[['Blueprint','#104bff'],['Paper','#f7f7f8'],['Ink','#18181b']],specimen:['Design tools','you describe.'],typography:'Geist · 400, 500 / Geist Mono · source font files',rules:[['Grid','1200px wrap · 24px inner padding · 32px blue grid'],['Rhythm','128px desktop section padding · 256px major gap'],['Shape','28px blue surfaces · framed editor · source feature mosaic'],['Mode','Faithful public landing-page study. Document new extensions separately from recovered source behavior.']]});
sections.push(...[
 ['blueprint-page','Assembled page','Creative tool landing page','Full source sequence'],
 ['blueprint-header','Navigation','Primary navigation','Brand + links + actions'],
 ['blueprint-hero','Hero','Introduction','Centered grid + paired actions'],
 ['blueprint-editor','Editor demo','Interactive product demo','Chat + canvas + parameter rail'],
 ['blueprint-examples','Examples','Tool gallery','Horizontal carousel'],
 ['blueprint-compare','Comparison','Product differentiation','Prompt + paired video comparison'],
 ['blueprint-features','Features','Capabilities','Seven-card illustrated mosaic'],
 ['blueprint-pricing','Pricing','Plans + comparison','Three plans + free tier + table'],
 ['blueprint-faq','FAQ','Questions','Split heading + 16 disclosures'],
 ['blueprint-prompt','Closing prompt','Call to action','Animated halftone + prompt form'],
 ['blueprint-footer','Footer','Navigation + provenance','Brand + three link groups']
].map(([id,name,category,layout])=>({id,name,category,layout,systemId:'blueprint-source',mode:'Faithful source reconstruction'})));
references.find(r=>r.id==='blueprint').note='Complete landing-page study: navigation, hero, editor, examples, comparison, seven features, pricing, sixteen FAQs, animated closing prompt, and footer. Source Geist, logo and public media retained; measured fidelity and service boundaries are recorded separately.';

// Aligned source-sized captures from the complete assembled source study.
Object.assign(comparisons,{
  "blueprint-header": {
    "width": 1440,
    "height": 60,
    "source": "/references/blueprint-full/header.png",
    "implementation": "/evidence/blueprint-full/header.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-hero": {
    "width": 1440,
    "height": 595,
    "source": "/references/blueprint-full/hero.png",
    "implementation": "/evidence/blueprint-full/hero.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-editor": {
    "width": 1440,
    "height": 754,
    "source": "/references/blueprint-full/editor.png",
    "implementation": "/evidence/blueprint-full/editor.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-examples": {
    "width": 1440,
    "height": 958,
    "source": "/references/blueprint-full/examples.png",
    "implementation": "/evidence/blueprint-full/examples.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-compare": {
    "width": 1440,
    "height": 975,
    "source": "/references/blueprint-full/compare.png",
    "implementation": "/evidence/blueprint-full/compare.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-features": {
    "width": 1440,
    "height": 1709,
    "source": "/references/blueprint-full/features.png",
    "implementation": "/evidence/blueprint-full/features.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-pricing": {
    "width": 1440,
    "height": 1342,
    "source": "/references/blueprint-full/pricing.png",
    "implementation": "/evidence/blueprint-full/pricing.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-faq": {
    "width": 1440,
    "height": 1241,
    "source": "/references/blueprint-full/faq.png",
    "implementation": "/evidence/blueprint-full/faq.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-prompt": {
    "width": 1440,
    "height": 619,
    "source": "/references/blueprint-full/prompt.png",
    "implementation": "/evidence/blueprint-full/prompt.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-footer": {
    "width": 1440,
    "height": 351,
    "source": "/references/blueprint-full/footer.png",
    "implementation": "/evidence/blueprint-full/footer.png",
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-page": {
    "width": 1440,
    "height": 8534,
    "source": "/references/blueprint-full/source-desktop.jpg",
    "implementation": "/evidence/blueprint-full/page.jpg",
    "author": "Blueprint",
    "note": "Matched1440\u00d7900 viewport; dynamic frames vary"
  }
});

// Display names describe visual language. Stable IDs preserve existing section links.
// Family (use), mode (origin), and section function/layout are independent metadata.
Object.assign(systems[0], {
 name:'Quiet Serif', languageId:'quiet-serif', aliases:['Quiet Direction'], family:'Editorial / Portfolio', mode:'Source + expansion',
 signature:'Slender serif. Open space. Photography first.', typeLabel:'Noto Serif Display + General Sans',
 preview:{image:'/previews/quiet-serif.png',alt:'Quiet Serif hero with a slender serif headline, open paper space, and split campaign photography.',caption:'Rendered hero adaptation · source geometry, substitute fonts'},
 insight:{
  thesis:'Let the image carry the color. Let the type set the pace.',
  logic:'The split hero balances a light typographic plane against a dense photographic plane. Its impact comes from the difference in scale and density, rather than extra decoration.',
  bestFor:'Photographer portfolios, creative studios, and image-led practices with a small, carefully edited body of work.',
  tradeoff:'Dense product catalogs or information-heavy tools. The fine headline and large open areas depend on short copy and strong photography.',
  principles:[
   ['Contrast the weight, not the palette.','A fine, condensed serif sits beside substantial image blocks. Neutral paper and ink let skin, light, and setting provide the color.'],
   ['Keep the composition asymmetric.','Offset text rails and deliberate image splits create the hierarchy. Repeating centered cards would lose the spatial character seen in the hero.'],
   ['Use whitespace as a pause.','The hero leaves large areas unfilled. The text-only studio note extends that pause between photographic sections.']
  ],
  extension:'Keep the serif/sans pairing, neutral surfaces, thin rules, and deliberate crops. Change the section’s structure for its purpose: offset feature, portrait quote, or open typographic footer. Avoid adding color panels or dense card grids without a new reason.',
  evidence:'The hero and portrait quote are measured studies of Bernardo Lickfold’s references. Photos are cropped from supplied rasters; original image files are unavailable. Noto Serif Display and General Sans are substitutes, not identified source fonts. Feature, studio note, footer, and mobile behavior are original adaptations.',
  relationship:'Previously Quiet Direction. This is the library’s editorial language; it is visually independent of Blueprint.'
 }
});
Object.assign(systems[1], {
 name:'Blueprint', languageId:'blueprint', aliases:['Blueprint Study'], family:'Creative tools', mode:'Source study',
 signature:'Source Geist. Blue grid. Product-led mosaics.', typeLabel:'Geist + Geist Mono',
 preview:{image:'/evidence/blueprint-full/editor.png',alt:'Blueprint reconstructed editor with conversation, black and yellow generated artwork, and parameter controls.',caption:'Captured reconstruction · source editor section'},
 insight:{
  thesis:'Build the story around the tool, from promise to proof.',
  logic:'The source moves from a centered blue opening into an editor, examples, comparison, feature mosaic, pricing, and questions. Different layouts keep the same rounded surfaces, type family, and grid rhythm.',
  bestFor:'Studying how a creative tool’s complete landing page connects its hero, product evidence, plans, and closing prompt.',
  tradeoff:'Treating this as a ready-to-rebrand original kit. Source identity, copy, pricing, and media belong to Blueprint. New reusable sections need their own original content and documented design decisions.',
  principles:[
   ['Keep the source’s type contrast.','Geist carries headlines and interface text; Geist Mono marks technical details. The recovered source font files are retained locally.'],
   ['Alternate promise and product evidence.','The source changes from the blue hero to a pale editor, tool gallery, and paired comparisons before the feature and pricing sections. The sequence is part of the study.'],
   ['Vary layouts within a consistent frame.','The feature mosaic, plan cards, table, and disclosures share the source’s rounded surfaces and broad spacing. Uniform cards would flatten their different jobs.']
  ],
  extension:'In source-study mode, preserve the observed section sequence, source media, responsive evidence, and font files. Record any approximation. New copy, new sections, and new tool behaviors belong to the original expansion rather than being presented as recovered source behavior.',
  evidence:'The complete public landing-page reconstruction retains source fonts, logos, media, and recovered demo programs. Aligned desktop comparison captures exist for ten sections and the assembled page. Animated frames can differ with time. The original account, billing, AI backend, and application behavior are not recovered; service actions lead to Blueprint.',
  relationship:'Previously Blueprint Study. This is the library’s blue creative-tool design system. Attribution and publication limits remain recorded with the original references.'
 }
});

export const visualLanguageCount = new Set(systems.map(system => system.languageId)).size;

// Learning transfer from Render Assets / “Review Berlickfold X posts”.
// These are authored adaptation rules, not recovered source CSS.
Object.assign(systems[0],{
 typography:'Noto Serif Display · native extra-condensed 62.5% · 200 / General Sans Light · 300 body, 400 utility',
 rules:[['Grid','Desktop: portrait 2 + copy 2 + empty 2 tracks; mobile: 4 columns'],['Rhythm','4px spatial unit · 16px rows · 16px gutters; coordinates drive content and guides'],['Type','Independent type scale · compact 300-weight body · readable 16/22 mobile copy'],['Image','Stable frames with object-fit: cover; no stretched pixels'],['Mode','Source reconstruction stays measured; original adaptation uses the declared grid']],
 preview:{...systems[0].preview,caption:'Rendered original adaptation · calculated grid, free serif alternative'}
});
systems[0].insight.principles=[
 ['Give the copy its own measure.','The desktop information plane has six tracks: two for the portrait, two for compact copy, and two left empty before the dominant photograph. Text does not inherit the whole region’s width.'],
 ['Let the grid place the content.','A 4px spatial unit and 16px rows set the original adaptation’s coordinates. The Grid control reveals those same coordinates. Type size is chosen separately from spacing.'],
 ['Recompose instead of shrinking.','On mobile, a four-column layout places a small portrait beside a dominant photograph, then gives the paragraph a readable 16/22 setting. The mobile sequence is an authored adaptation.']
];
systems[0].insight.extension='Preserve shared edges, the narrow text measure, empty tracks, and natural photographic crops. Fit type deliberately: General Sans Light for supporting prose, regular utility text, and Noto Serif Display 200 at its native condensed width. Build a new section around its reading sequence; keep columns and row coordinates declared rather than adding guides after the layout.';
systems[0].insight.evidence='Hero and portrait-quote source studies retain measured geometry. The original hero adaptation transfers the grid-study lessons: narrow copy, a reserved empty rail, separate type and spatial scales, cropped images, and four-column mobile recomposition. General Sans Light is a close visual identification from the earlier specimen comparison; PP Editorial New Thin is the inferred source serif, with no licensed file available. Noto Serif Display is the chosen free alternative, not an exact identification. Original hero and quote photographs remain crops from supplied rasters. The additional layout examples reuse generated portrait, linen, and landscape assets from the earlier grid study.';

sections.find(section=>section.id==='hero').mode='Source study + original adaptation';
sections.find(section=>section.id==='page').mode='Original system expansion';

// Original sections extending inspected Berlickfold page patterns.
featureContent.eyebrow='03 / The practice';
sections.splice(sections.findIndex(section=>section.id==='hero')+1,0,...[
 ['image-index','Selected image index','Work / catalogue','Four columns desktop / two columns mobile'],
 ['project-detail','Project detail','Project / case study','Narrow information rail + 5/4 image pair'],
 ['split-material','Split material feature','Material / editorial feature','Shared horizontal hinge + inset image'],
 ['image-rail','Image + numbered index','Work / interactive index','Image rail + independent numbered list']
].map(([id,name,category,layout])=>({id,name,category,layout,systemId:'editorial-01',mode:'Original system expansion'})));
for(const reference of [
 {id:'grid-07',name:'Catalogue and project panel',image:'/references/editorial/image-index.webp',url:'https://x.com/berlickfold/status/2055682704847327527',note:'Paired mobile catalogue images inform the original image index. Demo imagery and portfolio content are new; this is not a source reconstruction.'},
 {id:'grid-16',name:'An information rail and paired photographs',image:'/references/editorial/project-pair.webp',url:'https://x.com/berlickfold/status/2033943094652019066',note:'The source uses a narrow information rail beside a 5/4 image pair. The new coastal project transfers those spans using original generated demo imagery.'},
 {id:'grid-23',name:'A shared horizontal hinge',image:'/references/editorial/horizontal-hinge.webp',url:'https://x.com/berlickfold/status/2019020426375266668',note:'Headline, inset image, and dominant image share a starting line. The material section transfers this geometry into Quiet Serif with original content.'},
 {id:'grid-29',name:'Images beside an index',image:'/references/editorial/image-rail.webp',url:'https://x.com/berlickfold/status/1921501628307222909',note:'The source shows a mobile image rail beside a numbered list. Selection behavior, desktop arrangement, generated images and copy are authored extensions.'}
])references.push({...reference,author:'Bernardo Lickfold',caption:'Retained reference from the prior grid study',dimensions:'Full original composition retained',role:'Original section expansion evidence'});

systems[0].rules[0]=['Grid','12-column section grid; hero has 6 information tracks; mobile recomposes to 4 columns or paired image rails'];
