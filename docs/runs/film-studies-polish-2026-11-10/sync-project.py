from pathlib import Path
import hashlib,json,shutil,sys
HERE=Path(__file__).resolve().parent
STAGE=HERE/'pilot'
TARGET=Path('/Users/abhishekmankotia/Documents/ChatGPT/Design Library/pilot')
baseline=json.loads((HERE/'baseline.json').read_text())
files=['package.json','package-lock.json','src/film-library.jsx','src/film-studies.css','src/film-study-registry.js','src/film-study-ui.jsx','src/film-study-thumbnails.jsx','src/film-motion-studies.jsx','src/film-timing-studies.jsx']
digest=lambda p:hashlib.sha256(p.read_bytes()).hexdigest() if p.is_file() else None
conflicts=[f for f in files if digest(TARGET/f) not in [baseline.get(f),digest(STAGE/f)]]
if conflicts:raise SystemExit('Concurrent edits require reconciliation: '+', '.join(conflicts))
review=json.loads((HERE/'evidence/browser-polish-check.json').read_text())
assert review['status']=='passed', 'Browser verification must pass'
for file,sha in review['revision'].items():assert digest(STAGE/file)==sha,'Reviewed source changed: '+file
assert (HERE/'evidence/QA.md').exists(),'Independent QA required'
report={'target':str(TARGET),'files':[{'path':f,'sha256':digest(STAGE/f)} for f in files]}
(HERE/'delivery-manifest.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'guard':'passed','files':len(files),'apply':'--apply' in sys.argv}))
if '--apply' in sys.argv:
 for file in files:
  dest=TARGET/file;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(STAGE/file,dest)
 assert all(digest(TARGET/f)==digest(STAGE/f) for f in files)
 docs=TARGET.parent/'docs/runs/film-studies-polish-2026-11-10';docs.mkdir(parents=True,exist_ok=True)
 for p in [HERE/'RUN.md',HERE/'README.md',HERE/'delivery-manifest.json',HERE/'browser-polish.cjs',*sorted((HERE/'evidence').glob('*'))]:
  if p.is_file():shutil.copy2(p,docs/p.name)
 print('Delivered reviewed polish and evidence; preserved unrelated changes.')
