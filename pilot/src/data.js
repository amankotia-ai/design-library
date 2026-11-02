import {conareSystem,conareSections,conareReference,evalSections,evalReference} from './conare-data.js';
import {mnhSystem,mnhSections,mnhReference} from './mnh-data.js';
import {plasticitySystem,plasticitySections,plasticityReference} from './plasticity-data.js';
import {steelSystem,steelSections,steelReference} from './steel-data.js';
import {withBase} from './base.js';
export const systems = [{id:'editorial-01',name:'Quiet Direction',family:'Editorial',description:'An editorial system with slender serif headlines, generous spacing, precise grids, and photography that carries the color. Designed for portfolios and creative studios.'}];
systems[0].swatches=[['Paper','#f8f8fa'],['Ink','#202020'],['Rule','#dedee0']];
systems[0].specimen=['Strong form.','Quiet direction.'];
systems[0].typography='Noto Serif Display · extra-condensed · 200 / General Sans · 400, 500';
systems[0].rules=[['Grid','12 columns desktop · 4 columns mobile'],['Rhythm','8px base · 24px gaps · 28px desktop edge'],['Image','Continuous planes, deliberate crops, color from photography'],['Branch rule','A new branch needs a meaningful layout or visual difference']];
export const system = systems[0];
export const heroContent={name:'Luca Rossi',title:['Strong Form,','Quiet Direction'],description:'Work shaped by light, body language, and the space between gesture and pose, focusing on quiet movement, and natural presence.',year:'2026',image:withBase('/assets/campaign.webp'),portrait:withBase('/assets/portrait.webp'),imageAlt:'Fragrance campaign study: bottle against a sunlit figure, with blue sea behind.',portraitAlt:'Campaign portrait holding a fragrance bottle beside the face.'};
export const featureContent={eyebrow:'01 / The practice',title:'An eye for the\nspace between.',body:'A study in observation. How a gesture, a texture, or a change in light can give an image its character.',details:[['Observe','Start with what is already there. Light, material, movement.'],['Compose','Give each element room. Keep the frame deliberate.'],['Refine','Remove what competes. Let the image do the work.']],image:withBase('/assets/practice.webp'),imageAlt:'Black-and-white portrait study showing braided hair and the back of a dark shirt.'};
export const references=[{id:'21',name:'The split, before and after',author:'Bernardo Lickfold',handle:'berlickfold',url:'https://x.com/berlickfold/status/2021190651505680513',caption:'grid vs final result',image:withBase('/references/21-final.jpg'),grid:withBase('/references/21-grid.jpg'),dimensions:'2350 × 2700',role:'Hero reproduction',note:'Source section: 2030 × 1128. Exact photo crops; substitute fonts.'},{id:'17',name:'A portrait and a pull quote',author:'Bernardo Lickfold',handle:'berlickfold',url:'https://x.com/berlickfold/status/2028922909201195269',caption:'Testimonial card',image:withBase('/references/17-testimonial.jpg'),dimensions:'3044 × 1760',role:'Quote reproduction + system evidence',note:'Source-sized quote study: 1943 × 724. Source wording is shown only as attributed design-study content; fonts are substitutes.'}];
export const sections=[{id:'page',systemId:'editorial-01',name:'Assembled page',category:'Portfolio shell',layout:'Split + offset + statement + open',mode:'Reproduction + original extensions'},{id:'hero',systemId:'editorial-01',name:'Hero',category:'Introduction',layout:'Split / image-led',mode:'Faithful reproduction study'},{id:'feature',systemId:'editorial-01',name:'Feature',category:'Practice / capabilities',layout:'Offset image + text rail',mode:'Original system expansion'},{id:'quote',systemId:'editorial-01',name:'Quote',category:'Statement / testimonial',layout:'Portrait + inset quote / text-only statement',mode:'reference reconstruction + original studio note'},{id:'footer',systemId:'editorial-01',name:'Footer',category:'Contact / navigation',layout:'Open typographic close',mode:'Original system expansion'}];

export const quoteContent={quote:'A good frame gives every gesture room to be seen.',attribution:'On composition',context:'Studio note · illustrative copy',disclosure:'An original statement for this sample portfolio.',image:withBase('/assets/practice.webp'),imageAlt:'Black-and-white reference portrait showing braided hair and the back of a dark shirt.',sourceId:'17'};
export const quoteReferenceContent={quote:'“The final film and image series not only elevated our campaign, it redefined how our audience perceives us.”',lines:['“The final film and image','series not only elevated our','campaign, it redefined how','our audience perceives us.”'],attribution:'DANIEL MOREAU - CREATIVE LEAD',context:'AETHER APPAREL CO.',image:withBase('/assets/quote-portrait.png'),imageAlt:'Black-and-white portrait crop from the testimonial design reference; subject identity unverified.',sourceId:'17'};
export const comparisons={hero:{width:2030,height:1128,source:withBase('/references/hero-source.png'),implementation:withBase('/evidence/hero-faithful.png'),author:'Bernardo Lickfold'},quote:{width:1943,height:724,source:withBase('/references/quote-source.png'),implementation:withBase('/evidence/quote-faithful.png'),author:'Bernardo Lickfold'}};

references.push({id:'blueprint',name:'A bold opening, a quiet workshop',author:'Blueprint',url:'https://blueprint.page/',caption:'Public landing page captured with REA on 30 October 2026',image:withBase('/references/blueprint/desktop.png'),dimensions:'1440 × 857',role:'Blueprint reference reconstruction',note:'Hero comparison is cropped at y594. Geist is declared by the source; Inter and the wordmark are disclosed approximations. The original generator and unseen application behavior are not recovered.'});
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

// Aligned source-sized captures from the complete assembled reference reconstruction.
Object.assign(comparisons,{
  "blueprint-header": {
    "width": 1440,
    "height": 60,
    "source": withBase("/references/blueprint-full/header.png"),
    "implementation": withBase("/evidence/blueprint-full/header.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-hero": {
    "width": 1440,
    "height": 595,
    "source": withBase("/references/blueprint-full/hero.png"),
    "implementation": withBase("/evidence/blueprint-full/hero.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-editor": {
    "width": 1440,
    "height": 754,
    "source": withBase("/references/blueprint-full/editor.png"),
    "implementation": withBase("/evidence/blueprint-full/editor.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-examples": {
    "width": 1440,
    "height": 958,
    "source": withBase("/references/blueprint-full/examples.png"),
    "implementation": withBase("/evidence/blueprint-full/examples.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-compare": {
    "width": 1440,
    "height": 975,
    "source": withBase("/references/blueprint-full/compare.png"),
    "implementation": withBase("/evidence/blueprint-full/compare.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-features": {
    "width": 1440,
    "height": 1709,
    "source": withBase("/references/blueprint-full/features.png"),
    "implementation": withBase("/evidence/blueprint-full/features.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-pricing": {
    "width": 1440,
    "height": 1342,
    "source": withBase("/references/blueprint-full/pricing.png"),
    "implementation": withBase("/evidence/blueprint-full/pricing.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-faq": {
    "width": 1440,
    "height": 1241,
    "source": withBase("/references/blueprint-full/faq.png"),
    "implementation": withBase("/evidence/blueprint-full/faq.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-prompt": {
    "width": 1440,
    "height": 619,
    "source": withBase("/references/blueprint-full/prompt.png"),
    "implementation": withBase("/evidence/blueprint-full/prompt.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-footer": {
    "width": 1440,
    "height": 351,
    "source": withBase("/references/blueprint-full/footer.png"),
    "implementation": withBase("/evidence/blueprint-full/footer.png"),
    "author": "Blueprint",
    "note": "Assembled-page context; dynamic frames vary"
  },
  "blueprint-page": {
    "width": 1440,
    "height": 8534,
    "source": withBase("/references/blueprint-full/source-desktop.jpg"),
    "implementation": withBase("/evidence/blueprint-full/page.jpg"),
    "author": "Blueprint",
    "note": "Matched1440\u00d7900 viewport; dynamic frames vary"
  }
});

// Display names describe visual language. Stable IDs preserve existing section links.
// Family (use), mode (origin), and section function/layout are independent metadata.
Object.assign(systems[0], {
 name:'Quiet Serif', languageId:'quiet-serif', aliases:['Quiet Direction'], family:'Editorial / Portfolio', mode:'Source + expansion',
 signature:'Slender serif. Open space. Photography first.', typeLabel:'Noto Serif Display + General Sans',
 preview:{image:withBase('/previews/quiet-serif.png'),alt:'Quiet Serif hero with a slender serif headline, open paper space, and split campaign photography.',caption:'Rendered hero adaptation · source geometry, substitute fonts'},
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
 name:'Blueprint', languageId:'blueprint', aliases:['Blueprint Study'], family:'Creative tools', mode:'reference',
 signature:'Source Geist. Blue grid. Product-led mosaics.', typeLabel:'Geist + Geist Mono',
 preview:{image:withBase('/evidence/blueprint-full/editor.png'),alt:'Blueprint reconstructed editor with conversation, black and yellow generated artwork, and parameter controls.',caption:'Captured reconstruction · source editor section'},
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
  extension:'When reconstructing a reference, preserve the observed section sequence, source media, responsive evidence, and font files. Record any approximation. New copy, new sections, and new tool behaviors are new work rather than being presented as recovered source behavior.',
  evidence:'The complete public landing-page reconstruction retains source fonts, logos, media, and recovered demo programs. Aligned desktop comparison captures exist for ten sections and the assembled page. Animated frames can differ with time. The original account, billing, AI backend, and application behavior are not recovered; service actions lead to Blueprint.',
  relationship:'Previously Blueprint Study. This is the library’s blue creative-tool design system. Attribution and publication limits remain recorded with the original references.'
 }
});


systems.push({id:'salesloft',languageId:'salesloft',name:'Signal Serif',family:'Revenue software',mode:'Reference reconstruction',description:'Editorial serif headlines, deep green actions and bright lime accents bring a confident, product-led sales story to life.',signature:'Editorial serif. Deep green. Product evidence.',typeLabel:'Noto Serif Display + General Sans',swatches:[['Paper','#ffffff'],['Ink','#242424'],['Teal','#00544d'],['Lime','#cef52f']],specimen:['Know which deals','to close next.'],typography:'Noto Serif Display + General Sans · substitute fonts',rules:[['Grid','Wide centered content frame, approximately 7% side gutters'],['Rhythm','Generous white space around centered statements and alternating feature rows'],['Color','Dark teal actions, acidic lime highlights, pale product surfaces'],['Components','Small-radius controls, thin borders, grounded product mockups']],preview:{image:withBase('/previews/salesloft-hero.png'),alt:'Signal Serif hero with a green product demonstration and editorial headline.',caption:'Recreated Salesloft hero from supplied reference'},insight:{thesis:'Make product evidence the center of the story.',logic:'A quiet editorial opening gives way to a vivid demonstration, alternating product details, connected tools and a dark closing invitation.',bestFor:'Product-led B2B landing pages that explain a complex workflow with concrete examples.',tradeoff:'Image-heavy consumer brands where enterprise product framing may be too formal.',principles:[['Lead with the promise.','Pair a large serif statement with a short sans explanation and one clear action.'],['Show the work.','Use product-like cards and readable data as evidence beside concise feature copy.'],['Reserve bright color for emphasis.','Lime highlights prompts and actions; deep teal anchors the system and footer.']],extension:'Keep typography, palette and controls shared. Use alternating layouts to give product details room, and adapt narrow layouts without claiming unseen source behavior.',evidence:'Based on four supplied Salesloft screenshots. Original fonts, texture, portrait and standalone marks were unavailable; fonts and artwork here are approximations. Integration marks are cropped from the supplied screenshot. The third feature is cropped, and intervening content and mobile behavior are unknown.',relationship:'Source copy, customer names and metrics are reproduced for design study and are not independently verified.'}});
sections.push(...[['salesloft-page','Revenue platform landing page','Landing page','Hero + features + integrations + footer'],['salesloft-header','Navigation','Primary navigation','Brand + centered links + action'],['salesloft-hero','Hero and product demo','Introduction','Centered headline + product demonstration'],['salesloft-pipeline','Pipeline feature','Feature','Copy + testimonial + queue'],['salesloft-risk','Deal risk feature','Feature','Product card + copy'],['salesloft-integrations','Integrations and outcomes','Integrations','Centered statement + connected tools + metrics'],['salesloft-footer','Closing call to action and footer','Footer','Centered CTA + horizontal link groups']].map(([id,name,category,layout])=>({id,name,category,layout,systemId:'salesloft',mode:'reference reconstruction'})));
references.push({id:'salesloft',systemId:'salesloft',name:'Salesloft landing page',author:'Salesloft',url:'https://salesloft.com/',caption:'Four screenshots supplied by the user',image:withBase('/references/salesloft/hero.png'),dimensions:'4096 px wide · four page segments',role:'Reference reconstruction',note:'The four screenshots are preserved locally. Fonts and artwork are approximations; integration marks are cropped from the supplied screenshot. The third feature and intervening content are not fully visible.'});

// Interfere public homepage, observed with REA; source attribution is retained.
systems.push({id:'interfere',languageId:'interfere',name:'Interfere',family:'Product / observability',mode:'Reference reconstruction',description:'A dark product system with precise sans-serif typography, fine rules, restrained controls and detailed software demonstrations. Built for technical products that need to make complex work visible.',signature:'Quiet surfaces. Visible evidence.',typeLabel:'Inter + Heldane',swatches:[['Paper','#0b0b0b'],['Ink','#eeeeee'],['Rule','#262626'],['Muted','#a0a0a0']],specimen:['See the signal.','Understand the issue.'],typography:'Source InterVariable · 100–900 / Heldane Text · 400 / Berkeley Mono',rules:[['Frame','1200px maximum content · 24px mobile edges'],['Type','56/56 desktop promise · 36/36 mobile · 15/24 supporting prose'],['Surface','Near-black ground · fine low-contrast rules · compact rounded controls'],['Proof','Wide product scenes retain readable detail; mobile crops within the page'],['Contrast','Serif testimony interrupts the technical sans-serif rhythm']],preview:{image:withBase('/previews/interfere/hero.png'),alt:'Interfere dark split hero and detailed issue investigation interface',caption:'Interfere homepage · public reference recreation'},insight:{thesis:'Let the product evidence carry the story.',logic:'A direct promise opens the page, followed by large, carefully framed software scenes. Fine rules, quiet surfaces and restrained typography keep attention on the issue and its resolution.',bestFor:'Developer tools, observability products and technical software with detailed workflows to explain.',tradeoff:'Image-led lifestyle brands or short campaigns without meaningful product evidence.',principles:[['Make the software readable.','Use broad product scenes and keep interface text at its native scale. Contain deliberate mobile cropping within the page.'],['Give each proof a different job.','Move from the issue detail to a grouped inbox and then the investigation timeline. Keep content and layout independent.'],['Use contrast with restraint.','Near-black surfaces and soft white type establish continuity; serif testimony and subtle source atmosphere provide punctuation.']],extension:'Reuse the shared dark palette, type families,1200px frame, fine rules and compact actions. Build new sections around a distinct product question and its evidence.',evidence:'REA inspection and screenshot wrappers, source HTML/CSS and verified desktop/mobile captures are retained. Public fonts and visible server-rendered media are local. Demo avatars use source initials fallbacks; the mobile menu icon and disclosure panels are adapted. Animation entrances are frozen; static demo scenes do not recreate live application behavior. Native disclosure panel styling is authored.',relationship:'The supplied Interfere homepage is the reference. Source identity, copy, artwork, endorsements and service claims remain attributed to Interfere.'}});



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
systems[0].insight.evidence='Hero and portrait-quote reference reconstructions retain measured geometry. The original hero adaptation transfers the grid-study lessons: narrow copy, a reserved empty rail, separate type and spatial scales, cropped images, and four-column mobile recomposition. General Sans Light is a close visual identification from the earlier specimen comparison; PP Editorial New Thin is the inferred source serif, with no licensed file available. Noto Serif Display is the chosen free alternative, not an exact identification. Original hero and quote photographs remain crops from supplied rasters. The additional layout examples reuse generated portrait, linen, and landscape assets from the earlier grid study.';

sections.find(section=>section.id==='hero').mode='reference reconstruction + original adaptation';
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
 {id:'grid-07',name:'Catalogue and project panel',image:withBase('/references/editorial/image-index.webp'),url:'https://x.com/berlickfold/status/2055682704847327527',note:'Paired mobile catalogue images inform the original image index. Demo imagery and portfolio content are new; this is not a source reconstruction.'},
 {id:'grid-16',name:'An information rail and paired photographs',image:withBase('/references/editorial/project-pair.webp'),url:'https://x.com/berlickfold/status/2033943094652019066',note:'The source uses a narrow information rail beside a 5/4 image pair. The new coastal project transfers those spans using original generated demo imagery.'},
 {id:'grid-23',name:'A shared horizontal hinge',image:withBase('/references/editorial/horizontal-hinge.webp'),url:'https://x.com/berlickfold/status/2019020426375266668',note:'Headline, inset image, and dominant image share a starting line. The material section transfers this geometry into Quiet Serif with original content.'},
 {id:'grid-29',name:'Images beside an index',image:withBase('/references/editorial/image-rail.webp'),url:'https://x.com/berlickfold/status/1921501628307222909',note:'The source shows a mobile image rail beside a numbered list. Selection behavior, desktop arrangement, generated images and copy are authored extensions.'}
])references.push({...reference,author:'Bernardo Lickfold',caption:'Retained reference from the prior grid study',dimensions:'Full original composition retained',role:'Original section expansion evidence'});

systems[0].rules[0]=['Grid','12-column section grid; hero has 6 information tracks; mobile recomposes to 4 columns or paired image rails'];

export const interfereParts=[
 ['header','Product navigation','Navigation','Wordmark + grouped navigation + account actions'],
 ['hero','Product promise + issue detail','Heroes','Split headline + large product window'],
 ['trust','Customer & investor wall','Social proof','Quiet wordmark strip'],
 ['overview','Signal to resolution','Features','Large statement + three product scenes'],
 ['testimonial','Customer perspective','Testimonials','Serif quotation + author'],
 ['monitoring','Issue monitoring','Features','Narrative + grouped issue inbox'],
 ['triage','Issue investigation','Features','Narrative + issue detail'],
 ['resolution','Resolution workflow','Features','Narrative + investigation timeline'],
 ['security','Security & compliance','Trust','Split statement + compliance rows'],
 ['releases','Latest releases','Changelog','Three dated release summaries'],
 ['footer','Closing invitation + footer','Footers','Large promise + grouped link columns']
];
sections.push(...interfereParts.map(([id,name,category,layout])=>({id:'interfere-'+id,name,category,layout,systemId:'interfere',mode:'Reference reconstruction'})),{id:'interfere-page',name:'Observability landing page',category:'Page',layout:'Complete product narrative with eleven reusable sections',systemId:'interfere',mode:'Reference reconstruction'});
references.push({id:'interfere',name:'Interfere homepage',image:withBase('/references/interfere-desktop.png'),url:'https://interfere.com/',author:'Interfere',role:'Product homepage',note:'Supplied public reference, inspected with REA and captured at desktop and mobile dimensions. Static demonstration states and adapted native disclosures are documented.',caption:'Public homepage reference · captured31October2026',dimensions:'1440 ×900 desktop;390 ×844 mobile'});

systems.push(steelSystem);sections.push(...steelSections);references.push(steelReference);

// Conversion homepage, inspected in the browser and captured on 31 October 2026.
systems.push({id:'conversion',languageId:'conversion',name:'Conversion',family:'Marketing software',mode:'Reference reconstruction',description:'Warm paper, editorial serif headlines, muted blue controls and product-led diagrams form a calm, detailed B2B marketing language.',signature:'Editorial clarity. Product evidence. Warm paper.',typeLabel:'Family + TWK Lausanne',swatches:[['Paper','#faf9f7'],['Ink','#1a1a19'],['Blue','#4787a2'],['Rule','#e4e3df']],specimen:['The agentic','marketing platform.'],typography:'Family Regular / TWK Lausanne 400 and 500 · source font files',rules:[['Frame','48px desktop gutters · 24px mobile gutters'],['Type','64/67px desktop hero · 40px mobile hero · 40/44px section headings'],['Surface','Warm paper, hairline rules, compact blue pill actions'],['Proof','Wide product preview, pastel feature tiles and structured diagrams'],['Responsive','Stack diagrams and cards on narrow screens; preserve reading order']],preview:{image:withBase('/previews/conversion/hero.png'),alt:'Reconstructed Conversion hero with a centered serif headline and product demonstration',caption:'Conversion hero · rendered study'},insight:{thesis:'Pair an editorial promise with concrete product proof.',logic:'The centered introduction leads to a full-width product scene, then alternates explanatory copy, detailed demos, customer proof, security and editorial resources.',bestFor:'B2B software with complex workflows that benefit from visible product evidence.',tradeoff:'The restrained system depends on clear, readable product details and concise copy.',principles:[['Start with a clear promise.','A regular serif headline and a short sans-serif explanation sit on a warm, open surface.'],['Make the product tangible.','Large product scenes and pastel-framed examples show the work behind each claim.'],['Use quiet structure.','Fine rules, generous gutters and compact blue actions keep the page ordered without competing with the demonstrations.']],extension:'Keep the type pairing, paper ground, fine rules and blue action consistent; give each new section a clear role and readable product evidence.',evidence:'Desktop and mobile browser captures, source fonts, customer marks, textures, videos, and product illustration markup are retained. Platform scenes are static source states; the closing canvas and privacy control are adaptations. REA was unavailable for this run.',relationship:'Conversion.ai identity, source copy, media and claims are attributed to Conversion. This collection is a design study.'}});
sections.push(...[['page','Marketing automation landing page','Page','Complete product story'],['header','Navigation','Navigation','Announcement + brand + links + actions'],['hero','Hero and product preview','Heroes','Centered promise + full-width product scene'],['logos','Customer logos','Social proof','Two rows of customer marks'],['agents','Agent examples','Product demos','Tabbed examples + conversation'],['context','AI context layer','Features','Four-column data diagram'],['platform','Platform features','Features','Two- and three-column product mosaic'],['testimonial','Customer story','Testimonials','Large video poster + attribution'],['security','Security and compliance','Trust','Dark centered statement + three columns'],['resources','Resources','Editorial','Editorial article rows'],['closing','Closing invitation','Calls to action','Centered statement + action'],['footer','Footer','Footers','Brand + grouped links']].map(([id,name,category,layout])=>({id:'conversion-'+id,name,category,layout,systemId:'conversion',mode:'Reference reconstruction'})));
references.push({id:'conversion',systemId:'conversion',name:'Conversion homepage',author:'Conversion',url:'https://conversion.ai/',caption:'Public homepage captured 31 October 2026',image:withBase('/references/conversion/desktop-hero.jpg'),dimensions:'1280 × 720 desktop; 390 × 844 mobile',role:'Marketing software homepage',note:'Desktop and mobile captures, source fonts, logos, textures, videos and product markup are retained. Some dynamic behavior is adapted.'});

systems.push(plasticitySystem); sections.push(...plasticitySections); references.push(plasticityReference);

export const visualLanguageCount = new Set(systems.map(system => system.languageId)).size;

Object.assign(comparisons,{"steel-hero":{width:1440,height:500,source:withBase("/references/steel/hero.png"),implementation:withBase("/evidence/steel/hero.png"),author:"Steel",note:"Headline variant A; procedural artwork varies by frame"}});

comparisons['salesloft-hero']={width:1440,height:1136,source:withBase('/references/salesloft/hero-comparison.png'),implementation:withBase('/evidence/salesloft/hero-comparison.png'),author:'Salesloft',note:'Normalized screenshot crop; substitute fonts and artwork'};

comparisons['conversion-page']={width:1280,height:720,source:withBase('/references/conversion/desktop-hero.jpg'),implementation:withBase('/evidence/conversion/desktop-hero.jpg'),author:'Conversion',note:'First viewport only; lower sections contain documented approximations'};

comparisons['salesloft-integrations']={width:1440,height:865,source:withBase('/references/salesloft/integrations-comparison.png'),implementation:withBase('/evidence/salesloft/integrations-comparison.png'),author:'Salesloft',note:'Normalized reference; app marks cropped from the supplied image'};

// Aligned desktop captures of the revised Conversion sections.
Object.assign(comparisons,{
 'conversion-platform':{width:1280,height:1721,source:withBase('/references/conversion-finish/platform.jpg'),implementation:withBase('/evidence/conversion-finish/platform.jpg'),author:'Conversion',note:'Static product states; the source demo changes over time'},
 'conversion-security':{width:1280,height:1082,source:withBase('/references/conversion-finish/security.jpg'),implementation:withBase('/evidence/conversion-finish/security.jpg'),author:'Conversion',note:'Source-sized section; visual states are static'},
 'conversion-resources':{width:1280,height:887,source:withBase('/references/conversion-finish/resources.jpg'),implementation:withBase('/evidence/conversion-finish/resources-paired.jpg'),author:'Conversion',note:'Source-sized crop'},
 'conversion-footer':{width:1280,height:1061,source:withBase('/references/conversion-finish/footer.jpg'),implementation:withBase('/evidence/conversion-finish/footer.jpg'),author:'Conversion',note:'Source-sized crop; footer spacing differs'},
 'conversion-closing':{width:1280,height:516,source:withBase('/references/conversion-finish/closing.jpg'),implementation:withBase('/evidence/conversion-finish/closing-paired.jpg'),author:'Conversion',note:'Changing source canvas represented by a static state'}
});

systems.push(mnhSystem); sections.push(...mnhSections); references.push(mnhReference);
comparisons['mnh-page']={width:1280,height:720,source:withBase('/references/mnh/desktop-hero.png'),implementation:withBase('/evidence/mnh/desktop-hero.png'),author:'MNH',note:'First viewport; menu behavior is adapted'};

systems.push(conareSystem); sections.push(...conareSections); references.push(conareReference);
comparisons['conare-page']={width:1280,height:720,source:withBase('/references/conare/home-deep-hero.png'),implementation:withBase('/previews/conare/comparison.png'),author:'Conare',note:'First viewport; demo frame is time-dependent'};

sections.push(...evalSections); references.push(evalReference);
comparisons['conare-evals-page']={width:1280,height:720,source:withBase('/references/conare-evals/desktop-hero.png'),implementation:withBase('/previews/conare-evals/comparison.png'),author:'Conare',note:'Featured case rotates on the reference'};
