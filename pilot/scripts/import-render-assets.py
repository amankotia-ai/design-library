"""Import canonical prior work without modifying the sibling project.

Run on macOS with Python 3 and sips. Downloads preserve originals;
web previews are explicitly separate JPEG derivatives.
"""
from pathlib import Path
import subprocess, re, sys
import hashlib, json, shutil, zipfile

ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT.parent / 'Render Assets'
OUT = SOURCE / 'output'
DEST = ROOT / 'pilot/public/render-assets'
RUN = ROOT / 'docs/runs/render-assets-import-2026-11-11'
DEST.mkdir(parents=True, exist_ok=True)
entries, provenance = [], []
completed_only = "--completed-only" in sys.argv

def title(path):
    return path.stem.replace('-', ' ').replace('_', ' ').title()

def add(id, name, category, summary, folder, images, cover=None, note='', package=None, study=None, *, fill_with_first_image=False, cover_position=None):
    source = OUT / folder
    target = DEST / id
    if completed_only and not (target/'download.zip').is_file():
        return
    target.mkdir(exist_ok=True)
    files = [Path(f) if Path(f).is_absolute() else source/f for f in images]
    files = list(dict.fromkeys(f for f in files if f.exists()))
    if not files:
        raise RuntimeError(f'No images for {id}')
    data = dict(id=id, title=name, category=category, summary=summary, note=note,
                sourcePath=f'output/{folder}', images=[])
    def preview(f, name, limit):
        result = subprocess.run(['/usr/bin/sips','-g','pixelWidth','-g','pixelHeight',str(f)],capture_output=True,text=True,check=True,timeout=30).stdout
        width=int(re.search(r'pixelWidth: (\d+)',result)[1])
        height=int(re.search(r'pixelHeight: (\d+)',result)[1])
        if completed_only and (target/name).is_file():
            return width, height
        subprocess.run(['/usr/bin/sips','-Z',str(limit),'-s','format','jpeg','-s','formatOptions','85',str(f),'--out',str(target/name)],capture_output=True,check=True,timeout=30)
        return width, height
    for i, f in enumerate(files):
        w,h = preview(f, f'{i+1:02d}.jpg', 1800)
        label=title(f.parent) if f.stem in ['render','blank'] else title(f)
        data['images'].append(dict(src=f'/render-assets/{id}/{i+1:02d}.jpg', title=label, width=w, height=h, original=f.name))
        provenance.append(dict(entry=id, source=str(f.relative_to(SOURCE)), width=w, height=h, sha256=hashlib.sha256(f.read_bytes()).hexdigest()))
    if fill_with_first_image:
        data['preview'] = data['images'][0]['src']
        data['previewFit'] = 'cover'
        if cover_position:
            data['previewPosition'] = cover_position
    else:
        cf = source/cover if cover else files[0]
        if not cf.exists(): cf = files[0]
        preview(cf, 'cover.jpg', 1200)
        data['preview'] = f'/render-assets/{id}/cover.jpg'
    # Keep original notes available, rather than treating old QA as current review.
    for filename in ['README.md','final-manifest.json','manifest.json','photo-provenance.json','asset-provenance.json','composition-notes.md']:
        p=source/filename
        if p.exists() and (not completed_only or (target/filename).exists()):
            if not completed_only: shutil.copy2(p,target/filename)
            if filename=='README.md': data['readme']=f'/render-assets/{id}/README.md'
    pack = target/'download.zip'
    if package:
        if not completed_only: shutil.copy2(OUT/package,pack)
        data['downloadLabel']='Download source pack'
    elif not completed_only:
        with zipfile.ZipFile(pack,'w',zipfile.ZIP_DEFLATED,compresslevel=3) as z:
            for i,f in enumerate(files): z.write(f, f'images/{i+1:02d}-'+f.name)
            for filename in ['README.md','final-manifest.json','manifest.json','photo-provenance.json','asset-provenance.json','composition-notes.md']:
                p=source/filename
                if p.exists():z.write(p,filename)
            # Self-contained HTML previews remain useful portable source artifacts.
            for f in files:
                html=f.parent/'composition.html'
                if html.exists():z.write(html,'compositions/'+f.parent.name+'.html')
    if not package: data['downloadLabel']='Download image pack'
    data['download']=f'/render-assets/{id}/download.zip'
    data['downloadBytes']=pack.stat().st_size
    if study:data['study']=study
    entries.append(data)
    print(id,len(files),round(pack.stat().st_size/1024/1024,1),'MB',flush=True)

def glob(folder, pattern): return sorted((OUT/folder).glob(pattern))

add('arco','ARCO','Brand showcases','A technology workspace identity across a phone, auditorium, social cards and laptop sticker.','arco-tech-brand',glob('arco-tech-brand','delivery/*.png'),
    note='Fictional brand. Fixed-camera artwork compositions; phone is 1536 × 1024, other scenes are 1672 × 941.',package='arco-tech-brand/ARCO-tech-brand.zip',fill_with_first_image=True)
add('aster-oak','ASTER & OAK','Brand showcases','Five coordinated packaging, print and profile compositions in warm cream and green.','aster-and-oak-4k',glob('aster-and-oak-4k','delivery/*.png'),
    note='3840 × 2160 exports. Photographic blanks were enlarged from 1672 × 941; this does not add native photographic detail. Fictional brand.',package='aster-and-oak-4k/ASTER-OAK-4K.zip',fill_with_first_image=True)
add('sidequest','Sidequest','Brand showcases','Two complete neighborhood-adventure app screens in handheld phone scenes.','sidequest-app-mockups',glob('sidequest-app-mockups','renders/*.png'),
    note='Fictional app and demo content. Fixed-camera photographs with editable screen artwork, masks and a packed Blender source.',package='sidequest-app-mockups.zip',fill_with_first_image=True,cover_position='center 25%')
add('product-screens','Relay & Morrow','Product screens','Ten product compositions: close-ups, atmospheric heroes, quiet features and paired workflows.','product-screen-system',glob('product-screen-system','renders/*/render.png'),'proof-sheet.jpg',
    'Illustrative product fixtures. Image packs retain original exports and self-contained HTML compositions. Prior review records are historical evidence.')
add('relay-five-shots','Relay / Five compositions','Product screens','One product expressed through a macro, quiet feature, atmosphere, workflow and editorial layout.','five-shot-proof',glob('five-shot-proof','final/*.png'),'previews/five-shot-overview.png',
    'Fictional product. Final exports are archived; earlier render iterations remain in the source project.')
add('relay-nature','Relay / Forest & coast','Product screens','Opaque interface panels framed against misty forest and golden coastal photography.','nature-shots',glob('nature-shots','final/*.png'),None,
    'Photography: Sebastian Unrau and Daniel Akselrod on Unsplash. Credits and license links are retained in the project notes. Fictional UI.')
add('relay-illustrated','Relay / Illustrated landscapes','Product screens','Two compositions with painted meadow and editorial canopy backgrounds.','preference-examples',glob('preference-examples','final/*.png'),None,
    '3840 × 2160 exports with generated 1672 × 941 backgrounds enlarged about 2.3×. Fictional Relay UI is composited separately.')
add('relay-viewport','Relay / Wide view & detail','Product screens','A complete application viewport paired with a protected content close-up.','viewport-correction',glob('viewport-correction','final/*.png'),'shot-map.png',
    'Fictional product. The full viewport and content macro have separate crop and density rules.')
add('coffee','Field & Daybreak','Brand showcases','Two coffee-cup identities applied to one shared photographic scene.','coffee-cup-examples-v2',['field-example.png','daybreak-example.png'],
    note='Version 2 source pack includes replaceable artwork and saved Blender scenes. Photographic cup geometry and camera are fixed.',package='coffee-cup-examples-v2/coffee-cup-examples-v2.zip',fill_with_first_image=True)
add('grove','Grove tote','Brand showcases','A simple botanical identity placed on a natural canvas tote.','grove-tote-logo',['grove-tote.png','logo-detail.png'],
    note='Generated photographic brand example. The download contains final images, not a recovered editable 3D scene.',fill_with_first_image=True)
add('showcase-templates','Presentation templates','Mockup templates','Fourteen blank scenes for devices, apparel, cards and brand presentations.','showcases',glob('showcases','plates/*.png'),'preview.jpg',
    'Photographic scenes are fixed-camera 2.5D plates. The source pack also contains separately authored editable 3D stages.',package='showcases-template-pack.zip')
add('expanded-templates','Brand & packaging templates','Mockup templates','Thirty blank scenes spanning packaging, retail, print, social cards and devices.','expanded-showcases',glob('expanded-showcases','plates/*.png'),'preview.jpg',
    'Fixed-camera photographic plates. The image pack includes the blank PNGs and original manifest; full editable sources remain in Render Assets.')
add('oak-retail','Oak retail scenes','Mockup templates','Five matching oak interiors and retail objects, from entrance glass to presentation box.','oak-retail-extension',glob('oak-retail-extension','plates/*.png'),'preview.jpg',
    'Blank photographic scenes with protected hardware and fitted artwork surfaces.',package='oak-retail-five-plates.zip')
add('warm-wood','Warm wood scenes','Mockup templates','Four warm, sunlit templates for a desk phone, auditorium, cards and laptop sticker.','vadim-showcases',glob('vadim-showcases','plates/*.png'),'preview.jpg',
    'Blank templates used by the ARCO examples. Source references and composition notes are preserved.',package='vadim-showcase-plates.zip')
add('mobile-scenes','Mobile scene templates','Mockup templates','Seven mobile and campaign templates, including handheld, first-person and app-icon scenes.','mobile-reference-pack',glob('mobile-reference-pack','templates/*/blank.png'),'generated-overview.jpg',
    'Fixed-camera image compositions with masks and placement surfaces. People, hands and devices are baked into the photography.',package='mobile-seven-templates.zip')
add('dark-wood-mobile','Dark wood phone','Mockup templates','A blank mobile display with fitted screen mask, light and placement guide.','uds-mobile-template',['blank-mobile.png','screen-placement-guide.jpg'],None,
    'Fixed camera and photographic hardware. Replace the fitted screen artwork rather than moving the subject.',package='uds-mobile-template/dark-wood-mobile-template.zip')

# Preserve the entire buildless study with its relative URLs and attribution.
if not completed_only:
    shutil.copytree(SOURCE/'grid-study/dist',DEST/'ruled/study',dirs_exist_ok=True,ignore=shutil.ignore_patterns('.DS_Store'))
    add('ruled','Ruled / A study of grids','Grid & layout','An interactive grid article and composition lab with six configurable layouts.','.',
        [SOURCE/'grid-study/qa/sans-type-preview.jpg'],None,
        'Research based on 29 attributed Bernardo Lickfold posts. Mathematical demo tokens and mobile recompositions are proposed adaptations.',study='/render-assets/ruled/study/index.html')
    shutil.copy2(SOURCE/'grid-study/README.md',DEST/'ruled/README.md')
    entries[-1]['readme']='/render-assets/ruled/README.md'
    entries[-1]['sourcePath']='grid-study/dist'
    with zipfile.ZipFile(DEST/'ruled/download.zip','w',zipfile.ZIP_DEFLATED) as z:
        for f in (DEST/'ruled/study').rglob('*'):
            if f.is_file():z.write(f,str(f.relative_to(DEST/'ruled')))
        z.write(DEST/'ruled/README.md','README.md')
    entries[-1]['downloadBytes']=(DEST/'ruled/download.zip').stat().st_size
    entries[-1]['downloadLabel']='Download interactive study'

    add('composition-atlas','Composition atlas','Grid & layout','A visual index of reusable framing, card and interface composition patterns.','art-direction-calibration',['template-atlas.png','portrait-card-corrected.png'],None,
        'A calibration and template research artifact. The corrected portrait example is included alongside the atlas.',study='/render-assets/composition-atlas/study.html')
    shutil.copy2(OUT/'art-direction-calibration/template-atlas.html',DEST/'composition-atlas/study.html')

manifest=dict(title='Renders & Mockups',sourceProject='Render Assets',importedAt='2026-11-11',entries=entries)
(DEST/'catalog.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'pilot/src/render-assets-data.json').write_text(json.dumps(manifest,indent=2)+'\n')
(RUN/'asset-provenance.json').write_text(json.dumps(provenance,indent=2)+'\n')
print('DONE',len(entries),'families',sum(len(e['images']) for e in entries),'images',flush=True)
