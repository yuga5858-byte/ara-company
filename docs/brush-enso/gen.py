# 筆の円相のかたちを作る（決まった乱数で毎回同じかたち）。出力は SVG のパスデータ。
import math, random, json
random.seed(11)
C=(300,300); R=232; N=420
a0=math.radians(-62); sweep=math.radians(338)
def center(t):
    a=a0+sweep*t
    r=R  # まん丸（中心 300,300）
    return (C[0]+r*math.cos(a), C[1]+r*math.sin(a))
def width(t):
    if t<0.04: return 18+ (t/0.04)*30           # 入り：押しつけて太く
    if t<0.12: return 48-(t-0.04)/0.08*10          # 押しつけた墨だまり
    if t<0.62: return 38-(t-0.12)/0.5*12           # 運び
    if t<0.86: return 26-(t-0.62)/0.24*18          # 細くなる
    return max(1.5, 8-(t-0.86)/0.14*7)             # 抜け
pts=[center(i/N) for i in range(N+1)]
def normal(i):
    j=min(N,i+1); k=max(0,i-1)
    dx=pts[j][0]-pts[k][0]; dy=pts[j][1]-pts[k][1]; L=math.hypot(dx,dy) or 1
    return (-dy/L, dx/L)
def f(v): return f"{v:.1f}"
# 本体：太さの変わる帯（縁を少し揺らす）
L=[];Rr=[]
for i,(x,y) in enumerate(pts):
    t=i/N; w=width(t)*(1+0.06*math.sin(i*0.9)+0.04*random.uniform(-1,1)); nx,ny=normal(i)
    L.append((x+nx*w/2, y+ny*w/2)); Rr.append((x-nx*w*0.5*(0.92+0.1*math.sin(i*0.37)), y-ny*w*0.5*(0.92+0.1*math.sin(i*0.37))))
body_end=int(N*0.9)
poly=L[:body_end:2]+Rr[:body_end:2][::-1]
body="M"+" L".join(f"{f(x)} {f(y)}" for x,y in poly)+" Z"
# 毛先のすじ（かすれ）：帯の中の決まった位置をなぞる細い線。後半ほど途切れて、帯の外まで伸びる
bristles=[]
for b in range(16):
    off=random.uniform(-0.5,0.5); start=random.uniform(0.02,0.25); end=random.uniform(0.86,1.0)
    sw=random.uniform(0.7,2.2); op=random.uniform(0.5,0.95)
    segs=[]; cur=[]
    for i in range(int(start*N), int(end*N)+1, 2):
        t=i/N; x,y=pts[i]; nx,ny=normal(i); w=max(width(t),6)
        o=off*w*(1+max(0,t-0.6)*1.4)   # 抜けに向かって毛先が開く
        p=(x+nx*o, y+ny*o)
        gap_p = 0.02 + max(0,t-0.55)*0.9   # 後半ほど途切れやすい
        if random.random()<gap_p:
            if len(cur)>2: segs.append(cur)
            cur=[]
        else: cur.append(p)
    if len(cur)>2: segs.append(cur)
    d=" ".join("M"+" L".join(f"{f(x)} {f(y)}" for x,y in s) for s in segs)
    bristles.append({"d":d,"w":round(sw,2),"o":round(op,2)})
# 中心線（描く順番に見せるためのマスク用）
cl="M"+" L".join(f"{f(x)} {f(y)}" for x,y in pts[::3])
# 入りの墨の飛び
dots=[]
for k in range(7):
    i=random.randint(0,int(N*0.08)); x,y=pts[i]; nx,ny=normal(i); d=random.uniform(28,52)*random.choice([-1,1])
    dots.append({"cx":round(x+nx*d+random.uniform(-6,6),1),"cy":round(y+ny*d+random.uniform(-6,6),1),"r":round(random.uniform(0.8,2.6),1)})
# 筆の入り：押しつけた丸い墨だまり
x0,y0=pts[int(N*0.035)]
blob={"cx":round(x0,1),"cy":round(y0,1),"rx":26,"ry":22}
# かすれ：帯の中に墨黒の細いすじを入れ、後半ほど増やして乾いた筆の割れを出す
dry=[]
for b in range(22):
    off=random.uniform(-0.42,0.42); start=random.uniform(0.3,0.7); end=min(0.9, start+random.uniform(0.15,0.45))
    segs=[];cur=[]
    for i in range(int(start*N), int(end*N)+1, 2):
        t=i/N; x,y=pts[i]; nx,ny=normal(i); w=width(t)
        p=(x+nx*off*w, y+ny*off*w)
        if random.random()<0.06:
            if len(cur)>2: segs.append(cur)
            cur=[]
        else: cur.append(p)
    if len(cur)>2: segs.append(cur)
    d=" ".join("M"+" L".join(f"{f(x)} {f(y)}" for x,y in s) for s in segs)
    dry.append({"d":d,"w":round(random.uniform(0.6,1.8),2),"o":round(random.uniform(0.45,0.9),2)})
json.dump({"body":body,"bristles":bristles,"dry":dry,"blob":blob,"center":cl,"dots":dots},open("brush.json","w"))
print(len(body), sum(len(b["d"]) for b in bristles), len(cl))
