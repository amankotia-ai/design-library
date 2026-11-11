import React,{createContext,useContext,useEffect,useMemo,useRef,useState} from 'react';
import {useAnimationFrame,useInView} from 'motion/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import './film-studies.css';

const PlaybackContext=createContext({epoch:0,pause:()=>{}});

export function Equation({equation}){
 const html=useMemo(()=>equation.tex?katex.renderToString(equation.tex,{displayMode:false,throwOnError:false,trust:false,output:'htmlAndMathml'}):null,[equation.tex]);
 return html?<div className="study-equation-typeset" dangerouslySetInnerHTML={{__html:html}}/>:<code>{equation.formula}</code>;
}

export function Playback({value,onChange,min=0,max=1,duration=4,label='animation'}){
 const [playing,setPlaying]=useState(false),[hidden,setHidden]=useState(()=>document.hidden);
 const {epoch,epochRef,sceneRef}=useContext(PlaybackContext);
 const ref=useRef(null),start=useRef({wall:0,value:min});
 const inView=useInView(sceneRef||ref,{amount:.1});
 useEffect(()=>{setPlaying(false)},[epoch]);
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 useEffect(()=>{if(!inView||hidden)setPlaying(false)},[inView,hidden]);
 useAnimationFrame(()=>{
  if(!playing||!inView||hidden)return;
  if(epochRef&&start.current.epoch!==epochRef.current){setPlaying(false);return;}
  const next=start.current.value+(performance.now()-start.current.wall)/1000/duration*(max-min);
  if(next>=max){onChange(max);setPlaying(false)}else onChange(next);
 });
 const toggle=()=>{if(playing){setPlaying(false);return}const current=value>=max-1e-8?min:value;onChange(current);start.current={wall:performance.now(),value:current,epoch:epochRef?.current};setPlaying(true);};
 return <div className="study-playback" ref={ref}><button type="button" aria-label={`${playing?'Pause':'Play'} ${label}`} aria-pressed={playing} onClick={toggle}><span aria-hidden="true">{playing?'Ⅱ':'▶'}</span>{playing?'Pause':'Play'}</button><button type="button" aria-label={`Rewind ${label}`} onClick={()=>{setPlaying(false);onChange(min)}}>Rewind</button><span>{duration}s pass · plays once</span></div>;
}

export function Range({label,value,min,max,step=1,onChange,unit=''}){
 const {pause}=useContext(PlaybackContext);
 const digits=Math.min(4,String(step).split('.')[1]?.length||0);
 return <label className="study-control"><span>{label}<output>{Number(value).toFixed(digits)}{unit&&` ${unit}`}</output></span><input aria-label={label} type="range" value={value} min={min} max={max} step={step} onChange={event=>{pause();onChange(Number(event.target.value))}}/></label>;
}

export function StudyLayout({title,description,visual,controls,equations=[],metrics=[],note,presets=[],onReset,insight,variables=[]}){
 const [epoch,setEpoch]=useState(0);
 const sceneRef=useRef(null),epochRef=useRef(0);
 const pause=()=>{epochRef.current+=1;setEpoch(epochRef.current)};
 return <PlaybackContext.Provider value={{epoch,epochRef,pause,sceneRef}}><section className="film-study" aria-label={title} data-study-title={title}>
  <header className="study-heading"><h2>{title}</h2><p>{description}</p></header>
  {presets.length>0&&<div className="study-experiments"><span>Try a comparison</span><div>{presets.map(preset=><button type="button" key={preset.label} aria-pressed={!!preset.active} title={preset.description} onClick={()=>{pause();preset.onSelect()}}>{preset.label}</button>)}</div>{onReset&&<button className="study-reset" type="button" onClick={()=>{pause();onReset()}}>Reset</button>}</div>}
  {equations[0]&&<div className="study-primary-equation"><span>{equations[0].label}</span><Equation equation={equations[0]}/></div>}
  <div className="study-workbench" ref={sceneRef}><div className="study-visual">{visual}</div><div className="study-controls">{controls}</div></div>
  {insight&&<div className="study-insight" data-tone={insight.tone||'neutral'}><strong>{insight.label}</strong><p>{insight.text}</p></div>}
  <dl className="study-metrics">{metrics.map((metric,i)=><div key={metric.label||i}><dt>{metric.label}</dt><dd>{metric.value}</dd>{metric.note&&<p>{metric.note}</p>}</div>)}</dl>
  {variables.length>0&&<dl className="study-variables" aria-label="Variables in this example">{variables.map(variable=><div key={variable.symbol}><dt>{variable.symbol}</dt><dd>{variable.meaning}{variable.value!==undefined&&<span>{variable.value}</span>}</dd></div>)}</dl>}
  <section className="study-equations" aria-label="Equations driving this example"><h3>Read the model</h3>{equations.map((equation,i)=><article key={equation.label||i}><h4>{equation.label}</h4><Equation equation={equation}/>{equation.explanation&&<p>{equation.explanation}</p>}</article>)}</section>
  {note&&<p className="study-assumption">{note}</p>}
 </section></PlaybackContext.Provider>;
}

export function Plot({series=[],xLabel='',yLabel='',xRange,yRange,cursorX}){
 const all=series.flatMap(s=>s.points).filter(p=>Number.isFinite(p[0])&&Number.isFinite(p[1]));
 const xs=xRange||[Math.min(0,...all.map(p=>p[0])),Math.max(1,...all.map(p=>p[0]))];
 const ys=yRange||[Math.min(0,...all.map(p=>p[1])),Math.max(1,...all.map(p=>p[1]))];
 const bounds=ys[1]===ys[0]?[ys[0]-1,ys[1]+1]:ys;
 const W=480,H=164,L=45,R=12,T=16,B=30;
 const px=x=>L+(x-xs[0])/(xs[1]-xs[0]||1)*(W-L-R),py=y=>H-B-(y-bounds[0])/(bounds[1]-bounds[0])*(H-T-B);
 const colors=['var(--library-ink)','#f60f30','#9a9890'];
 const short=n=>Math.abs(n)>=100?Number(n).toFixed(0):Number(n).toFixed(2).replace(/\.00$/,'');
 return <figure className="study-plot"><div className="study-plot-label"><span>{yLabel}</span><span>{xLabel}</span></div><svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${yLabel} versus ${xLabel}. ${series.map(s=>s.name).join(', ')}`}>
  {[0,.5,1].map(f=>{const v=bounds[0]+f*(bounds[1]-bounds[0]);return <g key={`y${f}`}><line x1={L} x2={W-R} y1={py(v)} y2={py(v)} stroke="var(--library-rule)"/><text x={L-7} y={py(v)+4} textAnchor="end">{short(v)}</text></g>})}
  {[0,.25,.5,.75,1].map(f=>{const v=xs[0]+f*(xs[1]-xs[0]);return <g key={`x${f}`}><line x1={px(v)} x2={px(v)} y1={T} y2={H-B} stroke="var(--library-rule)"/><text x={px(v)} y={H-9} textAnchor="middle">{short(v)}</text></g>})}
  {series.map((s,i)=><path key={s.name||i} d={s.points.map((p,j)=>`${j?'L':'M'}${px(p[0]).toFixed(3)},${py(p[1]).toFixed(3)}`).join(' ')} stroke={s.color||colors[i%colors.length]} fill="none" strokeWidth="1.7" vectorEffect="non-scaling-stroke"/>)}
  {Number.isFinite(cursorX)&&cursorX>=xs[0]&&cursorX<=xs[1]&&<line x1={px(cursorX)} x2={px(cursorX)} y1={T} y2={H-B} stroke="var(--library-brand-red)" strokeDasharray="4 3"/>}
 </svg><figcaption>{series.map((s,i)=><span key={s.name||i}><i style={{background:s.color||colors[i%colors.length]}}/>{s.name}</span>)}</figcaption></figure>;
}
