async function loadSiteContent(){
  const response=await fetch('content.json',{cache:'no-store'});
  if(!response.ok) throw new Error(`Nie udało się wczytać content.json (${response.status})`);
  return response.json();
}

const esc=value=>String(value??'').replace(/[&<>'"]/g,char=>({
  '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
}[char]));

const setText=(id,value)=>{
  const el=document.getElementById(id);
  if(el) el.textContent=value??'';
};

const setHtml=(id,value)=>{
  const el=document.getElementById(id);
  if(el) el.innerHTML=value??'';
};

function renderNavigation(content){
  const nav=document.getElementById('navLinks');
  nav.innerHTML=content.navigation.map(item=>`<a href="${esc(item.href)}">${esc(item.label)}</a>`).join('')+
    `<a class="nav-cta" href="${esc(content.booking.url)}" target="_blank" rel="noopener">${esc(content.booking.primaryLabel)}</a>`;
}

function renderHero(content){
  const h=content.hero;
  setText('heroEyebrow',h.eyebrow);
  setHtml('heroTitle',`${esc(h.titleBefore)}<em>${esc(h.titleEmphasis)}</em>`);
  setText('heroLead',h.lead);
  const primary=document.getElementById('heroPrimary');
  primary.href=content.booking.url;
  primary.textContent=content.booking.primaryLabel;
  const secondary=document.getElementById('heroSecondary');
  secondary.href=h.secondaryCtaHref;
  secondary.textContent=h.secondaryCtaLabel;
  document.getElementById('heroTrust').innerHTML=h.trustItems.map(item=>`<span>${esc(item)}</span>`).join('');
  const img=document.getElementById('heroImage');
  img.src=h.image.src;
  img.alt=h.image.alt;
  setText('heroNoteTitle',h.noteTitle);
  setText('heroNoteText',h.noteText);
}

function renderAfterFirstVisit(section){
  setText('answersEyebrow',section.eyebrow);
  setText('answersTitle',section.title);
  document.getElementById('answerList').innerHTML=section.items.map((item,i)=>
    `<div><b>${String(i+1).padStart(2,'0')}</b><span>${esc(item)}</span></div>`
  ).join('');
}

function renderWhenToCome(section){
  setText('whenEyebrow',section.eyebrow);
  setText('whenTitle',section.title);
  setText('whenIntro',section.intro);
  document.getElementById('concernGrid').innerHTML=section.items.map(item=>
    `<article><span>${esc(item.icon)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`
  ).join('');
}

function renderGuide(content){
  const section=content.guide;
  setText('guideEyebrow',section.eyebrow);
  setText('guideTitle',section.title);
  setText('guideIntro',section.intro);

  const tabs=document.getElementById('ageTabs');
  const buttons=document.getElementById('concernButtons');
  const result=document.getElementById('guideResult');

  function showInitial(groupChanged=false){
    result.innerHTML=`
      <span class="result-kicker">${esc(groupChanged?'Wybierz obserwację':section.initialKicker)}</span>
      <h3>${esc(groupChanged?'Co zwróciło Twoją uwagę?':section.initialTitle)}</h3>
      <p>${esc(groupChanged?'Wybierz jedną z opcji po lewej. To nie jest diagnoza online — tylko podpowiedź, czego możesz spodziewać się podczas konsultacji.':section.initialText)}</p>
      <a href="${esc(content.booking.url)}" target="_blank" rel="noopener">${esc(content.booking.primaryLabel)} →</a>`;
  }

  function renderGroup(index,groupChanged=false){
    [...tabs.children].forEach((tab,i)=>tab.classList.toggle('active',i===index));
    const group=section.ageGroups[index];
    buttons.innerHTML='';
    group.items.forEach(item=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.textContent=item.label;
      btn.addEventListener('click',()=>{
        [...buttons.children].forEach(x=>x.classList.remove('active'));
        btn.classList.add('active');
        result.innerHTML=`
          <span class="result-kicker">${esc(section.resultKicker)}</span>
          <h3>${esc(item.label)}</h3>
          <p>${esc(item.text)}</p>
          <p><strong>${esc(section.resultFooter)}</strong></p>
          <a href="${esc(content.booking.url)}" target="_blank" rel="noopener">${esc(content.booking.primaryLabel)} →</a>`;
      });
      buttons.appendChild(btn);
    });
    showInitial(groupChanged);
  }

  tabs.innerHTML=section.ageGroups.map((group,i)=>
    `<button class="age-tab${i===0?' active':''}" type="button">${esc(group.label)}</button>`
  ).join('');
  [...tabs.children].forEach((tab,i)=>tab.addEventListener('click',()=>renderGroup(i,true)));
  renderGroup(0,false);
}

function renderFirstVisit(section){
  setText('visitEyebrow',section.eyebrow);
  setText('visitTitle',section.title);
  setText('visitIntro',section.intro);
  document.getElementById('visitSteps').innerHTML=section.steps.map((item,i)=>
    `<article><b>${String(i+1).padStart(2,'0')}</b><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`
  ).join('');
  setText('practicalTitle',section.practicalTitle);
  document.getElementById('practicalGrid').innerHTML=section.practicalItems.map(item=>
    `<div><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div>`
  ).join('');
}

function renderAbout(section){
  setText('aboutEyebrow',section.eyebrow);
  setText('aboutTitle',section.title);
  document.getElementById('aboutParagraphs').innerHTML=section.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('');
  document.getElementById('methodRow').innerHTML=section.methods.map(m=>`<span>${esc(m)}</span>`).join('');
  const img=document.getElementById('aboutImage');
  img.src=section.image.src;
  img.alt=section.image.alt;
  setText('aboutImageCaption',section.image.caption);
}

function renderDevelopment(section){
  setText('developmentEyebrow',section.eyebrow);
  setText('developmentTitle',section.title);
  setText('developmentIntro',section.intro);
  setText('developmentNote',section.templateNote);
  document.getElementById('courseGrid').innerHTML=section.courses.map(course=>
    `<article class="course-card"><span>${esc(course.type)}</span><h3>${esc(course.title)}</h3><small>${esc(course.meta)}</small></article>`
  ).join('');
}

function renderVideo(section){
  setText('videoEyebrow',section.eyebrow);
  setText('videoTitle',section.title);
  setText('videoText',section.text);
  setText('videoPlaceholderTitle',section.placeholderTitle);
  setText('videoPlaceholderMeta',section.placeholderMeta);
}

function renderReviews(section){
  setText('reviewsEyebrow',section.eyebrow);
  setText('reviewsTitle',section.title);
  setText('reviewsIntro',section.intro);
  document.getElementById('reviewsGrid').innerHTML=section.items.map(item=>
    `<article><div>★★★★★</div><p>${esc(item)}</p><small>${esc(section.sourceLabel)}</small></article>`
  ).join('');
}

function renderFaq(section){
  setText('faqEyebrow',section.eyebrow);
  setText('faqTitle',section.title);
  document.getElementById('faqList').innerHTML=section.items.map(item=>
    `<details><summary>${esc(item.question)}</summary><p>${esc(item.answer)}</p></details>`
  ).join('');
}

function renderContact(content){
  const section=content.contact;
  setText('contactEyebrow',section.eyebrow);
  setText('contactTitle',section.title);
  setText('contactText',section.text);
  const btn=document.getElementById('contactButton');
  btn.href=content.booking.url;
  btn.textContent=content.booking.availabilityLabel;
  setHtml('contactAddress',`${esc(section.place)}<br>${esc(section.address)}`);
}

function renderFooter(content){
  setText('footerName',content.footer.name);
  setText('footerSubtitle',content.footer.subtitle);
  setText('footerCompare',content.footer.compareLabel);
}

async function init(){
  try{
    const content=await loadSiteContent();
    document.title=content.meta.title;
    const meta=document.querySelector('meta[name="description"]');
    if(meta) meta.content=content.meta.description;

    setText('compareLabel',content.compareBar.label);
    setText('compareLink',content.compareBar.linkLabel);
    setText('brandName',content.brand.name);
    setText('brandSubtitle',content.brand.subtitle);

    renderNavigation(content);
    renderHero(content);
    renderAfterFirstVisit(content.afterFirstVisit);
    renderWhenToCome(content.whenToCome);
    renderGuide(content);
    renderFirstVisit(content.firstVisit);
    renderAbout(content.about);
    renderDevelopment(content.development);
    renderVideo(content.video);
    renderReviews(content.reviews);
    renderFaq(content.faq);
    renderContact(content);
    renderFooter(content);
  }catch(error){
    console.error(error);
    const fallback=document.getElementById('contentError');
    if(fallback) fallback.hidden=false;
  }
}

document.addEventListener('DOMContentLoaded',init);