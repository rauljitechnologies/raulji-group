from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, math, random
os.chdir("/Users/yuvrajsinhraulji/Documents/GitHub/raulji-next")
random.seed(7)

NAVY=(20,34,54); DEEP=(12,21,34); BLUE=(49,153,212); WHITE=(255,255,255)
def font(sz, bold=False):
    p="/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf"
    return ImageFont.truetype(p, sz) if os.path.exists(p) else ImageFont.load_default()
mark = Image.open("public/favicon.png").convert("RGBA")

def sky(w,h,top=(16,28,46),bot=(38,74,110)):
    im=Image.new("RGB",(w,h)); d=ImageDraw.Draw(im)
    for y in range(h):
        t=(y/h)**0.8
        d.line([(0,y),(w,y)],fill=tuple(int(top[i]+(bot[i]-top[i])*t) for i in range(3)))
    return im

def glow(im, cx, cy, r, colour=(90,170,220), strength=70):
    w,h=im.size
    g=Image.new("RGB",(w,h),(0,0,0)); gd=ImageDraw.Draw(g)
    gd.ellipse([cx-r,cy-r,cx+r,cy+r],fill=colour)
    g=g.filter(ImageFilter.GaussianBlur(r*0.55))
    return Image.blend(im,Image.blend(im,g,0.45),strength/100)

def skyline(im, base_y, seed, near=True):
    """Layered building silhouettes. Near layer darker and taller."""
    w,h=im.size; d=ImageDraw.Draw(im,"RGBA")
    rnd=random.Random(seed); x=-int(w*0.05)
    shade=(10,18,30,255) if near else (24,42,64,220)
    while x < w*1.05:
        bw=rnd.randint(int(w*0.035), int(w*0.085))
        bh=rnd.randint(int(h*(0.30 if near else 0.20)), int(h*(0.62 if near else 0.44)))
        top=base_y-bh
        d.rectangle([x,top,x+bw,base_y],fill=shade)
        if rnd.random()<0.35:  # roof plant
            d.rectangle([x+bw*0.3,top-int(h*0.02),x+bw*0.55,top],fill=shade)
        # lit windows
        cols=max(2,bw//int(w*0.014)); rows=max(2,bh//int(h*0.035))
        for c in range(cols):
            for r_ in range(rows):
                if rnd.random()<(0.30 if near else 0.18):
                    wx=x+int(bw*(c+0.5)/cols); wy=top+int(bh*(r_+0.5)/rows)
                    s=max(1,int(w*0.0035))
                    a=rnd.choice([210,150,110])
                    d.rectangle([wx-s,wy-s,wx+s,wy+s],fill=(*BLUE,a))
        x += bw + rnd.randint(int(w*0.004), int(w*0.016))
    return im

def grain(im, amount=6):
    w,h=im.size
    n=Image.effect_noise((w,h), amount).convert("L").point(lambda v: 128+(v-128)*0.5)
    return Image.blend(im, Image.merge("RGB",(n,n,n)), 0.045)

def label(im,title,sub):
    w,h=im.size
    # readability scrim under the type
    sc=Image.new("RGBA",(w,h),(0,0,0,0)); sd=ImageDraw.Draw(sc)
    for i in range(int(h*0.42)):
        y=h-1-i; a=int(150*(i/(h*0.42))**1.4)
        sd.line([(0,y),(w,y)],fill=(8,14,24,a))
    im=Image.alpha_composite(im.convert("RGBA"),sc)
    d=ImageDraw.Draw(im)
    d.text((int(w*0.06),int(h*0.735)),title,font=font(int(w/21),True),fill=WHITE)
    d.text((int(w*0.06),int(h*0.735)+int(w/17)),sub,font=font(int(w/52)),fill=(165,205,232))
    m=mark.resize((int(w/19),int(w/19)),Image.LANCZOS)
    im.alpha_composite(m,(w-int(w/19)-int(w*0.05),h-int(w/19)-int(w*0.07)))
    return im.convert("RGB")

def save(im,name):
    im.save(f"public/photos/{name}.webp","WEBP",quality=86,method=6)
    print(f"{name}.webp {im.size[0]}x{im.size[1]} {os.path.getsize(f'public/photos/{name}.webp')//1024}KB")

def city(w,h,title,sub,seed):
    im=sky(w,h)
    im=glow(im,int(w*0.70),int(h*0.26),int(h*0.55))
    im=skyline(im,int(h*0.90),seed+1,near=False)
    im=skyline(im,int(h*1.0),seed,near=True)
    d=ImageDraw.Draw(im,"RGBA")
    d.rectangle([0,int(h*0.90),w,int(h*0.906)],fill=(*BLUE,45))
    im=grain(im)
    return label(im,title,sub)

save(city(1600,686,"Vadodara, Gujarat","Raulji Group",11),"raulji-group-office")
save(city(1600,900,"Business across Gujarat","Filed online, served statewide",31),"raulji-group-gujarat")
