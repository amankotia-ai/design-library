/* One coordinate system drives the layout and its guides. All values are design pixels. */
(function(root){
'use strict';
function calculate(s,copy){
 const unit=Number(s.unit)||4,multiple=Number(s.rowMultiple)||8,pitch=unit*multiple;
 const snap=n=>Math.ceil(n/unit)*unit;
 const margin=Math.max(2*unit,Math.round(s.margin/unit)*unit),gutter=Math.max(unit,Math.round(s.gutter/unit)*unit),columns=Number(s.columns);
 const target=s.device==='desktop'?1152:384;
 const column=Math.max(4*unit,Math.floor((target-2*margin-(columns-1)*gutter)/(columns*unit))*unit);
 const width=2*margin+columns*column+(columns-1)*gutter;
 const spanWidth=n=>n*column+(n-1)*gutter;
 // Type is a separate scale from spatial modules. Reference-sized text stays compact
 // as columns change; only its line boxes snap to the structural unit.
 const desktop=s.device==='desktop',typeSnap=n=>Math.ceil(n/(unit/2))*(unit/2);
 const display=['split','campaign'].includes(s.preset),serif=s.font==='serif'||display;
 const project=s.preset==='project',reading=s.preset==='reading';
 const bodySize=typeSnap(project?(desktop?10:14):reading?14:s.preset==='rail'&&!desktop?10:s.font==='serif'?14:12);
 const bodyLine=snap(project?(desktop?16:20):reading?20:16);
 const bodyWeight=project?300:400;
 const titleSize=typeSnap(display?(desktop?52:40):s.preset==='index'?16:desktop?20:24);
 const titleLine=snap(display?(desktop?44:36):titleSize*1.15);
 const metaSize=typeSnap(desktop?8:10),metaLine=snap(desktop?12:16);
 const titleFamily=serif?'display':'sans',titleWeight=serif?200:500,titleStretch=serif?62.5:100;
 const captionRows=Math.max(1,Math.ceil((2*metaLine+unit)/pitch)),controlRows=Math.max(1,Math.ceil((metaLine+unit)/pitch));
 const blocks=[];
 function add(id,col,span,row,rows,type,extra={}){
  const block={id,col,span,row,rows,type,...extra};
  block.x=margin+(col-1)*(column+gutter);block.y=margin+row*pitch;
  block.width=spanWidth(span);block.height=rows*pitch;blocks.push(block);return block;
 }
 function textRows(text,span,font=bodySize,line=bodyLine){
  // A conservative character estimate reserves whole rows before rendering.
  const charsPerLine=Math.max(4,Math.floor(spanWidth(span)/(font*(s.font==='serif'?.49:.54))));
  return Math.max(1,Math.ceil((Math.ceil(text.length/charsPerLine)+1)*line/pitch));
 }
 const titleRowsFor=(span,text=copy.title)=>{const chars=Math.max(1,Math.floor(spanWidth(span)/(titleSize*(titleFamily==='display'?.42:.55))));const lines=text.split('<br>').reduce((sum,line)=>sum+Math.max(1,Math.ceil(line.length/chars)),0);const inkAllowance=titleFamily==='display'?Math.max(2*unit,titleSize/4):unit;return Math.max(1,Math.ceil((lines*titleLine+inkAllowance)/pitch));};
 const ratio={portrait:2/3,square:1,landscape:3/2}[s.ratio]||2/3;
 const photoRows=(span,r=ratio)=>Math.max(2,Math.ceil(spanWidth(span)/r/pitch));
 let end=0;
 // Text has its own grid measure; it does not inherit the width of its containing region.
 const textMeasure=available=>desktop?Math.min(available,Math.max(1,Math.floor((18*bodySize+gutter)/(column+gutter)))):available;
 add('header',1,columns,0,Math.max(1,Math.ceil((metaLine+2*unit)/pitch)),'header');
 const start=blocks[0].rows+1;
 if(s.preset==='editorial'){
  if(desktop){
   const left=Math.max(1,Math.floor(columns/3)),right=columns-left;
   const measure=textMeasure(left),titleRows=titleRowsFor(measure),copyRows=textRows(copy.description,measure);const imageRows=photoRows(right,3/2);
   add('title',1,measure,start+1,titleRows,'title');add('copy',1,measure,start+titleRows+2,copyRows,'copy');
   const imageHeight=Math.max(imageRows,titleRows+copyRows+2);
   add('main',left+1,right,start,imageHeight,'image');add('caption',left+1,right,start+imageHeight,captionRows,'caption');end=start+imageHeight+captionRows;
  }else{
   const offset=Math.min(Number(s.offset),columns-2),span=columns-offset,titleRows=titleRowsFor(span),copyRows=textRows(copy.description,span);
   add('title',offset+1,span,start,titleRows,'title');add('copy',offset+1,span,start+titleRows+1,copyRows,'copy');
   const imageStart=start+titleRows+copyRows+2,imageHeight=photoRows(span);
   add('main',offset+1,span,imageStart,imageHeight,'image');add('caption',offset+1,span,imageStart+imageHeight,captionRows,'caption');end=imageStart+imageHeight+captionRows;
  }
 }else if(s.preset==='product'){
  const imageSpan=desktop?Math.max(1,Math.floor(columns*.58)):columns,detailCol=desktop?imageSpan+1:1,detailSpan=desktop?columns-imageSpan:columns;
  const imageHeight=photoRows(imageSpan,desktop?1:ratio);add('main',1,imageSpan,start,imageHeight,'image');
  let r=desktop?start:start+imageHeight+1;
  const productTitleRows=Math.max(2,textRows(copy.name||'The everyday shirt',detailSpan)+1);add('product-title',detailCol,detailSpan,r,productTitleRows,'product-title');r+=productTitleRows;
  const measure=textMeasure(detailSpan),copyRows=textRows(copy.description,measure);add('copy',detailCol,measure,r,copyRows,'copy');r+=copyRows+1;
  add('material',detailCol,detailSpan,r,controlRows,'detail',{label:'Material & care'});r+=controlRows;add('fit',detailCol,detailSpan,r,controlRows,'detail',{label:'Size & fit'});r+=controlRows+1;
  add('sizes',detailCol,detailSpan,r,controlRows,'sizes');r+=controlRows+1;const actionRows=Math.max(1,Math.ceil((bodyLine+2*unit)/pitch));add('action',detailCol,detailSpan,r,actionRows,'action');
  end=Math.max(start+imageHeight,r+actionRows);
 }else if(s.preset==='index'){
  const titleRows=titleRowsFor(columns,'Selected<br>observations.');add('title',1,columns,start,titleRows,'index-title');
  const tiles=desktop?(columns>=12?4:2):2,tileSpan=Math.floor(columns/tiles),imageHeight=photoRows(tileSpan);
  let r=start+titleRows+1;
  for(let i=0;i<4;i++){
   const col=1+(i%tiles)*tileSpan,row=r+Math.floor(i/tiles)*(imageHeight+captionRows+1);
   add('tile-'+i,col,tileSpan,row,imageHeight,'tile',{index:i});add('tile-label-'+i,col,tileSpan,row+imageHeight,captionRows,'tile-caption',{index:i});
  }
  end=r+Math.ceil(4/tiles)*(imageHeight+captionRows+1)-1;
 }else if(s.preset==='split'){
  if(desktop){
   const rightCol=Math.floor(columns/2)+1,right=columns-rightCol+1,detailSpan=Math.max(1,Math.floor(columns/6)),titleSpan=Math.max(1,rightCol-detailSpan-1),titleRows=titleRowsFor(titleSpan);
   const measure=textMeasure(right),copyRows=textRows(copy.description,measure),hinge=start+copyRows+1;
   add('copy',rightCol,measure,start,copyRows,'copy');add('title',1,Math.max(1,titleSpan),hinge,titleRows,'title');
   const imageHeight=Math.max(titleRows+2,photoRows(right,1));
   add('main',rightCol,right,hinge,imageHeight,'image');add('detail-image',rightCol-detailSpan,detailSpan,hinge,Math.max(2,Math.ceil(imageHeight/2)),'detail-image');
   add('caption',rightCol,right,hinge+imageHeight,captionRows,'caption');end=hinge+imageHeight+captionRows;
  }else{
   const col=2,span=columns-1,titleRows=titleRowsFor(columns),copyRows=textRows(copy.description,span);
   add('title',1,columns,start,titleRows,'title');add('copy',col,span,start+titleRows+1,copyRows,'copy');
   const hinge=start+titleRows+copyRows+2,imageHeight=photoRows(span,3/4);
   add('main',col,span,hinge,imageHeight,'image');add('detail-image',1,1,hinge,Math.max(2,Math.ceil(imageHeight/2)),'detail-image');
   add('caption',1,columns,hinge+imageHeight,captionRows,'caption');end=hinge+imageHeight+captionRows;
  }
 }else if(s.preset==='reading'){
  // Studies 09/11: one empty column, a three-column paragraph, then a matching image.
  const span=columns-1,col=Math.min(Number(s.offset)||0,1)+1;
  const copyStart=blocks[0].rows+2,copyRows=textRows(copy.studyDescription||copy.description,span);
  add('reading-copy',col,span,copyStart,copyRows,'study-copy');
  const imageStart=copyStart+copyRows+4,imageHeight=photoRows(span,3/4);
  add('reading-image',col,span,imageStart,imageHeight,'image');
  end=imageStart+imageHeight;
 }else if(s.preset==='project'){
  // Study 16: 3/5/4 desktop columns become a 3/1 photo pair above a 3-column text rail.
  // The two photographs share a row height; their boxes never stretch their pixels.
  const informationSpan=desktop?Math.max(2,Math.floor(columns/(s.cropStudy?3:4))):columns-1;
  // Reserve an actual empty track between the information rail and the photographs.
  // Text and metadata may never consume that separation, even when type settings change.
  const textSpan=desktop?Math.min(textMeasure(informationSpan),informationSpan-1):informationSpan;
  const photoCol=desktop?informationSpan+1:1,photoSpan=desktop?columns-informationSpan:columns;
  const firstSpan=desktop?(s.cropStudy?Math.floor(photoSpan/2):Math.min(photoSpan-1,Math.max(1,Math.round(columns*5/12)))):columns-1;
  const copyRows=textRows(copy.description,textSpan),dataRows=Math.ceil(4*(metaLine+4*unit)/pitch);
  const imageStart=blocks[0].rows+(s.cropStudy?Math.ceil(spanWidth(columns)*.12/pitch):0);
  const imageHeight=s.cropStudy?photoRows(firstSpan):Math.max(Math.ceil(spanWidth(columns)*(desktop?.53:.96)/pitch),desktop?copyRows+dataRows+1:1);
  const secondHeight=s.cropStudy?photoRows(photoSpan-firstSpan,3/2):imageHeight;
  add('project-main',photoCol,firstSpan,imageStart,imageHeight,'project-photo',{position:'center'});
  add('project-detail',photoCol+firstSpan,photoSpan-firstSpan,imageStart,secondHeight,'project-photo',{position:'75% center'});
  const copyStart=desktop?(s.cropStudy?imageStart:imageStart+imageHeight-copyRows-dataRows-1):imageStart+imageHeight+1;
  add('project-copy',1,textSpan,copyStart,copyRows,'copy');
  add('project-data',1,textSpan,copyStart+copyRows+1,dataRows,'project-data');
  end=Math.max(imageStart+imageHeight,imageStart+secondHeight,copyStart+copyRows+1+dataRows);
  // Crop comparisons reserve the portrait frame, so text and the second photograph stay put.
  if(s.cropStudy)end=Math.max(end,imageStart+photoRows(firstSpan,2/3));
 }else if(s.preset==='rail'){
  const left=desktop?Math.max(1,Math.floor(columns*2/3)):Math.max(1,Math.floor(columns/2)),right=columns-left;
  const r=start+1;
  if(desktop){
   const tileSpan=Math.max(1,Math.floor(left/3)),imageHeight=photoRows(tileSpan);
   for(let i=0;i<Math.min(3,left);i++)add('rail-'+i,1+i*tileSpan,tileSpan,r,imageHeight,'tile',{index:i});end=r+imageHeight;
  }else{
   const imageHeight=photoRows(left);for(let i=0;i<3;i++)add('rail-'+i,1,left,r+i*(imageHeight+1),imageHeight,'tile',{index:i});end=r+3*(imageHeight+1)-1;
  }
  const chars=Math.max(4,Math.floor(spanWidth(right)/(bodySize*.62))),metaChars=Math.max(4,Math.floor(spanWidth(right)/(metaSize*.62)));
  const labelHeight=metaLine+4*unit,itemsHeight=['The everyday shirt','The linen study','The coastal journal'].reduce((sum,text)=>sum+Math.ceil(text.length/chars)*bodyLine+2*unit,0);
  const noteHeight=2*unit+Math.ceil(46/metaChars)*metaLine;const indexHeight=Math.max(4,Math.ceil((labelHeight+itemsHeight+noteHeight)/pitch));
  add('text-index',left+1,right,r,indexHeight,'text-index');end=Math.max(end,r+indexHeight);
 }else if(s.preset==='campaign'){
  const titleRows=titleRowsFor(columns);const imageHeight=desktop?Math.max(8,Math.ceil(spanWidth(columns)/(16/9)/pitch)):Math.max(12,photoRows(columns,2/3));
  add('main',1,columns,start,imageHeight,'image');add('campaign-title',1,columns,start+imageHeight-titleRows-1,titleRows,'campaign-title');
  add('caption',1,columns,start+imageHeight,captionRows,'caption');end=start+imageHeight+captionRows;
 }
 const footerRows=Math.max(1,Math.ceil((metaLine+2*unit)/pitch));if(s.preset!=='project')add('footer',1,columns,end+1,footerRows,'footer');
 const rowCount=s.preset==='project'?end:end+1+footerRows,height=2*margin+rowCount*pitch;
 return {unit,multiple,pitch,margin,gutter,columns,column,width,height,rowCount,bodySize,bodyLine,bodyWeight,titleSize,titleLine,titleFamily,titleWeight,titleStretch,metaSize,metaLine,blocks};
}
const api={calculate};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.GridMath=api;
})(typeof globalThis!=='undefined'?globalThis:this);
