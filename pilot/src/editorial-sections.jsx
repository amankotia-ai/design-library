import React,{useState} from 'react';
import {cn} from './utils';
import './editorial-sections.css';
import {withBase} from './base.js';
const asset=name=>withBase(`/assets/editorial/${name}.webp`);
const pageHref=id=>withBase(`/?view=page#${id}`);
export function ProjectPair(){return <section className="qs-section qs-project" id="coastal-journal" aria-labelledby="coastal-title">
 <div className="qs-section-top"><p>02 / Field journal</p><span>Personal studies · 2026</span></div>
 <div className="qs-project-info"><h2 id="coastal-title">Somewhere,<br/>slowly.</h2><p>A study of the distance between a place and its memory. Open water, low cloud, and the small signs of a life lived close to the weather.</p><dl><div><dt>Project</dt><dd>The coastal journal</dd></div><div><dt>Discipline</dt><dd>Landscape</dd></div><div><dt>Year</dt><dd>2026</dd></div><div><dt>Series</dt><dd>Independent studies</dd></div></dl></div>
 <figure className="qs-project-main"><img src={asset('landscape')} alt="Generated coastal landscape with a turf-roofed cabin beneath misty cliffs."/><figcaption>01 / The wider view</figcaption></figure>
 <figure className="qs-project-detail"><img src={asset('landscape')} alt="A closer crop of the generated coastline, with the cliff edge and sea in view."/><figcaption>02 / The edge of the frame</figcaption></figure>
 </section>}

const indexItems=[
 {name:'The coastal journal',type:'Landscape',image:'landscape',target:'coastal-journal',alt:'Generated coastal landscape with mist, cliffs, and a small cabin.'},
 {name:'A material memory',type:'Still life',image:'linen',target:'material-study',alt:'Generated linen folds in warm daylight.'},
 {name:'Window, still',type:'Portrait',image:'portrait',target:'portrait-index',alt:'Generated portrait of a seated woman in a charcoal linen shirt.'},
 {name:'On presence',type:'Studio practice',image:withBase('/assets/practice.webp'),target:'practice',alt:'Black-and-white portrait study from the retained Bernardo Lickfold reference.'}
];
export function PhotoIndex(){return <section className="qs-section qs-photo-index" id="work" aria-labelledby="selected-title"><div className="qs-index-heading"><p>01 / Selected observations</p><h2 id="selected-title">A few ways<br/>of looking.</h2><p>Places, surfaces, people.<br/>Independent studies, 2026.</p></div><div className="qs-photo-grid">{indexItems.map((item,index)=><a href={pageHref(item.target)} key={item.name}><figure><img src={item.image.startsWith('/')?item.image:asset(item.image)} alt={item.alt}/><figcaption><span>0{index+1} / {item.type}</span><span>{item.name} ↗</span></figcaption></figure></a>)}</div></section>}

export function SplitMaterial(){return <section className="qs-section qs-material" id="material-study" aria-labelledby="material-title"><p className="qs-material-label">04 / Material study</p><p className="qs-material-copy">Light finds its way through the weave. A study of weight, folded edges, and the small irregularities that make an ordinary surface worth a closer look.</p><h2 id="material-title">A material<br/>memory.</h2><figure className="qs-material-detail"><img src={asset('portrait')} alt="Detail crop of the charcoal linen shirt in the generated portrait."/><figcaption>Worn / charcoal linen</figcaption></figure><figure className="qs-material-main"><img src={asset('linen')} alt="Generated natural linen folded over a pale stone plinth in soft light."/><figcaption><span>Study 04 / Natural linen</span><span>Light & texture</span></figcaption></figure></section>}

const series=[
 {name:'Window, still',kind:'Portrait / 2026',image:asset('portrait'),alt:'Generated portrait of a woman in a dark linen shirt seated beside a window.',copy:'A quiet portrait shaped by side light, an unhurried gesture, and the texture of a familiar shirt.'},
 {name:'The coastal journal',kind:'Landscape / 2026',image:asset('landscape'),alt:'Generated scene of a small cabin on a green coastal slope.',copy:'The landscape as a sequence of distances: foreground stone, a roof in the grass, then the line where the cliffs dissolve.'},
 {name:'A material memory',kind:'Still life / 2026',image:asset('linen'),alt:'Generated still life of natural linen and pale stone.',copy:'A surface observed through folds and shadow. The fabric is left to find its own shape in the light.'},
 {name:'On presence',kind:'Studio practice / 2026',image:withBase('/assets/practice.webp'),alt:'Black-and-white reference portrait with braided hair and a dark shirt.',copy:'A study of how a simple crop can hold a gesture. The frame leaves room for what is just outside it.'}
];
export function ImageRail(){const [selected,setSelected]=useState(0);const current=series[selected];return <section className="qs-section qs-image-rail" id="notes" aria-labelledby="rail-title"><div className="qs-section-top"><p>06 / An image index</p><span>Four studies, one shared frame</span></div><h2 id="rail-title">In good<br/>company.</h2><div className="qs-rail-body"><div className="qs-rail-images" id="portrait-index">{[0,1,2].map((offset)=><figure key={offset}><img src={series[(selected+offset)%series.length].image} alt={series[(selected+offset)%series.length].alt}/>{offset===0&&<figcaption>{current.kind}</figcaption>}</figure>)}</div><div className="qs-rail-index"><p className="qs-rail-kicker">Index / 04</p><div className="qs-rail-buttons" aria-label="Choose a study">{series.map((item,index)=><button key={item.name} aria-pressed={selected===index} onClick={()=>setSelected(index)}><span>0{index+1}</span><span>{item.name}</span><span aria-hidden="true">{selected===index?'↗':''}</span></button>)}</div><div className="qs-rail-description" aria-live="polite"><h3>{current.name}</h3><p>{current.copy}</p></div><p className="qs-rail-note">Select a title to change the sequence.</p></div></div></section>}

export const editorialExampleCards=[
 ['project-detail','Project detail','Information rail + paired images',withBase('/previews/editorial/project-detail.png')],
 ['image-index','Selected image index','Four columns → two columns',withBase('/previews/editorial/image-index.png')],
 ['split-material','Split material feature','Title + inset + dominant image',withBase('/previews/editorial/split-material.png')],
 ['image-rail','Image + numbered index','A working image sequence',withBase('/previews/editorial/image-rail.png')]
];
export function EditorialExamples(){return <section className="article-section editorial-example-browser" aria-labelledby="more-layouts-title"><p className="eyebrow">Four new original layouts / Quiet Serif</p><h2 id="more-layouts-title">More ways to compose the page.</h2><p>Project rails, paired crops, a shared horizontal edge, and an image index. These sections extend layouts studied in the earlier Berlickfold collection.</p><div className="editorial-example-cards">{editorialExampleCards.map(([id,name,description,image])=><a href={withBase(`/?panel=library&section=${id}`)} key={id}><img src={image} alt={`${name}, rendered Quiet Serif section preview.`}/><h3>{name} ↗</h3><p>{description}</p></a>)}</div><p><a href={withBase('/?view=page#work')} target="_blank" rel="noreferrer">See all four in the assembled page ↗</a></p></section>}
