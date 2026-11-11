// Time is seconds, frequency Hz, rate source-seconds per program-second.
const number=(value,name)=>{if(typeof value!=='number'||!Number.isFinite(value))throw new TypeError(`${name} must be finite`);return value;};
const positive=(value,name)=>{number(value,name);if(value<=0)throw new RangeError(`${name} must be positive`);return value;};
const nonnegative=(value,name)=>{number(value,name);if(value<0)throw new RangeError(`${name} must be nonnegative`);return value;};
export function mapSourceTime(sourceTime,{sourceStart=0,programStart=0,rate=1}={}){number(sourceTime,'sourceTime');number(sourceStart,'sourceStart');number(programStart,'programStart');positive(rate,'rate');return number(programStart+(sourceTime-sourceStart)/rate,'Mapped time');}
export function mapSourceInterval({wordStart,wordEnd,sourceStart,sourceEnd,programStart=0,rate=1}){
 [wordStart,wordEnd,sourceStart,sourceEnd].forEach((v,i)=>number(v,['wordStart','wordEnd','sourceStart','sourceEnd'][i]));
 positive(rate,'rate');number(programStart,'programStart');if(wordEnd<=wordStart||sourceEnd<=sourceStart)throw new RangeError('Intervals must have positive duration');
 const start=Math.max(wordStart,sourceStart),end=Math.min(wordEnd,sourceEnd);if(end<=start)return null;
 return {sourceStart:start,sourceEnd:end,programStart:mapSourceTime(start,{sourceStart,programStart,rate}),programEnd:mapSourceTime(end,{sourceStart,programStart,rate}),complete:wordStart>=sourceStart&&wordEnd<=sourceEnd};
}
export function resolveSpeechTiming({sourceStart=2.2,sourceEnd=8,programStart=.5,rate=1,wordStart=4.2,wordEnd=4.65,pictureTime=2.7,fps=30}={}){
 positive(fps,'fps');nonnegative(pictureTime,'pictureTime');
 const word=mapSourceInterval({wordStart,wordEnd,sourceStart,sourceEnd,programStart,rate});
 const anchorRetained=wordStart>=sourceStart&&wordStart<sourceEnd;
 const anchor=anchorRetained?mapSourceTime(wordStart,{sourceStart,programStart,rate}):null;
 const frame=Math.round(pictureTime*fps),picture=frame/fps;
 return {word,anchor,anchorRetained,frame,picture,rounding:picture-pictureTime,offset:anchor===null?null:picture-anchor,programEnd:mapSourceTime(sourceEnd,{sourceStart,programStart,rate})};
}
export function countWords(text){return String(text).match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)?.length||0;}
export function evaluateReadingOpportunity({text='',visibleStart=0,visibleEnd=6,stableStart=.8,stableEnd=5.5,reaction=.4,wordsPerSecond=3}={}){
 [visibleStart,visibleEnd,stableStart,stableEnd].forEach((v,i)=>number(v,['visibleStart','visibleEnd','stableStart','stableEnd'][i]));
 if(visibleEnd<visibleStart||stableEnd<stableStart)throw new RangeError('Interval end must not precede start');nonnegative(reaction,'reaction');positive(wordsPerSecond,'wordsPerSecond');
 const start=Math.max(visibleStart,stableStart),end=Math.min(visibleEnd,stableEnd),opportunity=Math.max(0,end-start),words=countWords(text),requirement=words===0?0:reaction+words/wordsPerSecond;
 return {words,start,end,opportunity,requirement,margin:opportunity-requirement};
}
export function dbToAmplitude(db){number(db,'db');const value=10**(db/20);if(!Number.isFinite(value))throw new RangeError('Amplitude is too large');return value;}
export function mixSines(time,{gainDbA=-6,gainDbB=-6,frequencyA=80,frequencyB=120,phase=0}={}){
 number(time,'time');nonnegative(frequencyA,'frequencyA');nonnegative(frequencyB,'frequencyB');number(phase,'phase');
 const a=dbToAmplitude(gainDbA),b=dbToAmplitude(gainDbB),raw=number(a*Math.sin(2*Math.PI*frequencyA*time)+b*Math.sin(2*Math.PI*frequencyB*time+phase),'Mixed amplitude');
 return {raw,clipped:Math.max(-1,Math.min(1,raw)),a,b};
}
const sinc=x=>Math.abs(x)<1e-8?1-x*x/6:Math.sin(x)/x;
const cosMean=(omega,phase,T)=>Math.cos(phase+omega*T/2)*sinc(omega*T/2);
export function evaluateMix({gainDbA=-6,gainDbB=-6,frequencyA=80,frequencyB=120,phase=0,duration=.05,samples=401}={}){
 positive(duration,'duration');if(!Number.isInteger(samples)||samples<2||samples>100000)throw new RangeError('samples must be an integer from 2 to 100000');
 const options={gainDbA,gainDbB,frequencyA,frequencyB,phase};const {a,b}=mixSines(0,options);const wa=2*Math.PI*frequencyA,wb=2*Math.PI*frequencyB;
 const meanSquare=a*a*.5*(1-cosMean(2*wa,0,duration))+b*b*.5*(1-cosMean(2*wb,2*phase,duration))+a*b*(cosMean(wa-wb,-phase,duration)-cosMean(wa+wb,phase,duration));
 number(meanSquare,'Mean square');number(a+b,'Amplitude bound');
 const points=Array.from({length:samples},(_,i)=>{const time=i*duration/(samples-1);return {time,...mixSines(time,options)};});
 return {a,b,bound:a+b,rms:Math.sqrt(Math.max(0,meanSquare)),sampledPeak:Math.max(...points.map(p=>Math.abs(p.raw))),clippedSamples:points.filter(p=>Math.abs(p.raw)>1).length,samples,points,duration};
}
export function aliasFrequency(frequency,sampleRate){number(frequency,'frequency');positive(sampleRate,'sampleRate');return number(frequency-sampleRate*Math.round(frequency/sampleRate),'Alias frequency');}
export function evaluateSampling({frequency=29,sampleRate=24,time=.4,duration=1}={}){
 number(frequency,'frequency');positive(sampleRate,'sampleRate');nonnegative(time,'time');positive(duration,'duration');if(time>duration)throw new RangeError('Playhead must lie within duration');if(sampleRate*duration>10000)throw new RangeError('Too many samples');
 const alias=aliasFrequency(frequency,sampleRate),frame=Math.floor(time*sampleRate+1e-10),sampleTime=frame/sampleRate;
 const position=t=>number(Math.sin(2*Math.PI*frequency*t),'Sample position'),aliased=t=>number(Math.sin(2*Math.PI*alias*t),'Aliased position');
 const samples=Array.from({length:Math.floor(duration*sampleRate+1e-10)+1},(_,i)=>({time:i/sampleRate,value:position(i/sampleRate)}));
 return {alias,frame,sampleTime,position:position(time),aliasedPosition:aliased(time),samplePosition:position(sampleTime),sampleAgreementError:Math.abs(position(sampleTime)-aliased(sampleTime)),samples,nyquist:sampleRate/2,aboveNyquist:Math.abs(frequency)>sampleRate/2,atNyquist:Math.abs(Math.abs(alias)-sampleRate/2)<1e-10};
}
