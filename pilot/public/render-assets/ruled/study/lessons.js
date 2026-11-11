'use strict';
// Article examples use the same calculated layout engine as the main playground.
const lessonValues={structure:'layout',offset:'offset',ratio:'portrait',responsive:'desktop'};
const lessonDefaults={preset:'editorial',material:'portrait',columns:12,font:'sans',margin:20,gutter:8,offset:1,ratio:'portrait',paper:'light',grid:false,rows:true,unit:4,rowMultiple:8,device:'desktop',compare:false};
function lessonState(name){
 const s={...lessonDefaults};
 if(name==='structure'){s.preset='project';s.grid=lessonValues[name]==='grid';s.material='landscape';s.margin=12;s.gutter=4;}
 if(name==='offset'){s.preset='reading';s.device='mobile';s.columns=4;s.offset=lessonValues[name]==='offset'?1:0;s.grid=true;s.material='linen';s.margin=16;s.gutter=4;}
 if(name==='ratio'){s.preset='project';s.cropStudy=true;s.material='landscape';s.ratio=lessonValues[name];s.margin=12;s.gutter=4;s.rowMultiple=4;}
 if(name==='responsive'){s.preset='project';s.material='landscape';s.device=lessonValues[name];s.columns=s.device==='mobile'?4:12;s.margin=s.device==='mobile'?16:12;s.gutter=4;s.rowMultiple=4;}
 return s;
}
function fitLesson(stage){
 const preview=stage.querySelector('.preview');
 if(!preview.dataset.designWidth)return;
 const name=stage.closest('[data-lesson]').dataset.lesson;const s=lessonState(name);
 const variants=name==='offset'?[{...s,offset:0},{...s,offset:1}]:name==='ratio'?['portrait','square','landscape'].map(ratio=>({...s,ratio})):[s];
 const referenceHeight=Math.max(...variants.map(value=>GridMath.calculate(value,materialCopy[value.material]).height));
 const available=Math.min(stage.clientWidth,s.device==='mobile'?280:stage.clientWidth);
 const scale=fitComposition(preview,available);
 stage.style.height=(referenceHeight*scale)+'px';
}
function renderLesson(name){
 const figure=document.querySelector(`[data-lesson="${name}"]`),stage=figure.querySelector('.lesson-stage');
 applyPreview(stage.querySelector('.preview'),lessonState(name));fitLesson(stage);
 document.querySelectorAll(`[data-lesson-control="${name}"]`).forEach(button=>button.setAttribute('aria-pressed',button.dataset.value===lessonValues[name]));
}
const lessonObserver=new ResizeObserver(entries=>entries.forEach(({target})=>fitLesson(target)));
for(const name of Object.keys(lessonValues)){renderLesson(name);lessonObserver.observe(document.querySelector(`[data-lesson="${name}"] .lesson-stage`));}
document.querySelector('#system').addEventListener('click',event=>{
 const control=event.target.closest('[data-lesson-control]');
 if(control){lessonValues[control.dataset.lessonControl]=control.dataset.value;renderLesson(control.dataset.lessonControl);}
 const source=event.target.closest('[data-study]');if(source)openReference(Number(source.dataset.study));
});
