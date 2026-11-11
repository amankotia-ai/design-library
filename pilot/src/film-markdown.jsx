import React from 'react';
import {filmEntries} from './film-data';
import {withBase} from './base';
const entryUrl=id=>withBase(`/?panel=film&entry=${encodeURIComponent(id)}`);
export const plain=text=>String(text||'').replace(/[`*_]/g,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1');
const slug=text=>plain(text).toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu,'').trim().replace(/\s+/g,'-');

export function documentParts(body=''){
 const lines=String(body).replace(/\r\n/g,'\n').replace(/^---\n[\s\S]*?\n---\n/,'').split('\n');
 const blocks=[];let i=0;let headingIndex=0;
 const special=line=>/^\s*(?:#{1,6}\s|```|~~~|>\s?|[-*+]\s|\d+\.\s|---\s*$|\|)/.test(line);
 while(i<lines.length){
  const line=lines[i];
  if(!line.trim()){i++;continue;}
  const fence=line.match(/^\s*(```+|~~~+)\s*(.*)$/);
  if(fence){const content=[];i++;while(i<lines.length&&!lines[i].trim().startsWith(fence[1]))content.push(lines[i++]);i++;blocks.push({type:'code',language:fence[2],text:content.join('\n')});continue;}
  const heading=line.match(/^(#{1,6})\s+(.+?)\s*#*$/);
  if(heading){blocks.push({type:'heading',level:heading[1].length,text:heading[2],id:`film-heading-${headingIndex++}`,slug:slug(heading[2])});i++;continue;}
  if(/^\s*([-*_])(?:\s*\1){2,}\s*$/.test(line)){blocks.push({type:'rule'});i++;continue;}
  if(line.includes('|')&&/^\s*\|?\s*:?-+:?\s*\|/.test(lines[i+1]||'')){
   const cells=row=>row.trim().replace(/^\|/,'').replace(/\|$/,'').split(/(?<!\\)\|/).map(cell=>cell.trim().replace(/\\\|/g,'|'));
   const header=cells(line);i+=2;const rows=[];
   while(i<lines.length&&lines[i].trim()&&lines[i].includes('|'))rows.push(cells(lines[i++]));
   blocks.push({type:'table',header,rows});continue;
  }
  if(/^\s*>/.test(line)){const text=[];while(i<lines.length&&/^\s*>/.test(lines[i]))text.push(lines[i++].replace(/^\s*>\s?/,''));blocks.push({type:'quote',text:text.join('\n')});continue;}
  if(/^\s*(?:[-*+]\s|\d+\.\s)/.test(line)){
   const items=[];const ordered=/^\s*\d+\./.test(line);const start=ordered?Number(line.match(/^\s*(\d+)\./)[1]):undefined;
   while(i<lines.length&&/^\s*(?:[-*+]\s|\d+\.\s)/.test(lines[i])&&/^\s*\d+\./.test(lines[i])===ordered){
    const match=lines[i++].match(/^(\s*)(?:[-*+]|\d+\.)\s+(.+)$/);items.push({text:match[2],indent:Math.min(3,Math.floor(match[1].length/2))});
   }
   blocks.push({type:'list',ordered,start,items});continue;
  }
  const text=[line];i++;
  while(i<lines.length&&lines[i].trim()&&!special(lines[i])&&!(lines[i].includes('|')&&/^\s*\|?\s*:?-+:?\s*\|/.test(lines[i+1]||'')))text.push(lines[i++]);
  blocks.push({type:'paragraph',text:text.join('\n')});
 }
 return blocks;
}

function normalizePath(value){const pieces=[];for(const piece of value.split('/')){if(piece==='..')pieces.pop();else if(piece&&piece!=='.')pieces.push(piece);}return pieces.join('/');}
function resolveLink(href,entry,blocks){
 if(/^https?:\/\//i.test(href))return {href,external:true};
 if(href.startsWith('#')){const target=blocks.find(b=>b.type==='heading'&&b.slug===href.slice(1));return target?{href:`#${target.id}`}:{href};}
 if(/^[a-z][a-z\d+.-]*:/i.test(href)||href.startsWith('//'))return null;
 const path=href.split('#')[0].split('?')[0];
 const directory=String(entry.sourcePath||'').split('/').slice(0,-1).join('/');
 const targetPath=normalizePath(path.startsWith('/')?path:`${directory}/${path}`);
 const target=filmEntries.find(item=>normalizePath(item.sourcePath||'')===targetPath);
 return target?{href:entryUrl(target.id)}:null;
}
function Inline({text,entry,blocks}){
 const pattern=/(`[^`\n]+`|!?\[[^\]]+\]\([^\s)]+(?:\s+"[^"]*")?\)|\*\*[^*]+\*\*|__[^_]+__|\*[^*\n]+\*)/g;
 const parts=String(text).split(pattern);
 return parts.map((part,index)=>{
  if(part.startsWith('`')&&part.endsWith('`'))return <code key={index}>{part.slice(1,-1)}</code>;
  if((part.startsWith('**')&&part.endsWith('**'))||(part.startsWith('__')&&part.endsWith('__')))return <strong key={index}>{part.slice(2,-2)}</strong>;
  if(part.startsWith('*')&&part.endsWith('*'))return <em key={index}>{part.slice(1,-1)}</em>;
  if(part.startsWith('![')){const label=part.match(/^!\[([^\]]*)\]/)?.[1];return <span className="film-media-note" key={index}>Image reference: {label||'see the original source'}</span>;}
  const link=part.match(/^\[([^\]]+)\]\(([^\s)]+)(?:\s+"[^"]*")?\)$/);
  if(link){const resolved=resolveLink(link[2],entry,blocks);return resolved?<a key={index} href={resolved.href} {...(resolved.external?{target:'_blank',rel:'noreferrer'}:{})}>{link[1]}</a>:<span key={index} title={link[2]}>{link[1]}</span>;}
  return part;
 });
}
export function Markdown({entry,blocks}){
 const inline=text=><Inline text={text} entry={entry} blocks={blocks}/>;
 return <div className="film-markdown">{blocks.map((block,index)=>{
  if(block.type==='heading'){const Tag=`h${Math.min(4,block.level+1)}`;return <Tag id={block.id} key={index}>{inline(block.text)}</Tag>;}
  if(block.type==='code')return <figure className="film-code" key={index}>{block.language&&<figcaption>{block.language}</figcaption>}<pre tabIndex={0}><code>{block.text}</code></pre></figure>;
  if(block.type==='table')return <div className="film-table-wrap" key={index} role="region" aria-label="Guide table" tabIndex={0}><table><thead><tr>{block.header.map((cell,i)=><th key={i} scope="col">{inline(cell)}</th>)}</tr></thead><tbody>{block.rows.map((row,r)=><tr key={r}>{row.map((cell,c)=><td key={c}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
  if(block.type==='quote')return <blockquote key={index}>{inline(block.text)}</blockquote>;
  if(block.type==='rule')return <hr key={index}/>;
  if(block.type==='list'){const List=block.ordered?'ol':'ul';return <List start={block.start} key={index}>{block.items.map((item,i)=><li style={item.indent?{marginInlineStart:`${item.indent}rem`}:undefined} key={i}>{inline(item.text)}</li>)}</List>;}
  return <p key={index}>{inline(block.text)}</p>;
 })}</div>;
}

