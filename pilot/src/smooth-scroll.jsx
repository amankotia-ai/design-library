import {useEffect} from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export function SmoothScroll(){
 useEffect(()=>{
  // Embedded studies keep their own native scroll and interaction behavior.
  if(window.self!==window.top)return;
  const desktop=window.matchMedia('(min-width: 701px)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis;
  const update=()=>{
   lenis?.destroy();
   lenis=desktop.matches&&!reducedMotion.matches?new Lenis({autoRaf:true,lerp:0.15,allowNestedScroll:true}):undefined;
  };
  update();
  desktop.addEventListener('change',update);
  reducedMotion.addEventListener('change',update);
  return()=>{
   desktop.removeEventListener('change',update);
   reducedMotion.removeEventListener('change',update);
   lenis?.destroy();
  };
 },[]);
 return null;
}
