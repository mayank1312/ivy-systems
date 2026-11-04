document.documentElement.classList.add('js');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,root=document.documentElement;
const ai=s=>s;
/* theme: separate light and dark */
const tt=$('#tt'),paint=()=>tt.textContent=root.dataset.theme=='dark'?'☀':'☾';paint();
tt.onclick=()=>{const t=root.dataset.theme=='dark'?'light':'dark';root.dataset.theme=t;try{localStorage.setItem('t',t)}catch(e){}paint()};
/* Lenis smooth scrolling: loaded in the background, so the site works even if the CDN is slow or blocked */
let lenis;
if(!reduce){const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js';s.async=true;s.onload=()=>{if(!window.Lenis)return;lenis=new Lenis({lerp:.09});const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf)};document.head.appendChild(s)}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.hash.length<2)return;const t=$(a.hash);if(!t)return;e.preventDefault();lenis?lenis.scrollTo(t,{offset:-80}):t.scrollIntoView({behavior:reduce?'auto':'smooth'})});
/* lazy reveal on scroll: plain position check (no observer), so nothing can stay hidden */
const reveal=()=>$$('.rv:not(.in)').forEach(n=>{if(n.getBoundingClientRect().top<innerHeight*.94)n.classList.add('in')});
['scroll','resize','load'].forEach(ev=>addEventListener(ev,reveal,{passive:true}));reveal();setInterval(reveal,300);
/* live demos: each one plays a short scripted story. Steps add cumulative classes s1, s2, s3 that CSS reacts to */
const D={
os:[[500,'AI Guard is watching 214 live processes'],[1300,'Unsigned process svch0st_update.exe started from the Temp folder','s1','warn'],[1500,'Mass file renaming detected: ransomware behaviour','s2','bad'],[1400,'Process quarantined, device isolated, files restored','s3','good']],
home:[[500,'Camera 2 · back door · watching'],[900,'Movement detected after midnight','s1','warn'],[1800,'AI sees an unknown person at the door','s2','bad'],[900,'Instant alert with video clip sent to the owner’s phone','s3','good']],
pay:[[500,'AI is scoring every payment in real time'],[900,'₹48,500 payment from a new device at 3:02 AM','s1','warn'],[1200,'Risk 94%: new device, odd hour, password reset 4 minutes ago','s2','bad'],[1000,'Payment held, customer asked to confirm','s3','good']]};
function play(id){const d=$('#d-'+id),l=$('.log',d);(d._t||[]).forEach(clearTimeout);d.className='demo';l.innerHTML='';let t=0;d._t=D[id].map(([ms,txt,c,k])=>setTimeout(()=>{l.insertAdjacentHTML('beforeend',`<li class="${k||''}">${ai(txt)}</li>`);c&&d.classList.add(c)},t+=ms))}
$$('#tabs button').forEach(b=>b.onclick=()=>{$$('#tabs button').forEach(x=>x.classList.toggle('on',x==b));$$('.demo').forEach(d=>d.hidden=d.id!='d-'+b.dataset.d);D[b.dataset.d]&&play(b.dataset.d)});
$$('.run').forEach(b=>b.onclick=()=>play(b.closest('.demo').id.slice(2)));
const demos=$('#demos');if(demos)new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){play('os');o.disconnect()}},{threshold:.25}).observe(demos);
const PL=[['Arjun','5.8 km','31 km/h','12 sprints','Fatigue rising after 38 minutes'],['Meera','5.1 km','28 km/h','9 sprints','Strong positioning, slow to the left side'],['Kabir','6.2 km','33 km/h','15 sprints','Best workload of the session'],['Sana','4.7 km','27 km/h','8 sprints','Backhand errors up 20%']];
$$('.pl').forEach((g,i)=>g.onclick=()=>{$$('.pl').forEach(x=>x.classList.toggle('sel',x==g));const p=PL[i];$('#stat').innerHTML=`<b>${p[0]}</b><span>Distance ${p[1]}</span><span>Top speed ${p[2]}</span><span>${p[3]}</span><em>${p[4]}</em><small>Sample data</small>`});
/* contact form (front end only: connect it to your backend or email service) */
const f=$('#form');if(f)f.onsubmit=e=>{e.preventDefault();const ok=$('#nm').value.trim()&&/.+@.+\..+/.test($('#em').value.trim());$('#msg').textContent=ok?'Thank you! Our team will get back to you shortly.':'Please add your name and a valid email.'};
