// Authored adaptation geometry, informed by the Berlickfold grid study.
// Spatial coordinates use a 4px unit and 16px rows; type has its own scale.
export function editorialLayout(availableWidth){
 const unit=4,pitch=16,width=Math.max(280,Math.floor(availableWidth/8)*8),mobile=width<=1000;
 const snap=n=>Math.round(n/unit)*unit,rows=n=>Math.ceil(n/pitch)*pitch;
 const gutter=16,columns=mobile?4:6;
 const panel=mobile?width:Math.round(width*.5069/8)*8;
 const column=Math.floor((panel-32-(columns-1)*gutter)/(columns*unit))*unit;
 const margin=(panel-columns*column-(columns-1)*gutter)/2;
 const span=n=>n*column+(n-1)*gutter,x=c=>margin+c*(column+gutter);
 const blocks={};let height;
 if(mobile){
  const titleSize=Math.min(64,Math.max(44,snap(width*.125))),titleLine=snap(titleSize*.94);
  const imageY=rows(128+titleLine*2+32),imageHeight=rows(span(3)*1128/1001);
  const copyY=imageY+imageHeight+32,copyWidth=Math.min(span(3),328),copyLine=22;
  // Reserve line boxes before layout so the next row never follows guessed ink bounds.
  const copyRows=Math.ceil(160/Math.floor(copyWidth/(16*.49)));
  const footerY=rows(copyY+copyRows*copyLine+32);
  height=footerY+48;
  Object.assign(blocks,{header:{x:margin,y:16,width:span(4)},title:{x:margin,y:128,width:span(4),fontSize:titleSize,lineHeight:titleLine},portrait:{x:x(0),y:imageY,width:span(1),height:rows(span(1)*382/306)},image:{x:x(1),y:imageY,width:span(3),height:imageHeight},copy:{x:x(1),y:copyY,width:copyWidth,fontSize:16,lineHeight:copyLine},year:{x:margin,y:footerY},next:{x:x(1),y:footerY,width:span(3)}});
 }else{
  height=Math.round(width*1128/2030/pitch)*pitch;
  const portraitHeight=rows(span(2)*382/306),portraitY=height-portraitHeight-16;
  Object.assign(blocks,{header:{x:margin,y:16,width:panel-2*margin},title:{x:margin,y:Math.round(width*.173/pitch)*pitch,width:span(5),fontSize:Math.round(width*88/2030*2)/2,lineHeight:snap(width*84/2030)},portrait:{x:margin,y:portraitY,width:span(2),height:portraitHeight},copy:{x:x(2),y:portraitY,width:span(2),fontSize:Math.max(12,Math.round(width*18/2030*2)/2),lineHeight:Math.max(20,snap(width*28/2030))},year:{x:x(2),y:height-32},next:{x:panel-margin-span(2),y:height-32,width:span(2)},image:{x:panel,y:0,width:width-panel,height}});
 }
 return {unit,pitch,width,height,mobile,columns,column,gutter,margin,panel,blocks};
}
