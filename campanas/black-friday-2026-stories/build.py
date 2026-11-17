#!/usr/bin/env python3
"""Stories de Black Friday 2026 (1080x1920), una cada dos días: 23, 25, 27 y 29 nov.

    python3 campanas/black-friday-2026-stories/build.py

Pensadas para programarse y publicarse solas: no llevan stickers, así que la
web y el código van escritos en la imagen. Arriba (0–250 px) y abajo
(1720–1920 px) se deja aire para la interfaz de Instagram.
"""
import pathlib, subprocess, shutil

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT = HERE / "png"
TMP = HERE / ".html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

IMG = {
    "144": ROOT / "imagenes/oba-144.jpg",
    "078": ROOT / "imagenes/oba-078.jpg",
    "galeria": ROOT / "imagenes/oba-galeria-restaurante.jpg",
    "cm": ROOT / "oba-film/public/img/shop-cuaderno-medio.jpg",
}
LOGO = (ROOT / "imagenes/oba-logo.png").as_uri()  # versión clara, para fondo oscuro

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700&display=block');
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1920px; overflow: hidden; }
body { font-family: 'Archivo', 'Helvetica Neue', Arial, sans-serif; color: #fff; background: #141110; position: relative; }
.photo { position: absolute; inset: 0; background-size: cover; background-position: center; }
.shade { position: absolute; inset: 0; }
.logo { position: absolute; left: 50%; transform: translateX(-50%); }
.logo img { width: 100%; display: block; }
.content { position: absolute; left: 90px; right: 90px; text-align: center; }
.kicker { font-weight: 700; font-size: 34px; letter-spacing: 0.22em; }
.title { font-weight: 500; font-size: 120px; line-height: 1.04; letter-spacing: -0.01em; }
.sub { font-size: 42px; line-height: 1.4; color: rgba(255,255,255,0.86); }
.code { display: inline-block; font-weight: 700; font-size: 60px; letter-spacing: 0.12em; padding: 18px 40px; background: #806148; }
.label { font-size: 28px; letter-spacing: 0.14em; color: rgba(255,255,255,0.65); margin-bottom: 22px; }
.url { font-size: 36px; letter-spacing: 0.04em; color: #fff; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 34px; }
.url span { display: block; font-size: 26px; letter-spacing: 0.12em; color: rgba(255,255,255,0.6); margin-bottom: 10px; }
.rule { width: 90px; height: 3px; background: #806148; margin: 40px auto; }
.prices { margin: 0 auto; max-width: 820px; text-align: left; }
.row { display: flex; justify-content: space-between; align-items: baseline; padding: 26px 0; border-top: 1px solid rgba(255,255,255,0.2); font-size: 40px; }
.row:last-child { border-bottom: 1px solid rgba(255,255,255,0.2); }
.row s { font-size: 30px; color: rgba(255,255,255,0.5); margin-right: 18px; }
.row b { font-weight: 500; }
"""

def bg(key, pos="center", top=0.55, mid=0.2):
    return (f'<div class="photo" style="background-image:url({IMG[key].as_uri()});background-position:{pos}"></div>'
            f'<div class="shade" style="background:linear-gradient(180deg, rgba(20,17,16,{top}) 0%, '
            f'rgba(20,17,16,{mid}) 30%, rgba(20,17,16,0.88) 58%, #141110 72%)"></div>')

def logo(top=250, w=190):
    return f'<div class="logo" style="top:{top}px;width:{w}px"><img src="{LOGO}"></div>'

CODE = """<p class="label">CÓDIGO</p><span class="code">BLACKOBA27</span>"""
URL = """<p class="url"><span>EN LA WEB · ENLACE EN LA BIO</span>obarestaurante.es/tienda</p>"""

S = {
    # Lunes 23 · lanzamiento
    "1-lun23-black-friday": bg("144", "28% center") + logo() + f"""
<div class="content" style="top:1000px">
  <p class="kicker">BLACK FRIDAY · REGALA OBA-</p>
  <p class="title" style="margin-top:26px">10 %</p>
  <p class="sub" style="margin-top:10px">en todos los bonos y experiencias<br>del 23 al 30 de noviembre</p>
  <div style="margin-top:46px">{CODE}</div>
  <div style="margin-top:56px">{URL}</div>
</div>""",

    # Miércoles 25 · qué regalar, con precios
    "2-mie25-precios": bg("cm", "center 40%", 0.6, 0.15) + logo() + f"""
<div class="content" style="top:930px">
  <p class="kicker" style="margin-bottom:38px">REGALA OBA- CON UN 10 %</p>
  <div class="prices">
    <div class="row"><span>Cuaderno Medio</span><span><s>155 €</s><b>139,50 €</b></span></div>
    <div class="row"><span>Cuaderno Dos</span><span><s>195 €</s><b>175,50 €</b></span></div>
    <div class="row"><span>Cena + hotel</span><span><s>335 €</s><b>301,50 €</b></span></div>
  </div>
  <p class="sub" style="font-size:30px;margin-top:20px;color:rgba(255,255,255,0.6)">Precio por persona · con el código BLACKOBA27</p>
  <div style="margin-top:50px">{URL}</div>
</div>""",

    # Viernes 27 · Black Friday
    "3-vie27-hoy-es-el-dia": bg("galeria", "60% center") + logo() + f"""
<div class="content" style="top:960px">
  <p class="kicker">BLACK FRIDAY</p>
  <p class="title" style="margin-top:24px">Hoy es el día.</p>
  <p class="sub" style="margin-top:22px">10 % en bonos y experiencias.<br>Te llegan al momento por email.</p>
  <div style="margin-top:44px">{CODE}</div>
  <div style="margin-top:54px">{URL}</div>
</div>""",

    # Domingo 29 · últimos días
    "4-dom29-ultimos-dias": bg("078", "center") + logo() + f"""
<div class="content" style="top:960px">
  <p class="kicker">BLACK FRIDAY OBA-</p>
  <p class="title" style="margin-top:24px">Últimos días.</p>
  <p class="sub" style="margin-top:22px">10 % hasta el lunes 30<br>a las 23:59.</p>
  <div style="margin-top:44px">{CODE}</div>
  <div style="margin-top:54px">{URL}</div>
</div>""",
}

def main():
    shutil.rmtree(OUT, ignore_errors=True)
    OUT.mkdir(parents=True)
    TMP.mkdir(exist_ok=True)
    for name, body in S.items():
        h = TMP / f"{name}.html"
        h.write_text(f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>')
        png = OUT / f"{name}.png"
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
                        "--allow-file-access-from-files", "--force-device-scale-factor=1",
                        "--window-size=1080,1920", "--virtual-time-budget=4000",
                        f"--screenshot={png}", h.as_uri()],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(png.relative_to(ROOT))

if __name__ == "__main__":
    main()
