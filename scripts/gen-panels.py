from PIL import Image, ImageDraw, ImageFont
import os, math
os.chdir("/Users/yuvrajsinhraulji/Documents/GitHub/raulji-next")

NAVY=(25,42,66); NAVY_D=(15,26,42); BLUE=(49,153,212); WHITE=(255,255,255)
def font(sz, bold=False):
    p = "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf"
    return ImageFont.truetype(p, sz) if os.path.exists(p) else ImageFont.load_default()
mark = Image.open("public/favicon.png").convert("RGBA")

def base(w,h):
    im = Image.new("RGBA",(w,h),NAVY); d=ImageDraw.Draw(im)
    for i in range(h):
        t=i/h
        d.line([(0,i),(w,i)],fill=(int(NAVY[0]+(NAVY_D[0]-NAVY[0])*t),int(NAVY[1]+(NAVY_D[1]-NAVY[1])*t),int(NAVY[2]+(NAVY_D[2]-NAVY[2])*t),255))
    g=Image.new("RGBA",(w,h),(0,0,0,0)); gd=ImageDraw.Draw(g); step=w//20
    for x in range(0,w,step): gd.line([(x,0),(x,h)],fill=(255,255,255,12))
    for y in range(0,h,step): gd.line([(0,y),(w,y)],fill=(255,255,255,12))
    return Image.alpha_composite(im,g)

def label(im,title,sub):
    w,h=im.size; d=ImageDraw.Draw(im)
    d.text((int(w*0.07),int(h*0.71)),title,font=font(int(w/23),True),fill=WHITE)
    d.text((int(w*0.07),int(h*0.71)+int(w/19)),sub,font=font(int(w/54)),fill=(150,195,228))
    m=mark.resize((int(w/18),int(w/18)),Image.LANCZOS)
    im.alpha_composite(m,(w-int(w/18)-int(w*0.05),h-int(w/18)-int(w*0.07)))
    return im

def save(im,name):
    im.convert("RGB").save(f"public/photos/{name}.webp","WEBP",quality=88,method=6)
    print(f"{name}.webp {im.size[0]}x{im.size[1]} {os.path.getsize(f'public/photos/{name}.webp')//1024}KB")

# 1. Office / corporate: an elevation of stacked floors, drawn as architecture.
def office(w=1600,h=900):
    im=base(w,h); d=ImageDraw.Draw(im)
    bx,by=int(w*0.60),int(h*0.14); bw,bh=int(w*0.30),int(h*0.52)
    d.rectangle([bx,by,bx+bw,by+bh],outline=(*BLUE,150),width=3)
    floors=7
    for i in range(1,floors):
        y=by+int(bh*i/floors); d.line([(bx,y),(bx+bw,y)],fill=(*BLUE,70),width=2)
    for i in range(floors):
        for j in range(4):
            x=bx+int(bw*(j+0.5)/4); y=by+int(bh*(i+0.5)/floors)
            s=int(w/150)
            fill=(*BLUE,200) if (i*4+j)%3==0 else (*BLUE,60)
            d.rectangle([x-s,y-s,x+s,y+s],fill=fill)
    d.line([(int(w*0.07),by+bh),(bx+bw,by+bh)],fill=(*BLUE,120),width=3)
    return label(im,"Vadodara, Gujarat","Raulji Group")

# 2. Consulting: two routes from the same starting point. The wandering one is
# what happens without advice; the direct one is what the section is selling.
# Deliberately not another hub and spokes, which the Gujarat panel already uses.
def consulting(w=1200,h=800):
    import math
    im=base(w,h); d=ImageDraw.Draw(im)
    x0,y0=int(w*0.14),int(h*0.55)
    x1,y1=int(w*0.88),int(h*0.20)

    # the wandering route: dotted, drifting, arriving late and low
    pts=[(x0,y0)]
    for i in range(1,9):
        t=i/8
        px=x0+(x1-x0)*t
        py=y0-(y0-y1)*t*0.45 + int(math.sin(t*9.0)*h*0.085)
        pts.append((px,py))
    for i in range(len(pts)-1):
        ax,ay=pts[i]; bx,by=pts[i+1]
        steps=14
        for k in range(steps):
            if k%2: continue
            fx=ax+(bx-ax)*k/steps; fy=ay+(by-ay)*k/steps
            gx=ax+(bx-ax)*(k+1)/steps; gy=ay+(by-ay)*(k+1)/steps
            d.line([(fx,fy),(gx,gy)],fill=(*BLUE,70),width=3)
    ex,ey=pts[-1]; rr=int(w/95)
    d.ellipse([ex-rr,ey-rr,ex+rr,ey+rr],outline=(*BLUE,110),width=3)

    # the considered route: one clean rise through three waypoints
    way=[(x0,y0),
         (int(x0+(x1-x0)*0.34), int(y0-(y0-y1)*0.30)),
         (int(x0+(x1-x0)*0.67), int(y0-(y0-y1)*0.70)),
         (x1,y1)]
    for i in range(len(way)-1):
        d.line([way[i],way[i+1]],fill=(*BLUE,235),width=5)
    for i,(px,py) in enumerate(way):
        r=int(w/46) if i in (0,len(way)-1) else int(w/74)
        d.ellipse([px-r,py-r,px+r,py+r],fill=(*BLUE,255))
        if i==len(way)-1:
            d.ellipse([px-r*2,py-r*2,px+r*2,py+r*2],outline=(*BLUE,90),width=3)

    # the decision itself, marked where the two routes part
    d.line([(x0,int(h*0.12)),(x0,int(h*0.63))],fill=(255,255,255,26),width=2)
    return label(im,"Clearer decisions","Stronger business direction")

# 3. Registration / documents: stacked sheets with a seal.
def documents(w=1200,h=800,title="Filed correctly",sub="Company registration"):
    im=base(w,h); d=ImageDraw.Draw(im)
    x,y,pw,ph=int(w*0.58),int(h*0.13),int(w*0.30),int(h*0.44)
    for off in (int(w*0.035),int(w*0.018),0):
        a=90 if off else 255
        d.rectangle([x+off,y+off,x+off+pw,y+off+ph],outline=(*BLUE,a),width=3)
    for i in range(6):
        ly=y+int(ph*(i+1.4)/9); lw=pw*(0.7 if i%3 else 0.45)
        d.line([(x+int(pw*0.12),ly),(x+int(pw*0.12)+lw,ly)],fill=(*BLUE,80),width=3)
    sx,sy,sr=x+pw-int(w*0.05),y+ph-int(h*0.07),int(w/34)
    d.ellipse([sx-sr,sy-sr,sx+sr,sy+sr],fill=(*BLUE,255))
    d.line([(sx-sr*0.4,sy),(sx-sr*0.1,sy+sr*0.35),(sx+sr*0.45,sy-sr*0.35)],fill=NAVY,width=4)
    return label(im,title,sub)

# 4. Contact: one thread, not a switchboard. A single line runs from the person
# asking to the person doing the work, past the handoffs it does not make.
def meeting(w=1200,h=800):
    im=base(w,h); d=ImageDraw.Draw(im)
    ax,ay=int(w*0.20),int(h*0.34)
    bx,by=int(w*0.80),int(h*0.34)
    # the single thread
    d.line([(ax,ay),(bx,by)],fill=(*BLUE,235),width=5)
    for px,py in ((ax,ay),(bx,by)):
        r=int(w/26)
        d.ellipse([px-r,py-r,px+r,py+r],fill=(*BLUE,255))
        d.ellipse([px-int(r*1.7),py-int(r*1.7),px+int(r*1.7),py+int(r*1.7)],outline=(*BLUE,80),width=3)
    # a message on the line
    mx,my=int(w*0.50),ay; mw,mh=int(w*0.11),int(h*0.075)
    d.rounded_rectangle([mx-mw//2,my-mh//2,mx+mw//2,my+mh//2],radius=int(h*0.018),fill=(*BLUE,255))
    d.polygon([(mx-int(mw*0.10),my+mh//2),(mx+int(mw*0.10),my+mh//2),(mx,my+mh//2+int(h*0.030))],fill=(*BLUE,255))
    return label(im,"One conversation","You reach the people doing the work")

# 5. Gujarat: the coverage figure, centre and markets.
def gujarat(w=1600,h=900):
    im=base(w,h); d=ImageDraw.Draw(im)
    cx,cy,r=int(w*0.72),int(h*0.38),int(h*0.26)
    d.ellipse([cx-r,cy-r,cx+r,cy+r],outline=(*BLUE,60),width=2)
    d.ellipse([cx-r//2,cy-r//2,cx+r//2,cy+r//2],outline=(*BLUE,40),width=2)
    for i in range(8):
        a=i/8*2*math.pi-math.pi/2
        px,py=cx+int(math.cos(a)*r),cy+int(math.sin(a)*r)
        d.line([(cx,cy),(px,py)],fill=(*BLUE,70),width=2)
        rr=int(w/130); d.ellipse([px-rr,py-rr,px+rr,py+rr],fill=(*BLUE,220))
    cr=int(w/26); d.ellipse([cx-cr,cy-cr,cx+cr,cy+cr],fill=(*BLUE,255))
    return label(im,"Across Gujarat","Filed online from Vadodara")

# 6. Technologies: the separate brand, shown as a second node.
def technologies(w=1200,h=800):
    im=base(w,h); d=ImageDraw.Draw(im)
    y=int(h*0.34); ax,bx=int(w*0.56),int(w*0.84); r=int(w/22)
    d.line([(ax+r,y),(bx-r,y)],fill=(*BLUE,110),width=3)
    d.ellipse([ax-r,y-r,ax+r,y+r],outline=(*BLUE,220),width=4)
    d.ellipse([bx-r,y-r,bx+r,y+r],fill=(*BLUE,255))
    for i in range(3):
        yy=y+int(h*0.16)+i*int(h*0.06)
        d.line([(bx-r,yy),(bx+r,yy)],fill=(*BLUE,70),width=2)
    return label(im,"Raulji Technologies","A separate technology brand")

# 7. Enquiry: a form and a reply.
def enquiry(w=1200,h=800):
    im=base(w,h); d=ImageDraw.Draw(im)
    x,y,fw,fh=int(w*0.58),int(h*0.15),int(w*0.32),int(h*0.40)
    d.rounded_rectangle([x,y,x+fw,y+fh],radius=int(h*0.03),outline=(*BLUE,200),width=3)
    for i in range(4):
        ly=y+int(fh*(i+1)/5.5)
        d.rounded_rectangle([x+int(fw*0.08),ly,x+int(fw*(0.55 if i%2 else 0.82)),ly+int(h*0.035)],radius=int(h*0.015),fill=(*BLUE,60))
    bx2=x+int(fw*0.08); by2=y+fh-int(h*0.10)
    d.rounded_rectangle([bx2,by2,bx2+int(fw*0.44),by2+int(h*0.06)],radius=int(h*0.015),fill=(*BLUE,255))
    return label(im,"Tell us what you are building","Get business guidance")

# 8. The group itself: one parent, two brands, drawn wide for a page band.
def group(w=1800,h=771):
    im=base(w,h); d=ImageDraw.Draw(im)
    px,py=int(w*0.30),int(h*0.42); pr=int(w/26)
    d.ellipse([px-pr,py-pr,px+pr,py+pr],fill=(*BLUE,255))
    d.ellipse([px-int(pr*1.8),py-int(pr*1.8),px+int(pr*1.8),py+int(pr*1.8)],outline=(*BLUE,70),width=3)
    for fy,lbl in ((0.22,"Consulting Services"),(0.62,"Technologies")):
        cx,cy=int(w*0.66),int(h*fy); cr=int(w/40)
        d.line([(px+pr,py),(cx-cr,cy)],fill=(*BLUE,120),width=4)
        if lbl=="Technologies":
            d.ellipse([cx-cr,cy-cr,cx+cr,cy+cr],outline=(*BLUE,220),width=4)
        else:
            d.ellipse([cx-cr,cy-cr,cx+cr,cy+cr],fill=(*BLUE,220))
        d.text((cx+int(cr*1.8),cy-int(h*0.028)),lbl,font=font(int(w/56),True),fill=(205,228,244))
    d.text((px-int(pr*2.4),py-int(h*0.20)),"Raulji Group",font=font(int(w/48),True),fill=(255,255,255))
    return label(im,"One group, two brands","Kept separate because they do different work")

save(group(),"raulji-group-structure")
save(office(1200,900),"raulji-group-office")
save(consulting(1200,800),"raulji-group-business-consulting")
save(documents(1600,686,title="Filed correctly",sub="Company registration"),"raulji-group-company-registration")
save(documents(title="Documents in order",sub="What registration needs"),"raulji-group-documents")
save(meeting(),"raulji-group-client-meeting")
save(gujarat(),"raulji-group-gujarat")
save(technologies(),"raulji-technologies")
save(enquiry(),"raulji-group-enquiry")
