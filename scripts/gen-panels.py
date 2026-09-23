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

# 6. Technologies: two sites, not one catalogue.
# The page this sits on exists to send people somewhere else, so the drawing is
# two separate frames and the one link between them. The right hand one is
# outline only: it is not this site, and it is not drawn as though it were.
def technologies(w=1200,h=800):
    im=base(w,h); d=ImageDraw.Draw(im)
    top=int(h*0.14); fh=int(h*0.30)
    def frame(x0,x1,here):
        bar=int(h*0.045)
        a=235 if here else 110
        d.rounded_rectangle([x0,top,x1,top+fh],radius=int(h*0.022),outline=(*BLUE,a),width=4 if here else 3)
        d.line([(x0,top+bar),(x1,top+bar)],fill=(*BLUE,a-40),width=3)
        for i in range(3):
            ly=top+bar+int(fh*(i+1)/4.6)
            lw=(x1-x0)*(0.62 if i%2 else 0.40)
            d.line([(x0+int((x1-x0)*0.10),ly),(x0+int((x1-x0)*0.10)+lw,ly)],fill=(*BLUE,90 if here else 55),width=3)
    ax0,ax1=int(w*0.09),int(w*0.44)
    bx0,bx1=int(w*0.56),int(w*0.91)
    frame(ax0,ax1,True)
    frame(bx0,bx1,False)
    # the one link between them, drawn as a link and nothing more
    my=top+fh//2
    d.line([(ax1+int(w*0.015),my),(bx0-int(w*0.030),my)],fill=(*BLUE,150),width=3)
    d.polygon([(bx0-int(w*0.012),my),(bx0-int(w*0.032),my-int(h*0.018)),(bx0-int(w*0.032),my+int(h*0.018))],fill=(*BLUE,200))
    f=font(int(w/56),True)
    d.text((ax0,top+fh+int(h*0.045)),"raulji.com",font=f,fill=(210,230,245))
    d.text((bx0,top+fh+int(h*0.045)),"rauljitechnologies.com",font=f,fill=(150,195,228))
    return label(im,"On its own domain","Technology work is delivered by Raulji Technologies")

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

# 9. The registration pillar: the four structures, side by side.
# It previously reused the documents drawing, which is what every page below it
# already shows, so the pillar and its four children carried one picture between
# them. This draws what the pillar is for: the choice, not the filing. The
# number of rules inside each card falls from left to right because the annual
# compliance does too, which is what the page says in words.
def structures(w=1600,h=686):
    im=base(w,h); d=ImageDraw.Draw(im)
    names=[("Private Limited",4),("LLP",3),("Partnership",2),("Proprietorship",1)]
    x0,x1=int(w*0.07),int(w*0.93); gap=int(w*0.035)
    cw=(x1-x0-gap*(len(names)-1))//len(names)
    top=int(h*0.13); ch=int(h*0.35)
    for i,(name,rules) in enumerate(names):
        x=x0+i*(cw+gap)
        d.rounded_rectangle([x,top,x+cw,top+ch],radius=int(h*0.035),outline=(*BLUE,175),width=3)
        d.rounded_rectangle([x+int(cw*0.10),top+int(ch*0.16),x+int(cw*0.44),top+int(ch*0.16)+int(h*0.028)],
                            radius=int(h*0.012),fill=(*BLUE,235))
        for k in range(rules):
            ly=top+int(ch*0.42)+k*int(ch*0.13)
            d.line([(x+int(cw*0.10),ly),(x+int(cw*(0.86 if k%2==0 else 0.64)),ly)],fill=(*BLUE,85),width=3)
        d.text((x,top+ch+int(h*0.075)),name,font=font(int(w/54),True),fill=(205,228,244))
    return label(im,"Choosing between them","Liability, annual filing, and whether the business can raise equity")

# 10. Insurance: what the page can honestly claim. Cover is arranged over a
# business; the terms belong to the insurer, and the caption says so rather than
# drawing a guarantee.
def insurance(w=1200,h=800):
    im=base(w,h); d=ImageDraw.Draw(im)
    cx,base_y=int(w*0.70),int(h*0.47)
    bw,bh=int(w*0.15),int(h*0.15)
    d.rounded_rectangle([cx-bw//2,base_y-bh,cx+bw//2,base_y],radius=int(h*0.02),outline=(*BLUE,220),width=4)
    for i in range(2):
        ly=base_y-bh+int(bh*(i+1)/3)
        d.line([(cx-bw//2,ly),(cx+bw//2,ly)],fill=(*BLUE,70),width=2)
    for r,alpha,dash in ((int(w*0.19),200,False),(int(w*0.25),95,True)):
        box=[cx-r,base_y-r,cx+r,base_y+r]
        if not dash:
            d.arc(box,200,340,fill=(*BLUE,alpha),width=5)
        else:
            for a in range(200,340,10):
                d.arc(box,a,a+6,fill=(*BLUE,alpha),width=4)
    d.line([(cx-int(w*0.26),base_y),(cx+int(w*0.26),base_y)],fill=(*BLUE,70),width=3)
    return label(im,"Cover that fits the business","We help arrange it; the insurer sets the terms")

# 11. Compliance: the year, with the dates that come round on it. Not a chart,
# and nothing counted: an annual cycle drawn as an annual cycle.
def compliance(w=1200,h=800):
    im=base(w,h); d=ImageDraw.Draw(im)
    x0,x1=int(w*0.40),int(w*0.93); y=int(h*0.30); bh=int(h*0.095)
    d.rounded_rectangle([x0,y,x1,y+bh],radius=int(h*0.014),outline=(*BLUE,170),width=3)
    seg=(x1-x0)/12
    for i in range(1,12):
        d.line([(x0+int(seg*i),y),(x0+int(seg*i),y+bh)],fill=(*BLUE,55),width=2)
    for i in (2,5,8,10):
        d.rounded_rectangle([x0+int(seg*i)+3,y+3,x0+int(seg*(i+1))-3,y+bh-3],radius=int(h*0.008),fill=(*BLUE,230))
        mx=x0+int(seg*(i+0.5))
        d.polygon([(mx,y-int(h*0.026)),(mx-int(w*0.014),y-int(h*0.070)),(mx+int(w*0.014),y-int(h*0.070))],fill=(*BLUE,170))
    d.line([(x0,y+bh+int(h*0.055)),(x1,y+bh+int(h*0.055))],fill=(*BLUE,45),width=2)
    d.text((x0,y+bh+int(h*0.085)),"One financial year",font=font(int(w/58),True),fill=(150,195,228))
    return label(im,"The filings a year brings","The dates that come round every year")

save(group(),"raulji-group-structure")
save(office(1200,900),"raulji-group-office")
save(consulting(1200,800),"raulji-group-business-consulting")
save(structures(),"raulji-group-company-registration")
save(documents(title="Documents in order",sub="What registration needs"),"raulji-group-documents")
save(meeting(),"raulji-group-client-meeting")
save(gujarat(),"raulji-group-gujarat")
save(technologies(),"raulji-technologies")
save(enquiry(),"raulji-group-enquiry")
save(insurance(),"raulji-group-insurance")
save(compliance(),"raulji-group-compliance")


# ---------------------------------------------------------------------------
# 12-15. The four registration structures, one panel each.
#
# The homepage design brief asks for four distinct visuals on the registration
# cards and is explicit that four generic document images would be wrong. It is
# right: the cards sat on four lucide icons, which told a reader the structures
# were different without ever saying how.
#
# So each panel draws the one thing that actually separates its structure from
# the other three, and nothing else:
#
#   Private Limited  ownership split into transferable share units
#   LLP              two or more partners, each behind a liability shield
#   Partnership      two partners joined by a deed, no shield
#   Proprietorship   one person, who is the business
#
# 4:3 at 800x600. They sit above a card at roughly 380px wide, so they are
# drawn for that size rather than downscaled from a banner.
# ---------------------------------------------------------------------------

def _person(d, cx, cy, r, alpha=255, fill=True):
    """A head and shoulders, drawn small enough to read at card width."""
    col = (*BLUE, alpha)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col if fill else None,
              outline=None if fill else col, width=0 if fill else 3)
    bw, bh = int(r * 2.5), int(r * 1.7)
    box = [cx - bw // 2, cy + int(r * 1.15), cx + bw // 2, cy + int(r * 1.15) + bh * 2]
    if fill:
        d.pieslice(box, 180, 360, fill=col)
    else:
        d.arc(box, 180, 360, fill=col, width=3)


def pvt_card(w=800, h=600):
    """Ownership as share units: divisible, countable, transferable."""
    im = base(w, h); d = ImageDraw.Draw(im)
    cols, rows = 4, 3
    gw, gh = int(w * 0.46), int(h * 0.34)
    x0, y0 = int(w * 0.46), int(h * 0.17)
    cw, ch = gw // cols, gh // rows
    for i in range(rows):
        for j in range(cols):
            x, y = x0 + j * cw, y0 + i * ch
            # A minority of units filled: shares issued against shares authorised.
            on = (i * cols + j) in (0, 1, 4, 5, 8)
            d.rounded_rectangle([x + 3, y + 3, x + cw - 5, y + ch - 5],
                                radius=int(h * 0.012),
                                fill=(*BLUE, 225) if on else None,
                                outline=(*BLUE, 70) if not on else None,
                                width=0 if on else 3)
    # The company itself: one boundary around the units, separate from its owners.
    d.rounded_rectangle([x0 - int(w * 0.03), y0 - int(h * 0.05),
                         x0 + gw + int(w * 0.012), y0 + gh + int(h * 0.035)],
                        radius=int(h * 0.03), outline=(*BLUE, 120), width=3)
    return label(im, "Shares, not just owners", "Private Limited Company")


def llp_card(w=800, h=600):
    """Partners with a liability shield between them and the business."""
    im = base(w, h); d = ImageDraw.Draw(im)
    cx, cy = int(w * 0.68), int(h * 0.24)
    for dx in (-int(w * 0.10), int(w * 0.10)):
        _person(d, cx + dx, cy, int(w / 34))
    # The shield: an arc the partners stand behind. Its apex is set below the
    # shoulders rather than measured from the heads, because an arc drawn from
    # the head position cuts straight through both figures.
    apex = int(h * 0.455)
    box = [cx - int(w * 0.185), apex, cx + int(w * 0.185), apex + int(h * 0.22)]
    d.arc(box, 200, 340, fill=(*BLUE, 235), width=5)
    mid = apex + int(h * 0.11)
    d.line([(cx - int(w * 0.181), mid), (cx + int(w * 0.181), mid)], fill=(*BLUE, 235), width=5)
    return label(im, "Partners, liability capped", "Limited Liability Partnership")


def partnership_card(w=800, h=600):
    """Two partners joined by a deed. The same people, with no shield."""
    im = base(w, h); d = ImageDraw.Draw(im)
    cx, cy = int(w * 0.68), int(h * 0.27)
    ax, bx = cx - int(w * 0.11), cx + int(w * 0.11)
    for px in (ax, bx):
        _person(d, px, cy, int(w / 34))
    # The deed between them: a sheet with a signature rule on it.
    dw, dh = int(w * 0.20), int(h * 0.15)
    dx, dy = cx - dw // 2, cy + int(h * 0.26)
    d.rectangle([dx, dy, dx + dw, dy + dh], outline=(*BLUE, 235), width=4)
    for i in range(3):
        ly = dy + int(dh * (i + 1) / 4.6)
        d.line([(dx + int(dw * 0.16), ly), (dx + int(dw * (0.84 if i < 2 else 0.55)), ly)],
               fill=(*BLUE, 95), width=3)
    for px in (ax, bx):
        d.line([(px, cy + int(h * 0.15)), (px, dy), (cx + (dw // 2 if px > cx else -dw // 2), dy)],
               fill=(*BLUE, 110), width=3)
    return label(im, "An agreement between partners", "Partnership Firm")


def proprietorship_card(w=800, h=600):
    """One person and the business as the same legal thing."""
    im = base(w, h); d = ImageDraw.Draw(im)
    cx, cy = int(w * 0.66), int(h * 0.26)
    pr = int(w / 27)
    _person(d, cx, cy, pr)
    # One ring around the single owner: the person and the business, undivided.
    #
    # The rings are centred on the figure's optical centre, not on the head. A
    # head-centred ring sits high and reads as a misalignment rather than as an
    # enclosure. There is no baseline rule here either: at this radius it cut
    # straight through both rings.
    ring_cy = cy + int(pr * 1.78)
    for r, a in ((int(w * 0.150), 215), (int(w * 0.200), 80)):
        d.ellipse([cx - r, ring_cy - r, cx + r, ring_cy + r],
                  outline=(*BLUE, a), width=4 if a > 150 else 3)
    return label(im, "One owner, one entity", "Proprietorship")


save(pvt_card(), "private-limited-company-registration")
save(llp_card(), "llp-registration-india")
save(partnership_card(), "partnership-firm-registration")
save(proprietorship_card(), "proprietorship-registration")


# ---------------------------------------------------------------------------
# 16. Hero panel, 16:9.
#
# The hero used to carry an inline SVG that was hidden below md, so a phone got
# the headline and nothing else. The design brief asks for a real 16:9 image
# there, loaded with priority, visible at every width.
#
# It is the group drawing rather than a new one: the hero's job is to say what
# Raulji Group is and that it runs two brands, and that is exactly what this
# already draws. Rendered at 16:9 rather than cropped from the 21:9 version,
# because object-cover on the wide file cuts the caption off the left edge.
# ---------------------------------------------------------------------------

save(group(1200, 675), "raulji-group-hero")
