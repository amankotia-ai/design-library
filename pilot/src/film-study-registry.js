export const filmStudies=[
 {id:'film-calculus',title:'The calculus of film',short:'Scene calculus',summary:'Evaluate one authored scene, its derivatives, interval bounds and visible proof time.'},
 {id:'spring-motion',title:'Spring motion & damping',short:'Spring motion',summary:'Compare bouncing, critical damping and overdamping through position, velocity and acceleration.',family:'motion',guides:['camera-and-motion','creative-quality','directions','motion-designer','creator-craft']},
 {id:'bezier-paths',title:'Paths, tangents & speed',short:'Bézier paths',summary:'Shape a Bézier path, change its easing and duration, and inspect velocity and acceleration in seconds.',family:'motion',guides:['camera-and-motion','motion-designer','cinematographer','directions']},
 {id:'camera-parallax',title:'Camera, depth & parallax',short:'Camera & depth',summary:'Ease a camera through layered depth and inspect projected position, velocity and acceleration.',family:'motion',guides:['camera-and-motion','assets-and-compositing','cinematographer','asset-designer']},
 {id:'framing-crop',title:'Framing across formats',short:'Framing & crop',summary:'Change aspect ratio, crop position and zoom; measure exactly how much of a protected subject remains.',family:'motion',guides:['stageshow-framing','assets-and-compositing','finishing-and-review','art-director','ui-designer','contact-sheets']},
 {id:'speech-timing',title:'Speech, picture & the edit clock',short:'Speech timing',summary:'Map a source-word anchor into program time, then inspect picture-cue offset and frame quantization.',family:'timing',guides:['speech-led-editing','speech-edit-model','story-and-sound','narrator','editor','elevenlabs-production']},
 {id:'reading-window',title:'The opportunity to read',short:'Reading windows',summary:'Compare a continuous visible window with a declared reading-time assumption and inspect the margin.',family:'timing',guides:['repository-techniques','video-quality-model','speech-edit-model','story-and-sound','creative-quality','editor']},
 {id:'sound-mixing',title:'Sound, gain & clipping',short:'Sound mixing',summary:'Mix two sinusoidal signals, inspect clipping, and compare an analytic level bound with the waveform.',family:'timing',guides:['story-and-sound','sound-designer','finishing-and-review','elevenlabs-production']},
 {id:'sampling-aliasing',title:'Sampling & apparent motion',short:'Sampling & aliasing',summary:'Sample continuous motion at a chosen frame rate and compare its samples with an aliased signal.',family:'timing',guides:['runtime','rendering-and-tools','rendering-tools','render-engineer','repository-techniques','contact-sheets']},
];

export function studiesForEntry(entry){
 if(entry.id==='film-calculus'||entry.kind==='study')return filmStudies.filter(study=>study.id!==entry.id);
 if(entry.sourcePath?.endsWith('/SKILL.md'))return filmStudies;
 const path=(entry.sourcePath||'').toLowerCase();
 return filmStudies.filter(study=>study.guides?.some(guide=>path.endsWith(`/${guide}.md`)));
}

export const studyGuidance={
 'spring-motion':{use:'Compare three damping regimes at the same natural frequency. A target crossing still has velocity; a nonoscillating return can still be slow. Inspect position and velocity together before choosing a readable hold.',next:['reading-window','bezier-paths']},
 'bezier-paths':{use:'Compare three timing curves on the same path. Change duration to see velocity scale with 1/T and acceleration with 1/T², then shape the route with its control points.',next:['spring-motion','camera-parallax']},
 'camera-parallax':{use:'Compare three easing functions on the same lateral camera journey. Inspect how depth scales projected velocity and acceleration, reverse the endpoints to change direction, and lengthen the duration for a gentler move.',next:['bezier-paths','framing-crop']},
 'framing-crop':{use:'Keep the output format and zoom fixed while comparing crop anchors. The protected rectangle measures subject retention; use it to find a crop that keeps the evidence in frame.',next:['camera-parallax','reading-window']},
 'speech-timing':{use:'Anchor a picture cue to a spoken word. Compare an aligned cue with a late cue and a word removed by trimming, then inspect the exact program time and frame offset.',next:['reading-window','sound-mixing']},
 'reading-window':{use:'Compare more copy with more time. The margin estimates the opportunity to read under your declared reading-rate assumption; validate the result by watching the actual cut.',next:['speech-timing','spring-motion']},
 'sound-mixing':{use:'Compare headroom, clipping and cancellation. Keep an eye on both the waveform and the bound: a conservative upper bound is different from the peak sampled in this window.',next:['speech-timing','sampling-aliasing']},
 'sampling-aliasing':{use:'Compare slow, reversed and frozen apparent motion at the same frame rate. Play the slowed view to inspect what happens between captured frames.',next:['bezier-paths','film-calculus']},
};
