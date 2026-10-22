'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const INR = new Intl.NumberFormat('en-IN', {style:'currency',currency:'INR',maximumFractionDigits:0});
const accountViews = {
 campaigns: {label:'Campaign name', rows:[['Hritik Raj · Performance marketer','Open to roles']],note:'The campaign is me. The objective: earn your confidence through thoughtful work.'},
 adsets: {label:'Skills I am building', rows:[['Audience research','Research'],['Creative strategy & copy','Create'],['Campaign planning','Test']],note:'My ad sets are the skills I’m developing through practice and structured learning.'},
 ads: {label:'Independent projects',rows:campaigns.map(c=>[c.name,'Study']),note:'My ads are the projects. Open a campaign below to explore the complete plan.'}
};
function renderAccount(key){const a=accountViews[key];$('#account-panel').innerHTML=`<div class="account-table-labels"><span>${a.label}</span><span>Status</span></div>${a.rows.map(r=>`<div class="account-row"><span class="row-checkbox">✓</span><strong>${r[0]}</strong><span>${r[1]}</span></div>`).join('')}<p class="account-description">${a.note}</p>`;$('#account-panel').setAttribute('aria-labelledby',`tab-${key}`);}
function tabSelect(button,group,handler){$$(group).forEach(b=>{b.setAttribute('aria-selected',String(b===button));b.tabIndex=b===button?0:-1;});handler(button);}
function wireTabs(group,handler){$$(group).forEach(b=>{b.addEventListener('click',()=>tabSelect(b,group,handler));b.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const all=$$(group),i=all.indexOf(b);const next=e.key==='Home'?0:e.key==='End'?all.length-1:(i+(e.key==='ArrowRight'?1:-1)+all.length)%all.length;all[next].focus();tabSelect(all[next],group,handler);});});}
renderAccount('campaigns');wireTabs('[data-account]',b=>renderAccount(b.dataset.account));
wireTabs('[data-view]',b=>{$$('.view-panel').forEach(p=>p.hidden=true);$('#'+b.getAttribute('aria-controls')).hidden=false;});

$('#project-grid').innerHTML=campaigns.map(c=>`<article class="project-card"><div class="case-art ${c.theme}"><span class="art-kicker">${c.category}</span><strong>${c.metric}</strong><span class="metric-caption">${c.metricLabel}</span><div class="mini-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><span class="case-art-foot">${c.id==='agency'?'A PLAN FOR CONTRIBUTION':'SOURCE-LINKED · INDEPENDENT PERSPECTIVE'}</span></div><div class="project-info"><span class="micro-label">${c.tag}</span><h3>${c.name}</h3><p>${c.description}</p><div class="project-metadata"><span>${c.goal}</span><span>Hritik’s perspective</span></div><button class="text-link" data-project="${c.id}">Read ${c.id==='agency'?'the proposal':'the case study'} <span>↗</span></button></div></article>`).join('');
function openProject(id){const c=campaigns.find(c=>c.id===id);if(!c)return;$('#project-detail').innerHTML=`<div class="detail-heading"><div><span class="micro-label">${c.category}</span><h2 id="dialog-title">${c.name}</h2><p>${c.intro}</p></div></div><div class="authorship-note"><strong>Independent work by Hritik Raj</strong><p>${c.source?'I did not manage this campaign or work with this brand. Published results are attributed to the original team and have not been independently audited. The recommendations below are my own proposed work.':'An original job proposal. This is not a client engagement, a record of completed work or a guarantee of results.'}</p></div>${c.evidence?`<section class="detail-section"><h3>What the source reports</h3><p>${c.evidence}</p><a class="source-link" href="${c.source}" target="_blank" rel="noopener noreferrer">${c.sourceLabel} ↗</a><p class="detail-note">Source reviewed 18 October 2026. Read the original for its full methodology.</p></section>`:''}<div class="case-metrics">${c.metrics.map(m=>`<div><strong>${m[0]}</strong><span>${m[1]}</span></div>`).join('')}</div><div class="case-sections">${c.sections.map((s,i)=>`<section><span class="section-number">${String(i+1).padStart(2,'0')}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></section>`).join('')}</div>${c.ideas?`<section class="detail-section"><span class="micro-label">MY ORIGINAL CREATIVE CONCEPTS</span><h3>Three directions I would brief</h3><p class="detail-note">Proposed copy and storyboards, not the brand’s actual ads. Product facts, offers and permissions require approval before use.</p><div class="concept-directions">${c.ideas.map((a,i)=>`<article><span>CONCEPT 0${i+1}</span><h4>${a[0]}</h4><p>${a[1]}</p></article>`).join('')}</div></section>`:''}<div class="note-box">${c.takeaway}</div><div class="detail-actions"><button class="button primary" type="button" id="case-hire">Discuss a role with me ↗</button><span class="detail-note">Research. Clear hypotheses. Accountable decisions.</span></div>`;$('#case-hire').addEventListener('click',()=>{$('#project-dialog').close();$('#work').scrollIntoView({behavior:motionPaused?'auto':'smooth'});});$('#project-dialog').showModal();$('#project-dialog').scrollTop=0;}
$$('[data-project]').forEach(b=>b.addEventListener('click',()=>openProject(b.dataset.project)));
$('[data-open-agency]').addEventListener('click',e=>{e.preventDefault();openProject('agency');});
$$('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('dialog').forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close();}));
$('#privacy-button').addEventListener('click',()=>$('#privacy-dialog').showModal());

function doctorAnalysis(v){const out=[];if(v.ctr<v.targetCtr)out.push('Link CTR is below your target. Test a clearer opening hook, offer and first frame while keeping the audience stable.');else out.push('Link CTR meets your target. Check lead or purchase quality before increasing spend.');if(v.cpc>v.targetCpc)out.push('Link CPC is above your target. Check whether CPM rose, CTR fell, or both; compare with a similar period and placement mix.');else out.push('Link CPC meets your target. A low click cost still needs downstream conversion evidence.');if(v.frequency>=3)out.push('Frequency is at least 3 in the reporting period. Check whether reach is stalling and CTR is declining before diagnosing fatigue; frequency alone is not proof.');else out.push('Frequency alone does not identify a problem. Compare reach, creative age and response over the same date range.');if(v.ctr>0){const implied=v.cpm/(10*v.ctr);if(Math.abs(implied-v.cpc)/Math.max(implied,.01)>.15)out.push(`These inputs may use different definitions or date ranges. CPM and link CTR imply a link CPC of approximately ${INR.format(implied)}. Check that every metric uses the same reporting window and click type.`);}else if(v.cpc>0)out.push('A zero link CTR with a non-zero link CPC may reflect rounding or mismatched metrics. Verify your report.');out.push('Before changing the campaign, inspect the sample size, conversion rate and cost per qualified outcome. No automatic diagnosis can establish the cause from four metrics.');return out;}
function cpaAnalysis(v){const contribution=v.revenue-v.productCost-v.otherCost;return {contribution,target:contribution-v.profit,roas:contribution>0?v.revenue/contribution:null};}
$('#doctor-form').addEventListener('submit',e=>{e.preventDefault();const v=Object.fromEntries([...new FormData(e.target)].map(([k,x])=>[k,Number(x)]));$('#doctor-result').innerHTML=`<strong>Your next checks</strong><ul>${doctorAnalysis(v).map(t=>`<li>${t}</li>`).join('')}</ul>`;});
$('#cpa-form').addEventListener('submit',e=>{e.preventDefault();const v=Object.fromEntries([...new FormData(e.target)].map(([k,x])=>[k,Number(x)]));const r=cpaAnalysis(v);$('#cpa-result').innerHTML=r.contribution<=0?`<strong>No positive ad budget at break-even.</strong><p>Your costs leave ${INR.format(r.contribution)} per order before advertising. Improve the unit economics before paying for acquisition.</p>`:`<span>Break-even CPA</span><div class="calculator-total">${INR.format(r.contribution)}</div><p>Break-even ROAS: <strong>${r.roas.toFixed(2)}×</strong></p><p>${r.target>=0?`CPA ceiling for your desired profit: <strong>${INR.format(r.target)}</strong>`:'Your desired profit exceeds the contribution available before ads.'}</p><p>Based on the costs entered, before fixed overhead. Break-even CPA = revenue − product cost − other variable costs.</p>`;});
function whatsappUrl(message){return 'https://wa.me/916206949659?text='+encodeURIComponent(message);}
const contactEmail='joinhritikraj2002@gmail.com';
const contactForm=$('#contact-form');
function clearContactDraft(){ $('#contact-delivery').hidden=true; $('#contact-status').textContent=''; $('#contact-message').textContent=''; ['#send-whatsapp','#send-gmail','#send-email'].forEach(id=>$(id).removeAttribute('href')); }
contactForm.addEventListener('input',clearContactDraft);
contactForm.addEventListener('change',clearContactDraft);
contactForm.addEventListener('submit',e=>{
 e.preventDefault(); clearContactDraft();
 const f=new FormData(contactForm);
 const body=`Hi Hritik,\n\nI am contacting you about a job opportunity.\n\nName: ${f.get('name')}\nWork email: ${f.get('email')}\nCompany: ${f.get('company')}\nContacting as: ${f.get('sender')}\nRole: ${f.get('role')}\n\nRole details:\n${f.get('details')}\n\nPlease let me know your interest and availability.`;
 const subject=`Job opportunity: ${f.get('role')} at ${f.get('company')}`;
 $('#contact-message').textContent=body;
 $('#send-whatsapp').href=whatsappUrl(body);
 $('#send-gmail').href='https://mail.google.com/mail/?'+new URLSearchParams({view:'cm',fs:'1',to:contactEmail,su:subject,body}).toString();
 $('#send-email').href='mailto:'+contactEmail+'?'+new URLSearchParams({subject,body}).toString().replace(/\+/g,'%20');
 $('#contact-delivery').hidden=false;
 $('#contact-status').textContent='Your message is ready for both apps. Nothing has been sent yet.';
});
$$('[data-example]').forEach(b=>b.addEventListener('click',()=>{const doctor=b.dataset.example==='doctor';const form=$(doctor?'#doctor-form':'#cpa-form');const values=doctor?{ctr:1.2,cpc:18,cpm:216,frequency:2.3,targetCtr:1.5,targetCpc:15}:{revenue:1500,productCost:600,otherCost:200,profit:150};Object.entries(values).forEach(([key,value])=>form.elements[key].value=value);form.requestSubmit();}));
$('#play-tutorial').addEventListener('click',()=>{const v=$('#tutorial');v.scrollIntoView({behavior:motionPaused?'auto':'smooth',block:'center'});v.play().catch(()=>v.focus());});
$('#year').textContent=new Date().getFullYear();

// Video position follows scroll distance; it never autoplays behind the text.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=reduceMotion.matches;
const scrollVideo=$('#scroll-video');let targetTime=0;let frameQueued=false;
function applyMotion(){document.body.classList.toggle('motion-paused',motionPaused);document.documentElement.classList.toggle('js-motion',!motionPaused);$('.motion-toggle').setAttribute('aria-pressed',String(motionPaused));$('.motion-toggle').title=motionPaused?'Enable background motion':'Pause background motion';$('.motion-toggle span').textContent=motionPaused?'Enable motion':'Pause motion';updateScroll();}
$('.motion-toggle').addEventListener('click',()=>{motionPaused=!motionPaused;applyMotion();});reduceMotion.addEventListener('change',e=>{motionPaused=e.matches;applyMotion();});
function seekBackground(){if(motionPaused||scrollVideo.readyState<2||!Number.isFinite(scrollVideo.duration)||scrollVideo.seeking)return;const target=Math.min(scrollVideo.duration-.05,targetTime);if(Math.abs(scrollVideo.currentTime-target)>.055){try{scrollVideo.currentTime=target;}catch{}}}
function updateScroll(){frameQueued=false;const max=document.documentElement.scrollHeight-innerHeight;const progress=max>0?Math.max(0,Math.min(1,scrollY/max)):0;$('.scroll-progress').style.width=`${progress*100}%`;targetTime=progress*(scrollVideo.duration||6);seekBackground();}
addEventListener('scroll',()=>{if(!frameQueued){frameQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});addEventListener('resize',updateScroll);scrollVideo.addEventListener('loadeddata',updateScroll);scrollVideo.addEventListener('seeked',seekBackground);scrollVideo.addEventListener('error',()=>{scrollVideo.style.display='none';$('.ambient').style.backgroundImage='url(assets/scroll-poster.jpg)';});
const reveals=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveals.unobserve(e.target);}}),{threshold:.08});$$('.reveal').forEach(e=>reveals.observe(e));
const navObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){$$('.topbar nav a,.rail-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));}});},{rootMargin:'-15% 0px -65% 0px',threshold:0});$$('main>section').forEach(s=>navObserver.observe(s));applyMotion();

// Dynamic ad campaign data
fetch('data/campaign.json')
  .then(r=>r.json())
  .then(d=>{
    if(d.status&&$('#campaign-status'))$('#campaign-status').textContent=d.status;
    if(d.isLive&&$('#campaign-status')){$('#campaign-status').style.background='#e7f5ef';$('#campaign-status').style.color='#267458';}
    if(d.spend&&$('#metric-spend'))$('#metric-spend').textContent=d.spend;
    if(d.visits&&$('#metric-visits'))$('#metric-visits').textContent=d.visits;
    if(d.enquiries&&$('#metric-enquiries'))$('#metric-enquiries').textContent=d.enquiries;
    if(d.interviews&&$('#metric-interviews'))$('#metric-interviews').textContent=d.interviews;
    if(d.note&&$('#campaign-note'))$('#campaign-note').textContent=d.note;
  })
  .catch(()=>{});


