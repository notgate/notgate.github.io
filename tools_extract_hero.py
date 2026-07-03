#!/usr/bin/env python3
import json, os, pathlib, urllib.request, sys
FILE_KEY='8c7DuUnZxrTgNUfYQ2fIHP'
TOKEN=os.environ.get('FIGMA_TOKEN')
if not TOKEN:
    sys.exit('FIGMA_TOKEN missing')
root=pathlib.Path(__file__).resolve().parent
out=root/'figma-hero-dump'
assets=root/'public/assets/figma'
out.mkdir(exist_ok=True); assets.mkdir(parents=True, exist_ok=True)
def get(url):
    req=urllib.request.Request(url, headers={'X-Figma-Token':TOKEN})
    with urllib.request.urlopen(req, timeout=90) as r: return json.loads(r.read().decode())
def dl(url,path):
    with urllib.request.urlopen(urllib.request.Request(url), timeout=90) as r: path.write_bytes(r.read())
full=get(f'https://api.figma.com/v1/files/{FILE_KEY}?geometry=paths&depth=12')
(out/'file.json').write_text(json.dumps(full,indent=2))
fills=get(f'https://api.figma.com/v1/files/{FILE_KEY}/images')
(out/'image_fills.json').write_text(json.dumps(fills,indent=2))
for ref,url in (fills.get('meta',{}).get('images',{}) or {}).items():
    p=assets/f'imagefill-{ref}.png'
    dl(url,p)
    print(ref,p.name,p.stat().st_size)
# Dump hero relevant text/frame positions
flat=[]
hero=None
def find_hero(n):
    global hero
    if n.get('type')=='FRAME' and n.get('name')=='Hero': hero=n
    for c in n.get('children',[]) or []: find_hero(c)
find_hero(full['document'])
if hero:
    hbb=hero['absoluteBoundingBox']
    def scan(n):
        bb=n.get('absoluteBoundingBox') or {}
        rel=None
        if bb: rel={'x':bb.get('x',0)-hbb.get('x',0),'y':bb.get('y',0)-hbb.get('y',0),'w':bb.get('width',0),'h':bb.get('height',0)}
        if n.get('type') in ('TEXT','RECTANGLE','VECTOR','ELLIPSE','FRAME'):
            flat.append({'id':n.get('id'),'name':n.get('name'),'type':n.get('type'),'rel':rel,'text':n.get('characters'),'style':n.get('style'),'fills':n.get('fills'),'strokes':n.get('strokes'),'cornerRadius':n.get('cornerRadius'),'strokeWeight':n.get('strokeWeight')})
        for c in n.get('children',[]) or []: scan(c)
    scan(hero)
(out/'hero_nodes.json').write_text(json.dumps(flat,indent=2))
print('hero_nodes',len(flat))
