from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin,urlparse
import re,json,hashlib,urllib.request,concurrent.futures,shutil,subprocess
root=Path('/Users/abhishekmankotia/Documents/ChatGPT/Design Library/pilot')
out=root/'public/interfere';out.mkdir(parents=True,exist_ok=True);(out/'assets').mkdir(exist_ok=True)
s=BeautifulSoup(Path('/tmp/interfere.html').read_text(),'html.parser')
cssurls=[e['href'] for e in s.select('link[rel=stylesheet]')]
css='\n'.join(subprocess.check_output(['curl','-L','-f','-s','--max-time','20',u]).decode() for u in cssurls)
urls=set(re.findall(r'url\((https?[^)]+)\)',css))
for e in s.select('img[src]'):urls.add(e['src'])
assets={}
def fetch(u):
 try:
  data=subprocess.check_output(['curl','-L','-f','-s','--max-time','20',u]);ext=Path(urlparse(u).path).suffix
  if not ext or len(ext)>7:ext='.webp' if data[:4]==b'RIFF' else '.png'
  p='/interfere/assets/'+hashlib.sha256(u.encode()).hexdigest()[:14]+ext
  (root/'public'/p.lstrip('/')).write_bytes(data);return u,p
 except Exception as e:return u,None
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
 for u,p in pool.map(fetch,urls):
  if p:assets[u]=p
for u,p in assets.items():css=css.replace(u,p)
(out/'source.css').write_text(css)
for e in s.select('script'):e.decompose()
for e in s.select('*'):
 for a in list(e.attrs):
  if a.lower().startswith('on'):del e[a]
 if e.has_attr('style'):
  e['style']=re.sub(r'(?:filter|opacity|transform|will-change):[^;]*(?:;|$)','',e['style'])
 if e.name=='img':
  e['src']=assets.get(e.get('src'),e.get('src'));e.attrs.pop('srcset',None);e.attrs.pop('loading',None)
 if e.name=='a' and e.get('href'):
  href=e['href'];e['href']=urljoin('https://interfere.com/',href) if not href.startswith('#') else href
  if not e['href'].startswith('#'): e['target']='_top'
# Use semantic, native navigation disclosures; dropdown contents come from source footer links.
menus={'Product':[('Engineers','product/engineers'),('Designers','product/designers'),('Product Managers','product/product-managers'),('Customer Support','product/customer-support')],'Resources':[('Documentation','docs'),('Security','security'),('Changelog','changelog'),('Blog','blog'),('Download','download')],'Company':[('About','about'),('Careers','careers'),('Contact','join')]}
header=s.find('header')
for b in list(header.find_all('button')):
 label=b.get_text(' ',strip=True)
 if label not in menus:continue
 detail=s.new_tag('details');detail['class']=['recreation-menu'];summary=s.new_tag('summary');summary['class']=b.get('class',[]);summary.string=label;detail.append(summary)
 panel=s.new_tag('div');panel['class']=['recreation-menu-panel']
 for name,path in menus[label]:
  a=s.new_tag('a',href='https://interfere.com/'+path,target='_top');a.string=name;panel.append(a)
 detail.append(panel);b.replace_with(detail)
# Replace the source hamburger with a native disclosure, keeping its breakpoint wrapper.
for b in list(header.find_all('button')):
 detail=s.new_tag('details');detail['class']=['recreation-menu','recreation-mobile'];summary=s.new_tag('summary');summary['aria-label']='Open navigation';summary.string='☰';detail.append(summary)
 panel=s.new_tag('div');panel['class']=['recreation-menu-panel']
 for group,items in menus.items():
  for name,path in items:
   a=s.new_tag('a',href='https://interfere.com/'+path,target='_top');a.string=name;panel.append(a)
 detail.append(panel);b.replace_with(detail)
main=s.find('main');children=main.find_all(recursive=False)
# Script removal makes section index start at0.
parts=[('header',str(header)),('hero',str(children[0])),('trust',str(children[1])),('overview',str(children[2])),('testimonial',str(children[3])),('monitoring',str(children[4])+str(children[5])),('triage',str(children[6])+str(children[7])),('resolution',str(children[8])),('security',str(children[9])),('releases',str(children[10])),('footer',str(s.find('footer')))]
# Source scope is isolated in documents, preventing source utility CSS from altering the library.
style='''html{color-scheme:dark;--quote-progress:1;--quote-blur:0px}body{margin:0}*{animation:none!important;will-change:auto!important}body{overflow-x:clip}.recreation-menu{position:relative}.recreation-menu summary{list-style:none;cursor:pointer}.recreation-menu summary::-webkit-details-marker{display:none}.recreation-menu-panel{position:absolute;top:calc(100% + 12px);left:0;min-width:210px;padding:8px;background:var(--color-container);border:1px solid var(--color-border-default);border-radius:10px;box-shadow:0 16px 48px #0008;z-index:60}.recreation-menu-panel a{display:block;padding:10px 12px;color:var(--color-primary-foreground);border-radius:6px}.recreation-menu-panel a:hover{background:var(--color-component-on-container)}.recreation-mobile .recreation-menu-panel{left:auto;right:0;max-height:75dvh;overflow:auto}.recreation-mobile summary{font-size:20px;line-height:28px}a:focus-visible,summary:focus-visible{outline:2px solid var(--color-primary-foreground);outline-offset:4px}[class*="_word_"]{filter:none!important;color:var(--color-primary-foreground)!important}.recreation-part header>div{position:relative}'''
(out/'recreation.css').write_text(style)
# Canonical reusable system inputs are separate from source layout.
(out/'tokens.css').write_text(':root{--interfere-page:oklch(15% 0 0);--interfere-text:oklch(94.9% 0 0);--interfere-muted:oklch(70.6% 0 0);--interfere-rule:oklch(23% 0 0);--interfere-font:InterVariable,Arial,sans-serif;--interfere-mono:BerkeleyMono,monospace;--interfere-max:1200px;--interfere-edge:24px;--interfere-unit:4px}html{background:var(--interfere-page)}')
def doc(content,title,part=False):
 return '<!doctype html><html lang="en" class="dark bg-page"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+title+' · Interfere</title><link rel="stylesheet" href="/interfere/source.css"><link rel="stylesheet" href="/interfere/tokens.css"><link rel="stylesheet" href="/interfere/recreation.css"></head><body class="'+('recreation-part' if part else '')+'"><div class="isolate flex min-h-full w-full flex-col">'+content+'</div></body></html>'
for id,markup in parts:(out/(id+'.html')).write_text(doc(markup,id.title(),True))
(out/'page.html').write_text(doc(str(header)+'<main id="main" class="flex flex-1 flex-col">'+''.join(m for id,m in parts if id not in ['header','footer'])+'</main>'+parts[-1][1],'Production visibility'))
manifest={'source':'https://interfere.com/','retrieved':'2026-10-31','parts':[p[0] for p in parts],'assets':assets,'missing_assets':sorted(urls-assets.keys()),'source_css':cssurls,'limitations':['Animation load effects frozen in settled state','Native disclosure menu styling authored; source labels and destinations retained','Product demonstration is a static source DOM state; backend and live investigation not reproduced','Source copyright, product copy and endorsements remain attributed to Interfere']}
(out/'provenance.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({'parts':len(parts),'assets':len(assets),'missing':manifest['missing_assets']}))
