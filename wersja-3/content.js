const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const setText=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v??''};

async function init(){
  const response=await fetch('content.json',{cache:'no-store'});
  const c=await response.json();
  document.title=c.meta.title;
  document.querySelector('meta[name="description"]').content=c.meta.description;

  setText('brandName',c.brand.name);setText('brandSubtitle',c.brand.subtitle);
  setText('heroEyebrow',c.hero.eyebrow);setText('heroTitle',c.hero.title);setText('heroSubtitle',c.hero.subtitle);setText('heroLead',c.hero.lead);setText('heroText',c.hero.text);
  const hi=document.getElementById('heroImage');hi.src=c.hero.image.src;hi.alt=c.hero.image.alt;

  ['navBooking','heroBooking','contactBooking'].forEach(id=>{const el=document.getElementById(id);el.href=c.contact.bookingUrl;el.textContent=c.contact.bookingLabel});

  setText('aboutEyebrow',c.about.eyebrow);setText('aboutTitle',c.about.title);
  document.getElementById('aboutParagraphs').innerHTML=c.about.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('');

  setText('scopeEyebrow',c.scope.eyebrow);setText('scopeTitle',c.scope.title);
  document.getElementById('scopeList').innerHTML=c.scope.items.map(i=>`<div>${esc(i)}</div>`).join('');

  setText('experienceEyebrow',c.experience.eyebrow);setText('experienceTitle',c.experience.title);setText('experienceHighlight',c.experience.highlight);
  document.getElementById('methodList').innerHTML=c.experience.methods.map(i=>`<div>${esc(i)}</div>`).join('');

  setText('developmentEyebrow',c.development.eyebrow);setText('developmentTitle',c.development.title);setText('developmentText',c.development.text);setText('developmentNote',c.development.note);
  document.getElementById('courses').innerHTML=c.development.courses.map(i=>`<article class="course"><strong>${esc(i.title)}</strong><small>${esc(i.meta)}</small></article>`).join('');

  setText('contactEyebrow',c.contact.eyebrow);setText('contactTitle',c.contact.title);setText('contactAddress',c.contact.address);setText('contactNote',c.contact.note);
  const compare=document.getElementById('compareLink');compare.textContent=c.footer.compare;compare.href=c.footer.compareUrl;
}

init().catch(console.error);