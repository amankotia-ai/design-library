import json,re,hashlib
from pathlib import Path
from urllib.parse import urljoin,urlparse
from bs4 import BeautifulSoup
root=Path('pilot'); out=root/'public/unifize-source'; cap=json.load(open(root/'research/unifize/capture.json')); assets=json.load(open(root/'research/unifize/assets.json')); mapped={a['url']:a['file'] for a in assets}
def asset_url(u,base='https://www.unifize.com/'):
 if (out/u).is_file():return u
 absolute=urljoin(base,u)
 if absolute in mapped:return mapped[absolute]
 # normalize deployment query / equivalent root URLs
 for k,v in mapped.items():
  if urlparse(k).path==urlparse(absolute).path and urlparse(k).query==urlparse(absolute).query:return v
 return absolute
css=[]
for u in cap['styles']:
 name=mapped[u]; p=out/name; text=p.read_text(); text=re.sub(r'url\(([^)]+)\)',lambda m:m.group(0) if m[1].strip('\"\'').startswith('data:') else 'url("'+asset_url(m[1].strip('\"\''),u)+'")',text); css.append(text)
combined='\n'.join(css)
# Extract source custom-property declarations separately from layout.
token_rules=[]
def tokens(m):
 rule=m.group(0); token_rules.append(rule); return ''
# Keep @font-face and original selectors; shared homepage overrides belong in tokens.css.
(out/'source.css').write_text(combined)
(out/'tokens.css').write_text('''/* Measured Unifize homepage tokens; source fonts retained in source.css. */\n.dms{--u-primary:#005bb7;--bg:#fff;--surface:#f6f7f8;--text:#17191f;--muted:#606773;--line:#e4e7eb;--dark-bg:#1f2126;--dark-text:#f7f8fa;--dark-muted:#b9bec8;--font-body:var(--font-inter),ui-sans-serif,system-ui,sans-serif;--font-display:var(--font-ibm-plex),var(--font-inter),sans-serif;--font-mono:var(--font-jetbrains),ui-monospace,monospace;}\n''')
def localize(html):
 soup=BeautifulSoup(html,'html.parser')
 for e in soup.find_all(['script','next-route-announcer','iframe']):e.decompose()
 for e in soup.select('.dms-will-reveal'):
  e['class']=list(dict.fromkeys(e.get('class',[])+['is-in']))
 for video in soup.find_all('video'):
  poster=video.get('poster')
  if poster:
   ishero='cxf__film' in video.get('class',[])
   video.name='img';video['src']='hero-settled.png' if ishero else asset_url(poster);video['alt']='Decision workflow illustration' if ishero else 'Unifize workflow demonstration'
   for attr in ['poster','autoplay','loop','muted','playsinline','preload']:video.attrs.pop(attr,None)
 for e in soup.find_all(True):
  for key in list(e.attrs):
   if key.startswith('on'):del e[key]
  if e.get('src'):e['src']=asset_url(e['src'])
  if e.get('poster'):e['poster']=asset_url(e['poster'])
  if e.get('srcset'):del e['srcset']
  if e.get('href') and not e['href'].startswith(('#','mailto:','tel:')):
   e['href']=urljoin('https://www.unifize.com/',e['href']);e['target']='_blank';e['rel']='noopener noreferrer'
  if e.get('style'):e['style']=re.sub(r'url\(([^)]+)\)',lambda m:'url('+asset_url(m[1].strip('\"\''))+')',e['style'])
  if e.name=='img':e['loading']='eager'
 return str(soup)
s=BeautifulSoup(cap['body'],'html.parser'); main=s.find('main'); blocks=[x for x in main.children if getattr(x,'name',None) in ['header','section','footer']];ids=['header','hero','customers','decision','how','fit','products','industries','stories','resources','closing','footer']
parts={k:localize(str(v)) for k,v in zip(ids,blocks)}
styles='<link rel="stylesheet" href="source.css"><link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="layout.css"><link rel="stylesheet" href="local-layout.css">'
attrs=' '.join(k+'="'+v+'"' for k,v in cap['htmlAttrs']);main.attrs.pop('data-motion',None)
mainattrs=' '.join(k+'="'+(' '.join(v) if isinstance(v,list) else v)+'"' for k,v in main.attrs.items())
def document(body,part):return '<!doctype html><html '+attrs+'><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unifize · Decision Rails</title>'+styles+'</head><body data-part="'+part+'"><main '+mainattrs+'>'+body+'</main><script type="module" src="interactions.js"></script><script>new ResizeObserver(()=>parent.postMessage({type:"unifize-height",height:document.body.scrollHeight},location.origin)).observe(document.body)</script></body></html>'
# Include original separators for full-page measured rhythm.
for script in main.find_all('script'):script.decompose()
(out/'page.html').write_text(document(localize(''.join(str(x) for x in main.children)),'page'))
for k,html in parts.items():
 if k=='hero':html=parts['header']+html
 (out/(k+'.html')).write_text(document(html,k))
raw=root/'research/unifize/states-raw.json'
if raw.exists():
 states=json.load(open(raw))
 for group in states:
  for state in group['states']:state['html']=localize(state['html'] or '')
 (out/'states.json').write_text(json.dumps(states))
(out/'layout.css').write_text('''/* Static study: reveal all captured content and hold decorative motion. */\nhtml,body{margin:0;min-height:0}.dms-header{background:#1f2126!important}.dms-will-reveal{opacity:1!important;transform:none!important;visibility:visible!important}*,*::before,*::after{animation:none!important;transition:none!important}body:not([data-part="page"]):not([data-part="hero"]) .dms-header{position:relative}body:not([data-part="page"]):not([data-part="hero"]) main.dms{min-height:0}.dms-header__sheet[hidden]{display:none!important}a:focus-visible,button:focus-visible,summary:focus-visible{outline:3px solid #70aeff;outline-offset:4px}@media(min-width:821px){html[data-unifize-embedded] .dms--redesign.dms--home.cx .cxh2{min-height:908px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}}\n''')
(out/'manifest.json').write_text(json.dumps({'source':cap['url'],'capture':'2026-11-10','assets':assets,'parts':ids,'limitations':['Decorative animation frozen; reference states captured at a single instant.','No source application backend, booking form, analytics, or tracking scripts copied.','Source fonts and imagery retained for attributed design study.']},indent=2))
print('Prepared',len(parts),'sections',len(assets),'local assets')
