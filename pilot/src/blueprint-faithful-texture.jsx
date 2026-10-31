/* Faithful isolation of Blueprint public FinalTextures module702424.
 * Source: https://blueprint.page/_next/static/chunks/3bifpxydy2uwp.js
 * Source shader, seeded fields, five masks and GPU/2D renderers preserved.
 * React wrapper adapts the source visibility hook to native IntersectionObserver
 * and targets the existing source .ft-canvas; no application chunk is executed.
 */
import {useEffect} from 'react';
let r=()=>new Promise(e=>"function"==typeof requestIdleCallback?requestIdleCallback(()=>e(),{timeout:400}):setTimeout(e,16)),n=`
precision mediump float;
uniform sampler2D a;
uniform sampler2D b;
uniform sampler2D bayer;
uniform vec2 size;
uniform float dpr;
uniform float t;
uniform float seed;
uniform vec4 ink;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7)) + seed * 17.13) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1.0, 0.0)), f.x), mix(h(i + vec2(0.0, 1.0)), h(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
  vec2 uv = vec2(gl_FragCoord.x, size.y - gl_FragCoord.y) / size;
  vec2 css = gl_FragCoord.xy / dpr;
  float n = noise(css / 420.0) * 0.6 + noise(css / 170.0) * 0.28 + noise(css / 60.0) * 0.12;
  float d = texture2D(bayer, floor(css / 3.0) / 8.0 + 0.5 / 8.0).a;
  float th = clamp(n * 0.72 + d * 0.28, 0.0, 1.0);
  float band = 0.06;
  float front = t * (1.0 + 2.0 * band) - band;
  float oldA = texture2D(a, uv).a * step(front - band, th);
  float newA = texture2D(b, uv).a * step(th, front + band);
  float alpha = max(oldA, newA) * ink.a;
  gl_FragColor = vec4(ink.rgb * alpha, alpha);
}`;function i(e){let s=e.getContext("2d"),a=null,t=[0,0,0,0],r=()=>{if(!s||!a)return;let e=s.createImageData(a.W,a.H),[r,n,i,l]=t.map(e=>Math.round(255*e));for(let s=0;s<a.data.length;s++){let t=4*s;e.data[t]=r,e.data[t+1]=n,e.data[t+2]=i,e.data[t+3]=a.data[s]*l/255}s.putImageData(e,0,0)};return{ready:()=>!!a,count:()=>1,load(s,t,n){e.width=t,e.height=n,a={data:s[0],W:t,H:n},r()},color(e){t=l(e),r()},draw(){},dispose(){a=null}}}function l(e){let s=document.createElement("canvas");s.width=s.height=1;let a=s.getContext("2d",{willReadFrequently:!0});if(!a)return[.5,.5,.5,.36];a.fillStyle=e,a.fillRect(0,0,1,1);let[t,r,n,i]=a.getImageData(0,0,1,1).data;return[t/255,r/255,n/255,i/255]}let o=(e,s,a)=>{let t,r=(t=(a-e)/(s-e))<0?0:t>1?1:t;return r*r*(3-2*r)};function c(e){let s=e>>>0;return()=>{let e=s=s+0x6d2b79f5>>>0;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/0x100000000}}function d(e,s,a){let t=c(11),r=Float32Array.from({length:65536},()=>t()),n=(e,s)=>r[(s%256+256)%256*256+(e%256+256)%256],i=(e,s)=>{let a=Math.floor(e),t=Math.floor(s),r=e-a,i=s-t,l=r*r*(3-2*r),o=n(a,t)+(n(a+1,t)-n(a,t))*l;return o+(n(a,t+1)+(n(a+1,t+1)-n(a,t+1))*l-o)*(i*i*(3-2*i))},l=1/260,d=e/2,h=s/2;return(t,r)=>{let n=0,c=.5,x=l;for(let e=0;e<4;e++)n+=c*i(t*x+17.3*e,r*x+9.1*e),c*=.5,x*=2.05;if(!a)return n;let u=(t-d)/e,m=(r-h)/s,f=Math.min(1,1.6*Math.sqrt(u*u+m*m));return o(.3,.7,n)*(.4+.6*f)}}let h=[0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21],x=[(e,s,{field:a,s:t})=>{let r=(e+s)*Math.SQRT1_2,n=(s-e)*Math.SQRT1_2,i=Math.floor(r/9),l=Math.floor(n/9),c=(i+.5)*9,d=(l+.5)*9,h=9*Math.sqrt(a((c-d)*Math.SQRT1_2,(c+d)*Math.SQRT1_2))*.62;return o(h+t,h-t,Math.hypot(r-(i+.5)*9,n-(l+.5)*9))},(e,s,{field:a})=>{let t=Math.floor(e/3),r=Math.floor(s/3);return+(a((t+.5)*3,(r+.5)*3)>(h[(7&r)*8+(7&t)]+.5)/64)},(e,s,{w:a,h:t})=>{let r=Math.floor((Math.abs(e-a/2)+Math.abs(s-t/2))/32),n=e/9*(1-.45*e/a)+(1&r)*.5;return+(n-Math.floor(n)<.5)},(e,s,{raw:a,s:t})=>{let r=22*a(e,s),n=22*a(e+1,s)-r,i=22*a(e,s+1)-r,l=r-Math.floor(r);return o(.7+t,.7-t,Math.min(l,1-l)/Math.max(Math.hypot(n,i),.01))},(e,s,{field:a,rand:t})=>+(t()<a(e,s)*a(e,s)*.7)];
const createRenderer=function(e){let s=e.getContext("webgl",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1});if(!s)return i(e);let a=(e,a)=>{let t=s.createShader(e);return s.shaderSource(t,a),s.compileShader(t),t},t=s.createProgram();if(s.attachShader(t,a(s.VERTEX_SHADER,"attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }")),s.attachShader(t,a(s.FRAGMENT_SHADER,n)),s.linkProgram(t),!s.getProgramParameter(t,s.LINK_STATUS))return i(e);s.useProgram(t);let r=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,r),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),s.STATIC_DRAW);let o=s.getAttribLocation(t,"p");s.enableVertexAttribArray(o),s.vertexAttribPointer(o,2,s.FLOAT,!1,0,0),s.pixelStorei(s.UNPACK_ALIGNMENT,1);let c=(e,a,t,r)=>{let n=s.createTexture();s.bindTexture(s.TEXTURE_2D,n),s.texImage2D(s.TEXTURE_2D,0,s.ALPHA,e,a,0,s.ALPHA,s.UNSIGNED_BYTE,t);let i=r?s.REPEAT:s.CLAMP_TO_EDGE;return s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,i),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,i),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MAG_FILTER,s.NEAREST),n},d=c(8,8,Uint8Array.from(h,e=>Math.round((e+.5)/64*255)),!0);s.uniform1i(s.getUniformLocation(t,"a"),0),s.uniform1i(s.getUniformLocation(t,"b"),1),s.uniform1i(s.getUniformLocation(t,"bayer"),2);let x=[],u=[0,0,0,0];return{ready:()=>x.length>0,count:()=>x.length,load(a,r,n,i){x.forEach(e=>s.deleteTexture(e)),e.width=r,e.height=n,s.viewport(0,0,r,n),x=a.map(e=>c(r,n,e,!1)),s.uniform2f(s.getUniformLocation(t,"size"),r,n),s.uniform1f(s.getUniformLocation(t,"dpr"),i)},color(e){u=l(e),s.uniform4f(s.getUniformLocation(t,"ink"),u[0],u[1],u[2],u[3])},draw(e,a,r,n=0){x.length&&(s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,x[e]),s.activeTexture(s.TEXTURE1),s.bindTexture(s.TEXTURE_2D,x[a]??x[e]),s.activeTexture(s.TEXTURE2),s.bindTexture(s.TEXTURE_2D,d),s.uniform1f(s.getUniformLocation(t,"t"),r),s.uniform1f(s.getUniformLocation(t,"seed"),n%97),s.drawArrays(s.TRIANGLES,0,3))},dispose(){x.forEach(e=>s.deleteTexture(e)),s.deleteTexture(d),s.deleteBuffer(r),s.deleteProgram(t),x=[]}}};

export function SourceFinalTexture({selector='.bp-faithful .ft-canvas'}) {
 useEffect(()=>{
  const canvas=document.querySelector(selector);
  const container=canvas?.closest('.ft');
  if(!canvas||!container)return;
  let active=false,disposed=false,visible=false,stop=()=>{},wake=()=>{};
  const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;wake()});
  visibility.observe(container);
  function activate(){
   if(active||disposed)return;active=true;
   const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
   const renderer=createRenderer(canvas);
   let cancelled=false,width=0,height=0,resizeTimer=0,raf=0,elapsed=0,lastFrame=0,holdTimer=0,holdDuration=0,holdStart=0;
   function drawPhase(){
    const count=renderer.count();
    const cycle=elapsed%(7*count),index=Math.floor(cycle/7),into=cycle-7*index;
    const progress=into<4.8?0:(into-4.8)/2.2;
    const eased=progress<.5?4*progress*progress*progress:1-(-2*progress+2)**3/2;
    renderer.draw(index,(index+1)%count,eased,Math.floor(elapsed/7));
    return {progress,into};
   }
   function frame(now){
    raf=0;if(!renderer.ready())return;
    if(reduced.matches){renderer.draw(0,0,0);return}
    if(!visible){lastFrame=0;drawPhase();return}
    if(lastFrame)elapsed+=Math.min(100,now-lastFrame)/1000;
    lastFrame=now;
    const {progress,into}=drawPhase();
    if(progress>0)raf=requestAnimationFrame(frame);
    else{
     lastFrame=0;holdDuration=(4.8-into)*1000;holdStart=now;
     holdTimer=window.setTimeout(()=>{holdTimer=0;elapsed+=holdDuration/1000;lastFrame=performance.now();raf=requestAnimationFrame(frame)},holdDuration);
    }
   }
   function restart(){
    cancelAnimationFrame(raf);
    if(holdTimer){window.clearTimeout(holdTimer);holdTimer=0;elapsed+=Math.max(0,performance.now()-holdStart)/1000}
    lastFrame=0;raf=requestAnimationFrame(frame);
   }
   wake=restart;
   async function resize(){
    const nextWidth=Math.round(container.clientWidth),nextHeight=Math.round(container.clientHeight);
    if(!nextWidth||!nextHeight||(Math.abs(nextWidth-width)<40&&Math.abs(nextHeight-height)<40))return;
    width=nextWidth;height=nextHeight;
    const dpr=Math.min(window.devicePixelRatio||1,1.5),W=Math.round(width*dpr),H=Math.round(height*dpr);
    const masks=reduced.matches?x.slice(0,1):x;
    const layers=[];
    for(const mask of masks){
     await r();if(cancelled)return;
     const data=new Uint8Array(W*H),context={w:width,h:height,s:1/dpr,field:d(width,height,true),raw:d(width,height,false),rand:c(7)};
     for(let y=0;y<H;y++)for(let x=0;x<W;x++)data[y*W+x]=255*mask((x+.5)/dpr,(y+.5)/dpr,context);
     layers.push(data);
    }
    if(!cancelled){renderer.load(layers,W,H,dpr);restart()}
   }
   function recolor(){renderer.color(getComputedStyle(canvas).color);restart()}
   recolor();
   const dark=window.matchMedia('(prefers-color-scheme: dark)');
   dark.addEventListener('change',recolor);reduced.addEventListener('change',restart);
   const theme=new MutationObserver(recolor);theme.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
   const observer=new ResizeObserver(()=>{window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>void resize(),300)});
   observer.observe(container);void resize();
   stop=()=>{cancelled=true;wake=()=>{};observer.disconnect();theme.disconnect();dark.removeEventListener('change',recolor);reduced.removeEventListener('change',restart);window.clearTimeout(resizeTimer);window.clearTimeout(holdTimer);cancelAnimationFrame(raf);renderer.dispose()};
  }
  const nearby=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){activate();nearby.disconnect()}},{rootMargin:'1600px'});
  nearby.observe(container);
  return()=>{disposed=true;nearby.disconnect();visibility.disconnect();stop()};
 },[selector]);
 return null;
}
