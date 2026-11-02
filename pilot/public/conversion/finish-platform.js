// Source-derived platform section, isolated to protect the library's styles.
window.conversionPlatform = '<iframe data-conversion-platform title="Conversion platform features" src="../conversion/platform.html" style="display:block;width:100%;height:1721px;border:0;background:#faf9f7" scrolling="no"></iframe>';
window.addEventListener('message', function(event){
 if(event.origin!==location.origin||event.data?.type!=='conversion-platform-height') return;
 const frame=document.querySelector('iframe[data-conversion-platform]');
 if(frame&&event.source===frame.contentWindow&&Number.isFinite(event.data.height))frame.style.height=Math.max(1,event.data.height)+'px';
});
