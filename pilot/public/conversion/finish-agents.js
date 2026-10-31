// Source-derived sections, isolated from the library and surrounding study styles.
window.conversionAgents = '<iframe data-conversion-agents title="Conversion agent examples" src="/conversion/agents.html" style="display:block;width:100%;height:1100px;border:0;background:#faf9f7" scrolling="no"></iframe>';
window.conversionContext = '<iframe data-conversion-context title="Conversion AI context layer" src="/conversion/context.html" style="display:block;width:100%;height:1100px;border:0;background:#faf9f7" scrolling="no"></iframe>';
window.addEventListener('message',function(event){
 if(event.origin!==location.origin||!['conversion-agents-height','conversion-context-height'].includes(event.data?.type))return;
 const name=event.data.type==='conversion-agents-height'?'agents':'context';
 const frame=document.querySelector('iframe[data-conversion-'+name+']');
 if(frame&&event.source===frame.contentWindow&&Number.isFinite(event.data.height))frame.style.height=Math.max(1,event.data.height)+'px';
});
