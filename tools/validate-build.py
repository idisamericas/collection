#!/usr/bin/env python3
from pathlib import Path
from html.parser import HTMLParser
import json, subprocess, sys

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_CODE = [
    'index.html','ar.js','styles.css',
    'platform/platform-config.js','platform/platform.js','platform/platform.css',
    'assets/thumbs/gsx2026-atlanta.webp'
]
REQUIRED_PRODUCTION = [
    'assets/targets/gsx2026-two-sided.mind',
    'assets/audio/state-voiceover.mp3',
    'assets/video/idis-showcase-alpha.webm',
    'assets/parallax/atlanta/layer-1-back.mp4',
    'assets/parallax/atlanta/layer-2-middle.png',
    'assets/parallax/atlanta/layer-3-front.png',
]

class IDParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]
    def handle_starttag(self, tag, attrs):
        d=dict(attrs)
        if 'id' in d:self.ids.append(d['id'])

fail=False
print('IDIS Collectible Platform validator')
print('Root:', ROOT)

for rel in REQUIRED_CODE:
    ok=(ROOT/rel).exists(); print(('PASS' if ok else 'FAIL'), rel); fail |= not ok

for rel in REQUIRED_PRODUCTION:
    ok=(ROOT/rel).exists(); print(('PASS' if ok else 'MISSING'), rel)

html=(ROOT/'index.html').read_text(encoding='utf-8')
parser=IDParser(); parser.feed(html)
dups=sorted({x for x in parser.ids if parser.ids.count(x)>1})
print(('PASS' if not dups else 'FAIL'), 'duplicate HTML ids', dups or '')
fail |= bool(dups)

if '<script src="https://aframe.io' in html or '<script src="https://cdn.jsdelivr.net/npm/mind-ar' in html:
    print('FAIL AR libraries are statically loaded on homepage'); fail=True
else:
    print('PASS AR libraries lazy-loaded')

for rel in ['ar.js','platform/platform.js','platform/studio.js','platform/platform-config.js']:
    p=ROOT/rel
    result=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
    print(('PASS' if result.returncode==0 else 'FAIL'), 'syntax', rel)
    if result.returncode: print(result.stderr); fail=True

thumb=ROOT/'assets/thumbs/gsx2026-atlanta.webp'
if thumb.exists(): print('INFO carousel thumbnail KB:', round(thumb.stat().st_size/1024,1))

cfg=(ROOT/'platform/platform-config.js').read_text(encoding='utf-8')
cloud_ready="supabaseUrl: ''," not in cfg and "supabasePublishableKey: ''," not in cfg
print(('INFO'), 'cloud config:', 'configured' if cloud_ready else 'device-only until credentials are added')

sys.exit(1 if fail else 0)
