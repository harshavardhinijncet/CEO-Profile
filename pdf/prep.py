# Makes pdf/<name>.print.html for each profile page: every .webp photo swapped for a high-quality JPEG in pdf/img/.
# Browsers embed WebP in a PDF uncompressed (the first build was 44 MB); JPEG keeps it a few MB.
# Transparent cut-outs are laid onto the colour they sit on (data-bg, default the page colour).
import os, re
from PIL import Image

here = os.path.dirname(os.path.abspath(__file__))
public = os.path.join(here, '..', 'public')
out_dir = os.path.join(here, 'img')
os.makedirs(out_dir, exist_ok=True)

def swap(m):
    tag = m.group(0)
    src = re.search(r'src="(/assets/[^"]+\.webp)"', tag)
    if not src:
        return tag
    bg = re.search(r'data-bg="#([0-9a-fA-F]{6})"', tag)
    bg = tuple(int(bg.group(1)[i:i + 2], 16) for i in (0, 2, 4)) if bg else (246, 245, 242)
    name = src.group(1)[len('/assets/'):].replace('/', '_')[:-5] + '-' + '%02x%02x%02x' % bg + '-hq.jpg'
    dst = os.path.join(out_dir, name)
    if not os.path.exists(dst):
        im = Image.open(os.path.join(public, src.group(1)[1:]))
        if im.mode in ('RGBA', 'LA', 'P'):
            im = im.convert('RGBA')
            flat = Image.new('RGB', im.size, bg)
            flat.paste(im, (0, 0), im)
            im = flat
        im = im.convert('RGB')
        im.thumbnail((2000, 2000))
        im.save(dst, 'JPEG', quality=90, optimize=True, progressive=True, subsampling=0)
    return tag.replace(src.group(1), '/pdf/img/' + name)

for page in ('profile', 'profile-text'):
    html = open(os.path.join(here, page + '.html'), encoding='utf8').read()
    open(os.path.join(here, page + '.print.html'), 'w', encoding='utf8').write(re.sub(r'<img [^>]+>', swap, html))
    print('wrote pdf/%s.print.html' % page)
print(len(os.listdir(out_dir)), 'images in pdf/img')
