import React, {useId,useState} from 'react';

const ink='var(--library-ink)';
const paper='var(--library-bg)';
const wash='var(--library-wash)';
const rule='var(--library-rule)';
const red='var(--library-brand-red)';

function Diagram({children,label}){
 return <svg className="film-example-diagram" viewBox="0 0 320 150" role="img" aria-label={label} focusable="false" fill="none" stroke={ink} strokeLinejoin="round">{children}</svg>;
}

function Label({children,color=ink,...props}){
 return <text fill={color} stroke="none" fontSize="12" {...props}>{children}</text>;
}

function Arrow({x,y,to,color=ink}){
 const head=to>x?to-5:to+5;
 return <path d={`M${x} ${y}H${to}m${head-to} -4 ${to-head} 4 ${head-to} 4`} stroke={color} strokeWidth="1.5"/>;
}

function Cutout({pose}){
 const tilt=[-15,0,15][pose];
 return <g transform={`translate(${139+pose*21} ${72-pose*4}) rotate(${tilt})`} stroke="none">
  <path d="M-53 1-14-22 8-8 35-36 48-31 29-10 16 15-10 24-30 14Z" fill={ink} opacity=".18" transform="translate(3 4)"/>
  <path d="M-53 1-14-22 8-8 35-36 48-31 29-10 16 15-10 24-30 14Z" fill={red}/>
  <path d="m-53 1 39-23 22 14-24 10-14 12Z" fill={paper} opacity=".24"/>
  <path d="m-16 2 24-10 8 23-26 9Z" fill={ink} opacity=".18"/>
  <path d="m35-36 13 5-15 4Z" fill={paper}/>
  <circle cx="36" cy="-30" r="1.5" fill={ink}/>
 </g>;
}

const hold=3;
const frames=Array.from({length:9},(_,index)=>index+1);
const frameLabel=frame=>String(frame).padStart(2,'0');

function CadenceScene({frame,layered}){
 const pose=Math.floor((frame-1)/hold);
 const pan=layered?frame-1:pose*hold;
 return <Diagram label={`Paper pose ${'ABC'[pose]}. Camera position ${pan+1}.`}>
  <rect width="320" height="150" fill={wash} stroke="none"/>
  <g transform={`translate(${-pan*10} 0)`}>
   <path d="M0 103 50 73 85 87 176 49 208 79 243 68 290 89 356 54 405 83V150H0Z" fill={rule} stroke="none"/>
   <path d="M0 121 83 105 156 116 225 99 308 114 388 96 420 112V150H0Z" fill={paper} stroke="none"/>
   <path d="M176 50V108" stroke={ink} strokeWidth="1.4"/>
   <circle cx="176" cy="49" r="3" fill={ink} stroke="none"/>
   <Cutout pose={pose}/>
  </g>
  <path d="M176 16V118" stroke={ink} strokeDasharray="3 5" opacity=".55"/>
  <rect x="13" y="117" width="82" height="22" fill={ink} stroke="none"/>
  <Label x="21" y="132" color={paper} fontWeight="600">Paper study</Label>
 </Diagram>;
}

function ExamplePair({labels,captions,children,layout="paired"}){
 return <div className="film-example-pair" data-layout={layout}>
  {[false,true].map((after,index)=><figure key={labels[index]} className="film-example-variant" data-after={after||undefined}>
   <figcaption className="film-example-label"><span>{after?'After':'Before'}</span><strong>{labels[index]}</strong></figcaption>
   {children(after)}
   <p className="film-example-caption">{captions[index]}</p>
  </figure>)}
 </div>;
}

function CadenceExample({example,captions}){
 const [frame,setFrame]=useState(3);
 const frameId=useId();
 const poseAt=value=>Math.floor((value-1)/hold);
 const poseLabel=value=>'ABC'[poseAt(value)];
 const rows=[
  ['Paper pose',poseLabel],
  ['Before pan',value=>poseAt(value)*hold+1],
  ['After pan',value=>value],
 ];
 return <>
  <ExamplePair labels={example.labels} captions={captions} layout="cadence">
   {after=><CadenceScene frame={frame} layered={after}/>}
  </ExamplePair>
  <div className="film-example-scrubber">
   <div><label htmlFor={frameId}>Scrub both shots</label><span>Frame {frameLabel(frame)} / {frameLabel(frames.length)}</span></div>
   <input id={frameId} type="range" min={1} max={frames.length} value={frame} onChange={event=>setFrame(Number(event.target.value))} aria-valuetext={`Frame ${frame}, paper pose ${poseLabel(frame)}, before pan position ${poseAt(frame)*hold+1}, after pan position ${frame}`}/>
  </div>
  <table className="film-cadence-tracks">
   <caption>At 24 fps, a three-frame hold gives 8 cutout poses per second. Pan numbers mark camera positions.</caption>
   <thead><tr><th scope="col">Frame</th>{frames.map(value=><th key={value} scope="col" data-current={value===frame||undefined}>{frameLabel(value)}</th>)}</tr></thead>
   <tbody>{rows.map(([label,at],index)=><tr key={label} data-poses={index===0||undefined}><th scope="row">{label}</th>{frames.map(value=><td key={value} data-current={value===frame||undefined} data-group={index<2?poseAt(value)%2:undefined}>{at(value)}</td>)}</tr>)}</tbody>
  </table>
 </>;
}

function Flow({items,focus,after}){
 return <ol className="film-example-flow" aria-label="Shots in order">
  {items.map(([title,detail],index)=><li key={detail} data-focus={after&&(focus===undefined||index===focus)||undefined}>
   <span className="film-example-shot">{frameLabel(index+1)}</span>
   <strong>{title}</strong>
   <span>{detail}</span>
  </li>)}
 </ol>;
}

function Timeline({length,lanes,note}){
 const percent=value=>100*value/length;
 return <div className="film-example-timeline">
  <div className="film-timeline-scale" aria-hidden="true"><span>0 s</span><span>{length/2} s</span><span>{length} s</span></div>
  {lanes.map(({label,spans,marker,hits})=><div className="film-timeline-lane" key={label}>
   <span>{label}</span>
   <div className="film-timeline-track">
    {spans?.map(([start,end,name,style])=><span key={start} className="film-timeline-block" data-tone={style} style={{left:`${percent(start)}%`,width:`${percent(end-start)}%`}}>
     {name}<span className="sr-only">{` ${start} to ${end} seconds`}</span>
    </span>)}
    {marker!==undefined&&<span className="film-timeline-marker" style={{left:`${percent(marker)}%`}}><span className="sr-only">Cue at {marker} seconds</span></span>}
    {hits?.map(time=><span key={time} className="film-timeline-hit" style={{left:`${percent(time)}%`}}><span className="sr-only">Accent at {time} seconds</span></span>)}
   </div>
  </div>)}
  <p className="film-timeline-note">{note}</p>
 </div>;
}

function Transition({after}){
 return <Diagram label={after?"Card 42 stays visible in the list, handoff and detail frames.":"Card 42 disappears in the handoff. A different card appears in the detail frame."}>
  {[8,114,220].map((x,index)=><g key={x} transform={`translate(${x} 23)`}>
   <rect width="92" height="88" fill={paper} stroke={rule}/>
   <path d="M0 16H92M8 8h26" stroke={rule}/>
   {index===1&&!after?<g opacity=".35"><path d="M13 29h64M17 39h58M11 49h72M18 59h59M13 69h65" strokeWidth="3"/></g>:<>
    <path d={index===0?'M9 30h19m-19 11h19m-19 11h19':'M60 30h23m-23 11h19m-19 11h23'} stroke={rule} strokeWidth="3"/>
    <rect x={index===0?36:9} y={index===0?32:24} width={index===0?39:46} height={index===0?27:46} fill={wash} stroke={after||index===0?red:ink} strokeWidth="2"/>
    <Label x={index===0?44:18} y={index===0?50:51}>{after||index===0?'#42':'#18'}</Label>
   </>}
   <Label x="46" y="109" textAnchor="middle">{['List','Handoff','Detail'][index]}</Label>
  </g>)}
 </Diagram>;
}

function Velocity({after}){
 const points=after?[24,108,181,240,278,296]:[24,78,133,187,242,296];
 return <Diagram label={after?"Six equally timed positions. The distances between positions shrink toward the stop.":"Six equally timed positions with nearly equal distances between them, followed by a stop."}>
  <Label x="24" y="31">Start</Label><Label x="296" y="31" textAnchor="end">Stop</Label>
  <path d="M24 42V109M296 42V109M24 75H296" stroke={rule} strokeWidth="2"/>
  {points.map((x,index)=><g key={x}>
   <circle cx={x} cy="75" r="4.5" fill={index>3?red:paper} stroke={index>3?red:ink} strokeWidth="1.5"/>
   <Label x={x} y="96" textAnchor="middle">{index+1}</Label>
  </g>)}
  <path d={`M${points[4]} 108v7H296v-7`} stroke={red} strokeWidth="1.5"/>
  <Label x="296" y="136" textAnchor="end">Last frame of travel</Label>
 </Diagram>;
}

function Proof({after}){
 return <Diagram label={after?"A full-width frontal panel makes the changed line, cache enabled, legible.":"A presenter and graph compete with a smaller tilted cache settings panel."}>
  <rect x="8" y="9" width="304" height="132" fill={paper} stroke={rule}/>
  {!after&&<g fill={rule} stroke="none"><circle cx="81" cy="53" r="19"/><path d="M36 125v-15a45 36 0 0 1 90 0v15Z"/><path d="M185 108h15v17h-15zm21-9h15v26h-15zm21-12h15v38h-15zm21 8h15v30h-15zm21-19h15v49h-15z"/></g>}
  <g transform={after?'translate(26 26)':'translate(116 25) rotate(-9) scale(.67)'}>
   <rect width="267" height="96" fill={wash} stroke={rule}/>
   <Label x="15" y="23">Cache settings</Label>
   <path d="M0 33H267" stroke={rule}/>
   <rect x="12" y="47" width="243" height="33" fill={paper} stroke={red} strokeWidth="1.4"/>
   <Label x="23" y="68" fontFamily="monospace" fontSize="15">cache: enabled</Label>
  </g>
 </Diagram>;
}

function Depth({after}){
 return <Diagram label={after?"The task card moves about three times as far as the system panel, revealing more of the system.":"The task card and system panel shift the same distance, so the card still obscures the panel."}>
  <rect x="8" y="9" width="304" height="132" fill={paper} stroke={rule}/>
  <rect x={after?162:116} y="32" width="99" height="65" fill={wash} stroke={ink}/>
  <Label x={after?211:165} y="69" textAnchor="middle">System</Label>
  <rect x="60" y="45" width="105" height="54" fill={paper} stroke={red} strokeWidth="1.5"/>
  <Label x="112" y="75" textAnchor="middle">Task card</Label>
  <Arrow x={122} to={60} y={116} color={red}/>
  <Arrow x={after?183:178} to={after?162:116} y={128}/>
 </Diagram>;
}

function Look({after}){
 const id=useId();
 return <Diagram label={after?"A narrow highlight defines the object’s top edge. The nearby status reads ready.":"The object and status label are both obscured by a wide glow."}>
  <defs><filter id={id} x="0" y="0" width="1" height="1"><feGaussianBlur stdDeviation="2.6"/></filter></defs>
  <rect x="8" y="9" width="304" height="132" fill={ink} stroke="none"/>
  <path d="M44 65 103 36 173 63 114 92Z" fill={wash} fillOpacity={after?.2:.05} stroke="none"/>
  <path d="M44 65v40l70 22V92Zm70 27v35l59-29V63Z" fill={paper} fillOpacity={after?.08:.04} stroke="none"/>
  {after&&<path d="M44 65 103 36l70 27" stroke={paper} strokeWidth="1.6"/>}
  <g filter={after?undefined:`url(#${id})`}>
   <rect x="195" y="62" width="95" height="26" stroke={paper} strokeOpacity=".4"/>
   <Label x="207" y="79" color={paper}>Status: ready</Label>
  </g>
  {!after&&<ellipse cx="148" cy="82" rx="136" ry="42" fill={wash} opacity=".15" stroke="none" filter={`url(#${id})`}/>}
 </Diagram>;
}

const particlePositions=[
 [[15,13],[36,23],[64,16],[69,42],[48,53],[21,44]],
 [[12,34],[22,49],[43,12],[43,32],[57,39],[72,20]],
 [[14,22],[29,29],[36,50],[53,21],[61,53],[73,38]],
];

function Repeatable({after}){
 return <Diagram label={after?"All three ways of reaching frame 42 show the same particle arrangement.":"Three ways of reaching frame 42 give three different particle arrangements."}>
  {['In order','Direct seek','From later'].map((label,index)=><g key={label} transform={`translate(${12+index*102} 28)`}>
   <rect width="90" height="70" fill={paper} stroke={rule}/>
   {particlePositions[after?0:index].map(([x,y],particle)=><circle key={x+':'+y} cx={x} cy={y} r={particle===1?4:2.5} stroke="none" fill={particle===1?red:ink}/>)}
   <Label x="45" y="90" textAnchor="middle">{label}</Label>
   <Label x="45" y="106" textAnchor="middle" fontSize="10">Frame 42</Label>
  </g>)}
 </Diagram>;
}

function Delivery({after}){
 const crop=after?177:86;
 return <Diagram label={after?"The portrait crop includes the highlighted bar and its 42 millisecond label.":"The highlighted bar and its 42 millisecond label are outside the portrait crop."}>
  <rect x="8" y="9" width="304" height="132" fill={paper} stroke={rule}/>
  <g transform="translate(0 1)">
   <path d="M62 101H252M78 77h25v24H78zm45-14h25v38h-25zm45-17h25v55h-25zm45-13h25v68h-25z" fill={rule} stroke="none"/>
   <path d="M213 33h25v68h-25z" fill={red} stroke="none"/>
   <Label x="225" y="26" textAnchor="middle">42 ms</Label>
  </g>
  <path d={`M9 10H${crop}V140H9ZM${crop+72} 10H311V140H${crop+72}Z`} fill={wash} opacity=".82" stroke="none"/>
  <rect x={crop} y="11" width="72" height="128" stroke={ink} strokeDasharray="4 3" strokeWidth="1.5"/>
  <Label x={crop+36} y="128" textAnchor="middle">9:16 crop</Label>
 </Diagram>;
}

const illustrations={
 'learning-transition-anchor':Transition,
 'learning-motion-from-velocity':Velocity,
 'learning-proof-framing':Proof,
 'learning-depth-before-camera':Depth,
 'learning-build-the-look':Look,
 'learning-repeatable-frames':Repeatable,
 'learning-check-delivery':Delivery,
};

export function FilmLessonVisual({lesson,example}){
 const {flow,timeline}=example;
 const Illustration=illustrations[lesson.id];
 const captions=[lesson.example.before,lesson.example.after];
 return <section className="film-lesson-example" aria-labelledby="film-lesson-example-title">
  <h2 id="film-lesson-example-title">{example.title}</h2>
  <p className="film-example-cue">{example.cue}</p>
  {lesson.id==='learning-stepped-cadence'
   ?<CadenceExample example={example} captions={captions}/>
   :<ExamplePair labels={example.labels} captions={captions} layout={flow||timeline?"stacked":"paired"}>{after=>{
    const side=after?'after':'before';
    if(flow)return <Flow items={flow[side]} focus={flow.focus} after={after}/>;
    if(timeline)return <Timeline length={timeline.length} lanes={timeline[side]} note={timeline.notes[after?1:0]}/>;
    return <Illustration after={after}/>;
   }}</ExamplePair>}
 </section>;
}
