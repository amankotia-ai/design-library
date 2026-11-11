import React from 'react';

// Authored concept illustrations, separate from lesson content and shared tokens.
const ACCENT = 'var(--library-brand-red)', PAPER = 'var(--library-bg)', WASH = 'var(--library-wash)';

function Document({x, y, accent = false, complete = false}) {
 return <g transform={`translate(${x} ${y})`}>
  <path d="M0 0H39L54 15V70H0Z" fill={PAPER}/><path d="M39 0V15H54"/>
  <path d="M11 34H41M11 43H35M11 52H29" opacity=".25"/>
  <path d="M11 18H25" stroke={accent ? ACCENT : 'currentColor'} strokeWidth="3"/>
  {complete&&<g stroke={ACCENT}><circle cx="47" cy="65" r="12" fill={PAPER}/><path d="m41 65 4 4 8-9"/></g>}
 </g>;
}

function Arrow({x1, y1, x2, y2, muted = false}) {
 const angle = Math.atan2(y2-y1, x2-x1)*180/Math.PI;
 return <g opacity={muted ? .25 : .55}><path d={`M${x1} ${y1}L${x2} ${y2}`}/><path d="m-6-4 6 4-6 4" transform={`translate(${x2} ${y2}) rotate(${angle})`}/></g>;
}

function Panel({x, y, width = 100, height = 70, children}) {
 return <g transform={`translate(${x} ${y})`}><rect width={width} height={height} fill={PAPER}/><path d={`M0 14H${width}`} opacity=".2"/><circle cx="8" cy="7" r="1" fill="currentColor" stroke="none"/>{children}</g>;
}

function Scene({children}) {
 return <svg viewBox="0 0 400 225" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{children}</svg>;
}

export function LessonThumbnail({lessonId}) {
 if(lessonId==='learning-one-case') return <Scene>
  <path d="M47 163H352" opacity=".13"/>
  <Document x={54} y={76} accent/><Document x={173} y={76} accent/><Document x={292} y={76} accent complete/>
  <Arrow x1={121} y1={111} x2={158} y2={111}/><Arrow x1={240} y1={111} x2={277} y2={111}/>
  {[81,200,319].map((x,i)=><g key={x}><circle cx={x} cy="163" r="3" fill={i===2?ACCENT:PAPER} stroke={i===2?ACCENT:'currentColor'}/><path d={`M${x} 153V149`} opacity=".2"/></g>)}
 </Scene>;
 if(lessonId==='learning-mechanism-before-metric') return <Scene>
  <path d="M48 82H91V143H48Z" fill={PAPER}/><path d="M60 98H78M60 108H72M60 118H78" opacity=".3"/>
  <Arrow x1={103} y1={112} x2={137} y2={112}/>
  <path d="m200 62 43 25v50l-43 25-43-25V87Z" fill={PAPER}/><path d="m157 87 43 25 43-25M200 112v50" opacity=".3"/>
  <path d="m182 106 13 13 23-27" stroke={ACCENT} strokeWidth="3"/>
  <Arrow x1={257} y1={112} x2={291} y2={112}/>
  <path d="M305 143V97h14v46m10 0V81h14v62" fill={PAPER}/><path d="M299 143H350"/>
 </Scene>;
 if(lessonId==='learning-return-with-change') return <Scene>
  <path d="M106 72C141 33 260 33 294 72M294 153C260 191 140 191 106 153" opacity=".3"/>
  <path d="m286 68 9 5-1-10M114 157l-9-5 1 10" opacity=".5"/>
  <circle cx="99" cy="112" r="32" fill={PAPER}/><circle cx="301" cy="112" r="32" fill={PAPER}/>
  <path d="m84 126 10-26 13 23 8-12M286 126l10-26 13 23 8-12" stroke={ACCENT} strokeWidth="2.5"/>
  <path d="m88 91 5-8m10 7 3-9" opacity=".3"/>
  <circle cx="321" cy="87" r="12" fill={PAPER} stroke={ACCENT}/><path d="m315 87 4 4 8-9" stroke={ACCENT}/>
 </Scene>;
 if(lessonId==='learning-transition-anchor') return <Scene>
  <Panel x={40} y={60} width={130} height={104}><path d="M15 30H53M15 39H42" opacity=".2"/><rect x="44" y="48" width="32" height="32" fill={ACCENT} stroke={ACCENT}/></Panel>
  <Panel x={230} y={60} width={130} height={104}><path d="M90 32H114M90 41H106M90 50H114" opacity=".2"/><rect x="34" y="38" width="52" height="52" fill={ACCENT} stroke={ACCENT}/></Panel>
  <path d="M122 124H261" stroke={ACCENT} strokeDasharray="3 6" opacity=".5"/>
  <Arrow x1={183} y1={95} x2={217} y2={95}/>
 </Scene>;
 if(lessonId==='learning-motion-from-velocity') return <Scene>
  <path d="M55 47V173H350M55 132H350M55 90H350" opacity=".12"/>
  <path d="M64 153C153 153 157 71 250 71H337" stroke={ACCENT} strokeWidth="2.5"/>
  {[[64,153],[122,139],[179,95],[236,72],[280,71],[312,71]].map(([x,y],i)=><circle key={x} cx={x} cy={y} r="4" fill={PAPER} stroke={i>3?ACCENT:'currentColor'} opacity={.25+i*.12}/>)}
  <rect x="329" y="63" width="16" height="16" fill={ACCENT} stroke={ACCENT}/>
  <path d="M337 87V164" strokeDasharray="3 5" opacity=".25"/>
 </Scene>;
 if(lessonId==='learning-stepped-cadence') return <Scene>
  {[[84,-16],[200,0],[316,16]].map(([x,angle],i)=><g key={x} transform={`translate(${x} 103) rotate(${angle})`}>
   <path d="M-24-32H12L25-19V30H-25V-23Z" fill={i===2?ACCENT:PAPER} stroke={i===2?ACCENT:'currentColor'}/>
   <path d="m-10-3 8 8 15-17" stroke={i===2?PAPER:'currentColor'}/>
  </g>)}
  <path d="M49 174H119V166H235V158H350" opacity=".35"/>
  {[84,200,316].map(x=><path key={x} d={`M${x} 181V187`} opacity=".3"/>)}
 </Scene>;
 if(lessonId==='learning-proof-framing') return <Scene>
  <g transform="rotate(-9 99 112)"><Panel x={43} y={67} width={111} height={88}><path d="M12 29h31v20H12zM54 29H98M54 38H85M12 65H97M12 74H65" opacity=".3"/></Panel></g>
  <path d="m52 51-9-8m-8 66H25m131 58 8 7" opacity=".2"/>
  <Arrow x1={173} y1={112} x2={209} y2={112}/>
  <Panel x={230} y={52} width={126} height={120}><rect x="17" y="33" width="92" height="64" fill={WASH} stroke={ACCENT}/><path d="M31 48H93M31 59H84M31 70H94" opacity=".3"/><path d="M31 84H69" stroke={ACCENT} strokeWidth="3"/></Panel>
 </Scene>;
 if(lessonId==='learning-depth-before-camera') return <Scene>
  <path d="m156 49 148 13v104l-148-13Z" fill={PAPER} opacity=".35"/>
  <path d="m127 69 142 17v104l-142-17Z" fill={PAPER}/>
  <path d="m177 101 46 6v50l-46-6Z" fill={ACCENT} stroke={ACCENT}/>
  <path d="m96 94 137 19v85L96 179Z" fill={PAPER} fillOpacity=".3"/>
  <path d="m96 94 60-45m77 64 71-51M233 198l71-32" opacity=".2" strokeDasharray="3 5"/>
  <g transform="translate(45 133)"><rect width="29" height="22" fill={PAPER}/><path d="m29 7 12-6v20l-12-6Z" fill={PAPER}/><circle cx="9" cy="-7" r="7"/><circle cx="23" cy="-7" r="7"/></g>
  <Arrow x1={42} y1={179} x2={75} y2={179}/>
 </Scene>;
 if(lessonId==='learning-whole-cut-first') return <Scene>
  <path d="M34 66H366V154H34Z" fill={PAPER}/>
  {[43,67,91,115,139,163,187,211,235,259,283,307,331,355].map(x=><g key={x} opacity=".3"><path d={`M${x} 72v5m0 66v5`}/></g>)}
  {[45,125,205,285].map((x,i)=><g key={x}><rect x={x} y="85" width="69" height="50" fill={i===1?WASH:PAPER} stroke={i===1?ACCENT:'currentColor'}/>{i===1?<path d={`m${x+18} 111 11 10 23-27`} stroke={ACCENT}/>:<><circle cx={x+23} cy="102" r="7" opacity=".3"/><path d={`M${x+8} 128l19-15 12 8 12-19 11 26`} opacity=".3"/></>}</g>)}
  <path d="M48 174H352" opacity=".2"/><path d="m159 167 5 7-5 7" stroke={ACCENT}/>
 </Scene>;
 if(lessonId==='learning-speech-anchors') return <Scene>
  <Panel x={159} y={43} width={94} height={65}><path d="m30 42 10 9 23-24" stroke={ACCENT} strokeWidth="2.5"/></Panel>
  <path d="M43 157H357" opacity=".15"/>
  {Array.from({length:45},(_,i)=>{const h=5+Math.abs(Math.sin(i*1.9)*Math.cos(i*.45))*24;return <path key={i} d={`M${46+i*7} ${157-h}v${h*2}`} opacity={i>19&&i<27?.9:.25} stroke={i>19&&i<27?ACCENT:'currentColor'}/>;})}
  <path d="M206 108V192" stroke={ACCENT} strokeDasharray="3 5"/><circle cx="206" cy="116" r="3" fill={ACCENT} stroke={ACCENT}/>
 </Scene>;
 if(lessonId==='learning-readable-hold') return <Scene>
  <g opacity=".2"><rect x="52" y="65" width="80" height="82" fill={PAPER}/><path d="M65 85H102M65 96H119M65 107H112"/></g>
  <Arrow x1={145} y1={107} x2={178} y2={107}/>
  <Panel x={198} y={48} width={143} height={101}><path d="M22 37H120M22 49H104M22 61H115" opacity=".35"/><path d="M22 79H78" stroke={ACCENT} strokeWidth="3"/></Panel>
  <path d="M52 180H341" opacity=".2"/><path d="M198 171v18m0-9h143m0-9v18" stroke={ACCENT}/><path d="M198 158v7M341 158v7" opacity=".3"/>
 </Scene>;
 if(lessonId==='learning-purposeful-broll') return <Scene>
  <path d="M45 71H157M45 84H140M45 121H153M45 134H124" opacity=".25"/>
  <path d="M45 102H150" stroke={ACCENT} strokeWidth="3"/>
  <path d="M164 102h33v11h27" stroke={ACCENT}/><path d="m218 109 6 4-6 4" stroke={ACCENT}/>
  <Panel x={238} y={57} width={117} height={109}><circle cx="41" cy="53" r="17" fill={WASH}/><path d="m71 72 10 10 18-23" stroke={ACCENT} strokeWidth="2.5"/><path d="M253 190H337" transform="translate(-238 -57)" opacity=".2"/></Panel>
 </Scene>;
 if(lessonId==='learning-selective-sound-cues') return <Scene>
  <path d="M43 126H357" opacity=".25"/>
  <path d="M73 126v-12m7 24V94m7 51V77m7 61v-44m7 32v-12M265 126v-12m7 24V94m7 51V77m7 61v-44m7 32v-12" stroke={ACCENT} strokeWidth="2"/>
  <path d="M130 167H237M130 162v10m107-10v10" opacity=".25"/>
  <circle cx="87" cy="51" r="3" fill={ACCENT} stroke={ACCENT}/><circle cx="279" cy="51" r="3" fill={ACCENT} stroke={ACCENT}/>
 </Scene>;
 if(lessonId==='learning-build-the-look') return <Scene>
  <path d="m108 66 45 29-17 25-45-30Z" fill={PAPER}/><path d="m94 77-12 18m21-12-12 18" opacity=".3"/>
  <path d="m145 103 63-24m-63 24 40 71" opacity=".25" strokeDasharray="3 5"/>
  <path d="m209 78 80 24v70l-80-24Z" fill="currentColor" fillOpacity=".08"/><path d="m209 78 44-19 80 24-44 19m0 0 44-19v70l-44 19" fill={PAPER}/>
  <path d="M209 148V78l44-19" stroke={ACCENT} strokeWidth="3"/>
  <path d="M181 186H351" opacity=".17"/>
 </Scene>;
 if(lessonId==='learning-repeatable-frames') return <Scene>
  {[52,155,258].map((x,i)=><Panel key={x} x={x} y={70} width={90} height={80}><circle cx="45" cy="46" r="17" stroke={ACCENT}/><path d="m37 46 6 6 12-13" stroke={ACCENT}/></Panel>)}
  <path d="M97 58V42h206v16m-110 0V42M97 161v21h206v-21" opacity=".3"/>
  <path d="m91 53 6 5 6-5m97 0-6 5-6-5m109 0 6 5 6-5m0 113-6-5-6 5" opacity=".5"/>
 </Scene>;
 if(lessonId==='learning-check-delivery') return <Scene>
  <Panel x={43} y={54} width={211} height={124}><path d="M20 37H76M20 48H64" opacity=".3"/><rect x="20" y="64" width="100" height="40" stroke={ACCENT}/><path d="M32 78H102M32 89H88" stroke={ACCENT}/></Panel>
  <path d="M121 178v13m-29 0h58" opacity=".4"/>
  <rect x="286" y="39" width="72" height="151" rx="5" fill={PAPER}/><path d="M310 49h24M314 180h16" opacity=".3"/>
  <path d="M299 74H343M299 84H333" opacity=".3"/><rect x="298" y="103" width="48" height="44" stroke={ACCENT}/><path d="M306 117H338M306 128H330" stroke={ACCENT}/>
  <Arrow x1={260} y1={125} x2={280} y2={125}/>
 </Scene>;
 return null;
}
