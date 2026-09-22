# Logo oba- reconstruido con primitivas (arcos y lineas con extremos redondeados), medidas sobre oba-logo.png
from PIL import Image, ImageDraw
import numpy as np
SW = 72.5
parts = {
  'o':      ('circle', (369.0, 1175.0, 175.2)),
  'b-stem': ('line',   (655.0, 587.0, 655.0, 1345.0)),
  'b-bowl': ('circle', (831.5, 1175.0, 175.2)),
  'a-bowl': ('circle', (1297.5, 1173.5, 176.0)),
  'a-stem': ('line',   (1473.0, 995.0, 1473.0, 1345.0)),
  'dash':   ('line',   (1630.0, 1170.5, 1806.0, 1170.5)),
}
S = 4
W = 2000*S
img = Image.new('L', (W, W), 0)
d = ImageDraw.Draw(img)
for k,(t,p) in parts.items():
    if t == 'circle':
        cx,cy,r = [v*S for v in p]
        d.ellipse([cx-r-SW*S/2, cy-r-SW*S/2, cx+r+SW*S/2, cy+r+SW*S/2], fill=255)
        d.ellipse([cx-r+SW*S/2, cy-r+SW*S/2, cx+r-SW*S/2, cy+r-SW*S/2], fill=0)
for k,(t,p) in parts.items():
    if t == 'line':
        x1,y1,x2,y2 = [v*S for v in p]
        d.line([x1,y1,x2,y2], fill=255, width=int(SW*S))
        rr = SW*S/2
        for (x,y) in [(x1,y1),(x2,y2)]:
            d.ellipse([x-rr,y-rr,x+rr,y+rr], fill=255)
img = img.resize((2000,2000), Image.LANCZOS)
m = np.array(img)>128
src = np.array(Image.open('public/oba-logo.png').convert('RGBA'))[:,:,3]>128
inter=(m&src).sum(); uni=(m|src).sum()
print('IoU', round(inter/uni,4), 'src_only', (src&~m).sum(), 'render_only', (m&~src).sum())
