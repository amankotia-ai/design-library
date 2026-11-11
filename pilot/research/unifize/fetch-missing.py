import json,hashlib,urllib.request,concurrent.futures
from pathlib import Path
from urllib.parse import urljoin,urlparse
from bs4 import BeautifulSoup
base=Path('pilot');manifest=base/'research/unifize/assets.json';assets=json.load(open(manifest));known={a['url'] for a in assets};cap=json.load(open(base/'research/unifize/capture.json'));states=json.load(open(base/'research/unifize/states-raw.json'));html=cap['body']+''.join(s['html'] for g in states for s in g['states']);soup=BeautifulSoup(html,'html.parser');urls=set()
for el in soup.find_all(['img','video','source']):
 for attr in ['src','poster']:
  if el.get(attr):
   url=urljoin('https://www.unifize.com/',el[attr])
   if url.startswith('https:') and url not in known:urls.add(url)
def get(u):
 ext=Path(urlparse(u).path).suffix or '.bin';name=hashlib.sha1(u.encode()).hexdigest()[:14]+ext
 try:
  data=urllib.request.urlopen(u,timeout=30).read();(base/'public/unifize-source'/name).write_bytes(data);return {'url':u,'file':name,'type':'media' if ext=='.mp4' else 'image','bytes':len(data)}
 except Exception as e:print('FAILED',u,str(e));return None
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for a in pool.map(get,urls):
  if a:assets.append(a);print(a['file'],a['bytes'])
manifest.write_text(json.dumps(assets,indent=2))
