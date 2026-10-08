(()=>{
'use strict';
const YT='https://www.youtube.com/watch?v=', TH=id=>`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const LABEL={challenges:'Challenges',food:'Food',interviews:'Interviews'};
/* Every ID below came from a real YouTube watch URL. Add more videos by adding rows here. */
const V=[
{id:'aPwjVQZX0u4',t:'Letting MY DOG Decide What I Eat For 24 Hours!',c:['challenges','food'],d:'The dog picks the menu. Derek eats it for a full day.'},
{id:'iDe9wHWFXy0',t:'A First Date — That Library Show',c:['interviews'],d:'Third chapter with Elle Lee: marriage, kissing and careers, whispered in the library.'},
{id:'V4tRGLoBiQE',t:'Letting YouTube Thumbnails DECIDE What I Eat for 24 Hours!',c:['challenges','food'],d:'Other creators\u2019 thumbnails choose every meal.'},
{id:'65tn_Z9D2jA',t:'We Only Ate T&T For 24 HOURS!',c:['challenges','food'],d:'One grocery store, one day, zero escape routes.'},
{id:'kP_okY2-lJI',t:'My Dad — That Library Show',c:['interviews'],d:'A library interview with his dad.'},
{id:'9wTH9-sjF-M',t:'Letting The Person in Front of Me DECIDE What I Eat for 24 HOURS!',c:['challenges','food'],d:'Drive-thru roulette: whoever is ahead in line orders for him.'},
{id:'IyiArdfb_gA',t:'My Ex — That Library Show',c:['interviews'],d:'An episode of That Library Show.'},
{id:'rJ0To9oMZbE',t:'Letting Stereotypes DECIDE What I Eat for 24 HOURS!',c:['challenges','food'],d:'Only stereotype foods for 24 hours. It gets spicy.'},
{id:'ZGSI9PcSCXs',t:'I Only Ate Foods The WRONG WAY for 24 Hours!',c:['challenges','food'],d:'Every food eaten the way you\u2019re apparently not supposed to.'}];
const SOC=[['YouTube','https://www.youtube.com/results?search_query=Derek+Gerard'],['Instagram','https://www.instagram.com/derek_gerard/'],['X / Twitter','https://x.com/DerekGerard'],['That Library Show on TikTok','https://www.tiktok.com/@thatlibraryshow']];
const PAGES=[['index.html','Home','home'],['videos.html','Videos','videos'],['about.html','About','about'],['community.html','Community','community']];
const $=s=>document.querySelector(s), esc=s=>s.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const cur=document.body.dataset.page;
const links=PAGES.map(p=>`<a href="${p[0]}"${p[2]===cur?' aria-current="page"':''}>${p[1]}</a>`).join('');
$('#site-header').outerHTML=`<header class="top"><div class="wrap"><a class="logo" href="index.html">Derek<b>Gerard</b></a><button class="burger" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav" aria-label="Main">${links}<a class="btn sm" href="community.html">Join the community</a></nav></div></header>`;
$('#site-footer').outerHTML=`<footer><div class="wrap"><div class="cols"><div><a class="logo" href="index.html">Derek<b>Gerard</b></a><p class="mu" style="margin-top:10px;max-width:22em">A fan-made home for the videos, the challenges and the D-Squad.</p></div><div><h4>Pages</h4>${links}</div><div><h4>Find Derek</h4>${SOC.map(s=>`<a href="${s[1]}" target="_blank" rel="noopener">${s[0]} ↗</a>`).join('')}</div></div><small>© ${new Date().getFullYear()} Derek Gerard fan community. Unofficial fan site, not affiliated with or endorsed by Derek Gerard. Video thumbnails and titles belong to their owners.</small></div></footer>`;
const b=$('.burger'),n=$('#nav');
b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
n.addEventListener('click',e=>{if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded',false)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){n.classList.remove('open');b.setAttribute('aria-expanded',false)}});
document.addEventListener('error',e=>{const i=e.target;if(i.tagName==='IMG'&&i.dataset.yt){const d=document.createElement('div');d.className='ph';d.setAttribute('role','img');d.setAttribute('aria-label',i.alt);d.textContent='DG';i.replaceWith(d)}},true);
const img=(v,w)=>`<img data-yt="1" loading="lazy" src="${TH(v.id)}" alt="Thumbnail for ${esc(v.t)}">`;
const watch=v=>`href="${YT+v.id}" target="_blank" rel="noopener"`;
const tags=v=>v.c.map(c=>LABEL[c]).join(' / ');
const card=(v,i)=>`<article class="v" data-i="${i}"><a class="th" ${watch(v)} aria-label="Watch ${esc(v.t)} on YouTube">${img(v)}</a><p class="tag" style="margin-top:12px">${tags(v)}</p><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p><a class="btn sm" ${watch(v)}>Watch ↗</a></article>`;
const by=id=>V.find(v=>v.id===id);
/* HOME */
if($('#collage'))$('#collage').innerHTML=['V4tRGLoBiQE','iDe9wHWFXy0','aPwjVQZX0u4'].map(by).map(v=>`<a ${watch(v)} aria-label="Watch ${esc(v.t)}">${img(v)}</a>`).join('');
if($('#feat')){const big=by('aPwjVQZX0u4'),side=['iDe9wHWFXy0','65tn_Z9D2jA','IyiArdfb_gA'].map(by);
$('#feat').innerHTML=`<div class="v big"><a class="th" ${watch(big)} aria-label="Watch ${esc(big.t)}">${img(big)}</a><p class="tag" style="margin-top:14px">Featured · ${tags(big)}</p><h3>${esc(big.t)}</h3><p>${esc(big.d)}</p><a class="btn" ${watch(big)}>Watch now ↗</a></div><div class="side">${side.map(v=>`<div class="v"><a class="th" ${watch(v)} aria-label="Watch ${esc(v.t)}">${img(v)}</a><div><p class="tag">${tags(v)}</p><h3>${esc(v.t)}</h3><a class="btn sm" ${watch(v)}>Watch ↗</a></div></div>`).join('')}</div>`}
/* VIDEOS */
if($('#vgrid')){const f=$('#filters');let sel='all';
f.innerHTML=[['all','All'],...Object.entries(LABEL)].map(([k,l])=>`<button type="button" data-f="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
const draw=()=>{const L=sel==='all'?V:V.filter(v=>v.c.includes(sel));$('#vgrid').innerHTML=L.length?L.map(card).join(''):'<p class="empty">Nothing here yet.</p>';$('#count').textContent=`${L.length} video${L.length===1?'':'s'}`;f.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.f===sel))};
f.addEventListener('click',e=>{const x=e.target.closest('button');if(x){sel=x.dataset.f;history.replaceState(null,'','#'+sel);draw()}});
const h=location.hash.slice(1);if(h==='all'||LABEL[h])sel=h;draw()}
/* FORM */
const form=$('#joinform');
if(form){const st=$('#status'),btn=$('#send');
const rules={name:v=>v.trim().length<2?'Tell us your name (2+ characters).':'',email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?'':'Enter a valid email like you@example.com.',type:v=>v?'':'Pick your favourite type of video.',message:v=>v.trim().length<10?'Give us at least 10 characters.':v.length>2000?'Max 2000 characters.':''};
const check=k=>{const el=form.elements[k],m=rules[k](el.value);el.classList.toggle('bad',!!m);el.setAttribute('aria-invalid',!!m);$('#e-'+k).textContent=m;return !m};
Object.keys(rules).forEach(k=>form.elements[k].addEventListener('blur',()=>check(k)));
form.addEventListener('submit',async e=>{e.preventDefault();st.className='';st.textContent='';
const ok=Object.keys(rules).map(check).every(Boolean);if(!ok){form.querySelector('.bad').focus();return}
btn.disabled=true;btn.textContent='Sending…';
try{const r=await fetch('api/submit.php',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
let d={};try{d=await r.json()}catch(_){}
if(r.ok&&d.ok){st.className='ok';st.textContent='Got it! Your idea is in. Welcome to the chaos.';form.reset()}
else{if(d.errors)Object.entries(d.errors).forEach(([k,m])=>{if($('#e-'+k)){$('#e-'+k).textContent=m;form.elements[k].classList.add('bad')}});st.className='fail';st.textContent=d.error||'Please fix the highlighted fields.'}}
catch(_){st.className='fail';st.textContent='Could not reach the server. Check your connection and try again.'}
btn.disabled=false;btn.textContent='Submit';st.focus()})}
})();
