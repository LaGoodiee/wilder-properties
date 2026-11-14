const S=[
{t:"Residential",d:"We help individuals and families find suitable homes and residential investments, weighing location, purpose, budget and long-term value.",l:["Houses","Apartments","Flats","Duplexes","Residential units","Residential land","Acquisition support","Sales and marketing","Rental solutions"]},
{t:"Commercial",d:"We support businesses and investors in finding commercial spaces that match their operational and investment goals.",l:["Office spaces","Shops","Commercial buildings","Business premises","Commercial land","Investment properties","Acquisition and sales","Commercial marketing"]},
{t:"Investment",d:"Real estate can anchor a long-term wealth strategy. We help clients make informed decisions rather than simply facilitating transactions.",l:["Location","Property potential","Market demand","Investment objectives","Rental potential","Long-term appreciation","Development opportunities"]},
{t:"Estate management",d:"Professional oversight for owners who want their assets protected, properly managed and well maintained.",l:["Property supervision","Tenant coordination","Rental administration","Property inspections","Maintenance coordination","Occupancy monitoring","Documentation support","Estate administration","Tenant and provider communication"]},
{t:"Consultancy",d:"Professional guidance before you make an important property decision, so you can act with greater clarity and confidence.",l:["Property acquisition","Property sales","Investment","Rental decisions","Property management","Market opportunities","Property evaluation","Real estate strategy","Development considerations"]}];
const tabs=document.getElementById("tabs"),panel=document.getElementById("panel");
function show(i){[...tabs.children].forEach((b,j)=>b.setAttribute("aria-selected",j===i));const s=S[i];panel.style.animation="none";panel.offsetWidth;panel.style.animation="";panel.innerHTML=`<div><h3>${s.t}</h3><p>${s.d}</p></div><ul>${s.l.map(x=>`<li>${x}</li>`).join("")}</ul>`}
if(tabs){S.forEach((s,i)=>{const b=document.createElement("button");b.className="tab";b.type="button";b.role="tab";b.textContent=s.t;b.onclick=()=>show(i);tabs.appendChild(b)});show(Math.min(+new URLSearchParams(location.search).get("tab")||0,S.length-1))}
const PH="2348100166268";
const CFG=window.WP_CONFIG||{};
const Q={f:"all",loc:"",type:""};let SL=[];try{SL=JSON.parse(localStorage.getItem("wp-sl")||"[]")}catch(e){}
const MD="/media/";
const SEED=[
{k:"sale",b:"For sale",t:"Newly Built 4 Bedroom Duplex",l:"Cocaine Estate Extension B, Okporo, Port Harcourt",p:"₦220m",pn:"asking price",f:["Spacious rooms","Study room","Family lounge","One plot of land","Title: Deed"],d:"1:01",v:MD+"tour-1.mp4",i:MD+"tour-1.jpg"},
{k:"sale",b:"Distress sale",hot:1,t:"Exquisite 6 Bedroom Duplex",l:"Off Sars Road, Port Harcourt",p:"₦100m",pn:"negotiable",f:["Ensuite rooms","Gated, serene estate","1.5 plots"],d:"1:14",v:MD+"tour-2.mp4",i:MD+"tour-2.jpg"},
{k:"sale",b:"Price reduced",t:"Brand New 4 Bedroom Duplex + Service Quarters",l:"Off Circular Road, Alcon, Woji, Port Harcourt",p:"₦480m",old:"₦500m",f:["Service quarters","Secure neighbourhood","2 plots","Deed of Conveyance"],d:"1:23",v:MD+"tour-3.mp4",i:MD+"tour-3.jpg"},
{k:"sale",b:"Investor deal",t:"4 Bedroom Duplex with Gatehouse",l:"Sars Road, Port Harcourt",p:"₦200m",f:["Tarred road","Federal light","Close to major road","300 sqm","Deed of Conveyance"],d:"1:36",v:MD+"tour-4.mp4",i:MD+"tour-4.jpg"},
{k:"tour",b:"New listing",t:"21-Room Property, Igwuruta",l:"Igwuruta, Port Harcourt, Rivers State",p:"Call for price",f:["21 rooms","Interlocked compound","Balconies","Tiled finish"],i:MD+"photo-1.jpg",ph:[MD+"photo-2.jpg"]},
{k:"tour",b:"New listing",t:"4 Bedroom Bungalow, Igwuruta",l:"Igwuruta, Port Harcourt, Rivers State",p:"Call for price",f:["4 bedrooms","Bungalow"],n:"Photo shown is an artist’s impression.",d:"0:12",v:MD+"tour-5.mp4",i:MD+"tour-5.jpg",ph:[MD+"photo-3.jpg"]}];
let PR=SEED,curF="all";
const img=(u,w)=>u?u+"?w="+w+"&auto=format":"";
function fromCMS(s){const ph=(s.photos||[]).map(u=>img(u,900));
return{k:s.status==="sale"||s.status==="rent"?s.status:"tour",b:s.badge||(s.status==="sale"?"For sale":s.status==="rent"?"For rent":"New listing"),hot:s.hot,t:s.title,l:s.location||"",p:s.price||"Call for price",old:s.oldPrice,pn:s.priceNote,f:s.features||[],d:s.duration,n:s.note,v:s.video,i:s.poster?img(s.poster,600):ph[0],ph:s.poster?ph:ph.slice(1)}}
async function loadCMS(){
if(!CFG.projectId)return;
const q='*[_type=="property"&&published!=false]|order(order asc,_createdAt desc){status,badge,hot,title,location,price,oldPrice,priceNote,features,duration,note,"video":video.asset->url,"poster":poster.asset->url,"photos":photos[].asset->url}';
try{const r=await fetch("https://"+CFG.projectId+".apicdn.sanity.io/v2024-01-01/data/query/"+(CFG.dataset||"production")+"?query="+encodeURIComponent(q));
const j=await r.json();if(!Array.isArray(j.result))return;
PR=j.result.map(fromCMS);first=0;draw(curF)}catch(e){console.warn("CMS unavailable, showing built-in listings",e)}}
const pf=document.getElementById("pf"),pg=document.getElementById("pg"),vd=document.getElementById("vd"),vp=document.getElementById("vp");
const FL=[["all","All"],["sale","For sale"],["rent","For rent"]];let first=1;
const wa=t=>`https://wa.me/${PH}?text=`+encodeURIComponent("Hello Wider Properties, I'm interested in: "+t);
const card=x=>{const i=PR.indexOf(x);return `<article class="card rv${first?"":" in"}"><button class="hrt" data-h="${i}" aria-label="Save ${x.t}">${SL.includes(x.t)?"♥":"♡"}</button><button class="thumb" data-i="${i}" ${x.i?`style="background-image:url('${x.i}')"`:""} aria-label="${x.v?"Play video":"View photo"}: ${x.t}"><span class="badge${x.hot?" hot":""}">${x.b}</span>${x.v?`<span class="play"></span>${x.d?`<span class="dur">${x.d}</span>`:""}`:""}</button>${x.ph&&x.ph.length?`<div class="ph">${x.ph.map((s,j)=>`<button data-i="${i}" data-j="${j}" style="background-image:url('${s}')" aria-label="View photo ${j+1}"></button>`).join("")}</div>`:""}<div class="cb"><h3>${x.t}</h3><p class="loc">${x.l}</p><div class="price">${x.p}${x.old?`<s>${x.old}</s>`:""}</div>${x.pn?`<p class="loc" style="margin-top:-8px">${x.pn}</p>`:""}<ul class="ft">${(x.f||[]).map(y=>`<li>${y}</li>`).join("")}</ul>${x.n?`<p class="loc" style="font-size:13px">${x.n}</p>`:""}<div class="ca"><a class="btn gold" href="${wa(x.t)}" target="_blank" rel="noopener">Enquire</a><a class="btn ol" href="tel:+${PH}">Call</a></div></div></article>`};
function drawCar(){const c=document.getElementById("car");if(c)c.innerHTML=PR.slice(0,6).map(card).join("")}
function draw(f){if(f)Q.f=f;curF=Q.f;if(pf)[...pf.children].forEach(b=>b.setAttribute("aria-selected",b.dataset.f===Q.f));
const L=PR.filter(x=>(Q.f==="all"||x.k===Q.f)&&(!Q.loc||(x.l||"").toLowerCase().includes(Q.loc))&&(!Q.type||(x.t+" "+(x.f||[]).join(" ")).toLowerCase().includes(Q.type)));
if(pg)pg.innerHTML=L.length?L.map(card).join(""):`<div class="empty rv${first?"":" in"}"><h3>No properties match yet</h3><p>New listings are added regularly. Tell us what you need and we will help you find it.</p><a class="btn gold" href="${wa("a property matching my search")}" target="_blank" rel="noopener">Tell us what you need</a></div>`;
drawCar();}
if(pf)FL.forEach(([k,n])=>{const b=document.createElement("button");b.className="tab";b.type="button";b.role="tab";b.dataset.f=k;b.textContent=n;b.onclick=()=>draw(k);pf.appendChild(b)});
draw("all");first=0;loadCMS();
const $=id=>document.getElementById(id);
const slc=$("slc"),sdl=$("sdl"),sdw=$("sdw"),sdd=$("sd"),pq=$("pq"),pt=$("pt"),cr=$("car");
const sv=()=>{try{localStorage.setItem("wp-sl",JSON.stringify(SL))}catch(e){}};
function sdr(){slc.textContent=SL.length;sdl.innerHTML=SL.length?SL.map((t,j)=>`<li><span>${t}</span><button data-r="${j}" aria-label="Remove">×</button></li>`).join(""):"<li>Nothing saved yet. Tap the heart on a property.</li>";sdw.href=wa("my shortlist: "+SL.join(", "))}
function togSL(i){const t=PR[i].t,k=SL.indexOf(t);k<0?SL.push(t):SL.splice(k,1);sv();draw();sdr()}
const sync=()=>{if(pq){pq.value=Q.loc;pt.value=Q.type}};
$("sl").onclick=()=>{sdr();sdd.showModal()};$("sdx").onclick=()=>sdd.close();sdd.onclick=e=>{if(e.target===sdd)sdd.close()};
sdl.onclick=e=>{const b=e.target.closest("[data-r]");if(b){SL.splice(+b.dataset.r,1);sv();draw();sdr()}};
if(pq){pq.oninput=()=>{Q.loc=pq.value.trim().toLowerCase();draw()};pt.onchange=()=>{Q.type=pt.value;draw()}}
let ss="sale";const sg=document.querySelectorAll(".seg button");sg.forEach(b=>b.onclick=()=>{ss=b.dataset.s;sg.forEach(x=>x.classList.toggle("on",x===b))});
if($("sf"))$("sf").onsubmit=e=>{e.preventDefault();location.href="/properties?"+new URLSearchParams({s:ss,q:$("sl1").value.trim(),t:$("st").value})};
if(cr){$("cpv").onclick=()=>cr.scrollBy({left:-320,behavior:"smooth"});$("cnx").onclick=()=>cr.scrollBy({left:320,behavior:"smooth"})}
{const u=new URLSearchParams(location.search);if(u.get("s")||u.get("q")||u.get("t")){Q.f=["sale","rent"].includes(u.get("s"))?u.get("s"):"all";Q.loc=(u.get("q")||"").trim().toLowerCase();Q.type=u.get("t")||"";sync();draw()}}
sdr();
const vi=document.getElementById("vi");
const hc=e=>{const hh=e.target.closest(".hrt");if(hh){togSL(+hh.dataset.h);return}const q=e.target.closest(".ph button");if(q){vp.pause();vi.src=PR[q.dataset.i].ph[q.dataset.j];vi.style.display="block";vp.style.display="none";vd.showModal();return}const t=e.target.closest(".thumb");if(!t)return;const x=PR[t.dataset.i];if(!x.v){vp.pause();vi.src=x.i;vi.style.display="block";vp.style.display="none";vd.showModal();return}vi.style.display="none";vp.style.display="block";vp.src=x.v;vp.poster=x.i||"";vd.showModal();vp.play().catch(()=>{})};if(pg)pg.onclick=hc;if(cr)cr.onclick=hc;
const cv=()=>{vp.pause();vp.removeAttribute("src");vp.load();vd.close()};
document.getElementById("vx").onclick=cv;vd.onclick=e=>{if(e.target===vd)cv()};vd.addEventListener("close",()=>vp.pause());
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
const co=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;co.unobserve(x.target);const el=x.target,n=+el.dataset.c;if(rm){el.textContent=n;return}let p=0;const id=setInterval(()=>{p++;el.textContent=Math.min(p,n);if(p>=n)clearInterval(id)},220)}),{threshold:.6});
document.querySelectorAll("[data-c]").forEach(e=>co.observe(e));
const L=document.getElementById("links"),M=document.getElementById("menu");
M.onclick=()=>{const o=L.classList.toggle("open");M.setAttribute("aria-expanded",o)};
L.querySelectorAll("a").forEach(a=>a.onclick=()=>{L.classList.remove("open");M.setAttribute("aria-expanded",false)});
const R=document.documentElement,tg=document.getElementById("tg");
const cur=()=>R.dataset.theme||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
const paint=()=>{const d=cur()==="dark";tg.textContent=d?"☀ Light":"☾ Dark";tg.setAttribute("aria-label",d?"Switch to light mode":"Switch to dark mode")};
try{const s=localStorage.getItem("wp-theme");if(s)R.dataset.theme=s}catch(e){}
tg.onclick=()=>{const n=cur()==="dark"?"light":"dark";R.dataset.theme=n;try{localStorage.setItem("wp-theme",n)}catch(e){}paint()};
paint();
const cf=document.getElementById("f");if(cf)cf.onsubmit=e=>{e.preventDefault();const f=e.target,b=`Name: ${f.n.value}\nPhone: ${f.p.value}\nInterest: ${f.i.value}\n\n${f.m.value}`;document.getElementById("ok").style.display="block";location.href="mailto:widerproperties@yahoo.com?subject="+encodeURIComponent("Enquiry: "+f.i.value)+"&body="+encodeURIComponent(b)};
