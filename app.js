const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (n,min,max)=>Math.min(max,Math.max(min,n));
const sleep = ms => new Promise(r=>setTimeout(r,ms));

// cursor atmosphere
const cursor=document.querySelector('.cursor-glow');
if(!reduced && window.matchMedia('(pointer:fine)').matches){
  addEventListener('pointermove',e=>{cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`},{passive:true});
}

// progress + hero parallax
const progress=document.querySelector('.scroll-progress span');
const heroDevice=document.getElementById('heroDevice');
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=`${max?(scrollY/max)*100:0}%`;
  if(!reduced && heroDevice && scrollY<1000){const p=clamp(scrollY/900,0,1);heroDevice.style.transform=`translateY(${p*20}px) scale(${1-p*.03})`}
}
addEventListener('scroll',onScroll,{passive:true});onScroll();

// reveals
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
document.querySelectorAll('.reveal-up,.reveal-scale,.reveal-word').forEach(el=>revealObserver.observe(el));
addEventListener('load',()=>document.querySelectorAll('.hero .reveal-up,.hero .reveal-scale').forEach((el,i)=>setTimeout(()=>el.classList.add('in'),90+i*120)));

// count-up
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;const el=entry.target,target=Number(el.dataset.to),decimals=Number(el.dataset.decimals||0);
  if(reduced){el.textContent=target.toLocaleString(undefined,{minimumFractionDigits:decimals,maximumFractionDigits:decimals});return}
  const start=performance.now(),dur=1200;const frame=now=>{const t=clamp((now-start)/dur,0,1),eased=1-Math.pow(1-t,3),val=target*eased;el.textContent=val.toLocaleString(undefined,{minimumFractionDigits:decimals,maximumFractionDigits:decimals});if(t<1)requestAnimationFrame(frame)};requestAnimationFrame(frame);countObserver.unobserve(el)
}),{threshold:.55});
document.querySelectorAll('.count').forEach(el=>countObserver.observe(el));

// magnetic buttons
if(!reduced && window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('.magnetic').forEach(btn=>{btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;btn.style.transform=`translate(${x}px,${y}px)`});btn.addEventListener('pointerleave',()=>btn.style.transform='')})}

// hero focus switcher
const HERO={
  production:{label:'PRODUCTION DATA SYSTEMS',title:'Distributed pipelines, rebuilt for speed and reliability.',badge:'GCP / BEAM',kpis:[['Latency','−25%','end to end'],['Compute','−30%','overhead'],['Efficiency','+15%','project support']],a:[38,42,44,50,55,59,65,69,75,79,84,91],b:[41,43,46,49,52,55,58,62,65,68,72,76],toastA:['Pipeline refactor','event-driven execution + autoscaling'],toastB:['Decision layer','forecasting inside production data flows']},
  research:{type:'benchmarks',label:'APPLIED ML RESEARCH',title:'Computer vision recognition with state-of-the-art results on two public benchmarks.',badge:'PYTORCH / VISION',kpis:[['Images','60K+','trained & evaluated'],['CQU-BPDD','SOTA','recognition performance'],['Sampled PaveTrack','SOTA','recognition performance']],toastA:['CQU-BPDD','state-of-the-art recognition'],toastB:['Sampled PaveTrack','state-of-the-art recognition']}
};
const modeBtns=[...document.querySelectorAll('.portfolio-mode')];
function chartPath(arr,w=860,h=330,p=28){const min=Math.min(...arr)-5,max=Math.max(...arr)+5;return arr.map((v,i)=>`${i?'L':'M'}${(p+i*((w-2*p)/(arr.length-1))).toFixed(1)},${(h-p-((v-min)/(max-min))*(h-2*p)).toFixed(1)}`).join(' ')}
function renderHeroMode(key){
  const d=HERO[key];document.getElementById('heroModeLabel').textContent=d.label;document.getElementById('heroModeTitle').textContent=d.title;document.getElementById('heroModeBadge').textContent=d.badge;
  document.getElementById('heroKpis').innerHTML=d.kpis.map(([l,v,s])=>`<div class="portfolio-kpi"><span>${l}</span><b>${v}</b><small>${s}</small></div>`).join('');
  const chart=document.getElementById('heroChart');
  if(d.type==='benchmarks'){
    chart.innerHTML=`
      <defs>
        <linearGradient id="benchmarkFill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6e6cff"/><stop offset="1" stop-color="#2997ff"/></linearGradient>
      </defs>
      <text class="benchmark-eyebrow" x="32" y="45">RECOGNITION BENCHMARKS</text>
      <text class="benchmark-name" x="32" y="96">CQU-BPDD</text>
      <rect class="benchmark-track" x="32" y="116" rx="9" width="700" height="18"/>
      <rect class="benchmark-fill" x="32" y="116" rx="9" width="700" height="18"/>
      <text class="benchmark-sota" x="758" y="131">SOTA</text>
      <text class="benchmark-name" x="32" y="203">Sampled PaveTrack</text>
      <rect class="benchmark-track" x="32" y="223" rx="9" width="700" height="18"/>
      <rect class="benchmark-fill delay" x="32" y="223" rx="9" width="700" height="18"/>
      <text class="benchmark-sota" x="758" y="238">SOTA</text>
      <text class="benchmark-note" x="32" y="292">60K+ pavement images · ablation studies · Grad-CAM validation</text>`;
  }else{
    const all=[...d.a,...d.b],min=Math.min(...all)-5,max=Math.max(...all)+5,y=v=>330-28-((v-min)/(max-min))*(330-56);const area=`${chartPath(d.a)} L832,302 L28,302 Z`;
    const grid=[70,140,210,280].map(yy=>`<line class="gridline" x1="28" y1="${yy}" x2="832" y2="${yy}"/>`).join('');
    chart.innerHTML=`<defs><linearGradient id="careerArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2997ff" stop-opacity=".18"/><stop offset="1" stop-color="#2997ff" stop-opacity="0"/></linearGradient></defs>${grid}<path class="area" d="${area}"/><path class="base-line" d="${chartPath(d.b)}"/><path class="main-line" d="${chartPath(d.a)}"/><circle cx="832" cy="${y(d.a.at(-1))}" r="5" fill="#2997ff"/>`;
  }
  document.querySelector('#heroToastA b').textContent=d.toastA[0];document.querySelector('#heroToastA small').textContent=d.toastA[1];document.querySelector('#heroToastB b').textContent=d.toastB[0];document.querySelector('#heroToastB small').textContent=d.toastB[1];
}
modeBtns.forEach(btn=>btn.addEventListener('click',()=>{modeBtns.forEach(b=>b.classList.toggle('active',b===btn));renderHeroMode(btn.dataset.mode)}));renderHeroMode('production');

// production scrollytelling
const storySteps=[...document.querySelectorAll('.story-step')],storyPanels=[...document.querySelectorAll('.story-card')];
function setStory(i){storySteps.forEach((b,j)=>b.classList.toggle('active',j===i));storyPanels.forEach((p,j)=>p.classList.toggle('active',j===i))}
storySteps.forEach((b,i)=>b.addEventListener('click',()=>setStory(i)));
const careerStory=document.querySelector('.career-story');
if(careerStory&&!reduced){addEventListener('scroll',()=>{const r=careerStory.getBoundingClientRect(),total=Math.max(1,careerStory.offsetHeight-innerHeight*.45),traveled=clamp(-r.top+innerHeight*.18,0,total),idx=clamp(Math.floor((traveled/total)*4),0,3);setStory(idx)},{passive:true})}

// patch grid and CIR animation
const patchGrid=document.getElementById('patchGrid');
for(let i=0;i<54;i++){const p=document.createElement('i');if([8,9,15,16,21,28,34,35,41].includes(i))p.classList.add('hot');patchGrid.appendChild(p)}
const runMil=document.getElementById('runMil'),milStage=document.getElementById('milStage');let milRunning=false;
runMil.addEventListener('click',async()=>{if(milRunning)return;milRunning=true;runMil.disabled=true;milStage.classList.add('running');const patches=[...patchGrid.children];patches.forEach(p=>p.classList.remove('focus'));for(const idx of [8,15,28,34,41]){patches[idx].classList.add('focus');await sleep(100)}await sleep(450);document.getElementById('predictionScore').animate([{transform:'scale(.88)',opacity:.4},{transform:'scale(1)',opacity:1}],{duration:600,easing:'cubic-bezier(.2,.8,.2,1)'});document.getElementById('predictionScore').textContent='0.923';await sleep(700);milStage.classList.remove('running');runMil.disabled=false;milRunning=false});
