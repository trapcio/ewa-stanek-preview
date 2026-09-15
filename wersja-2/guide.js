const data={
  '0-6':[
    ['Główka głównie w jedną stronę','Podczas konsultacji mogę ocenić asymetrię ułożeniową, sposób organizowania ruchu i to, czy potrzebne jest dalsze wsparcie.'],
    ['Nie lubi leżenia na brzuchu','Sprawdzę podpór, pracę obręczy barkowej, napięcie i sposób, w jaki dziecko radzi sobie w tej pozycji.'],
    ['Wydaje się bardzo wiotkie lub napięte','Ocenię jakość ruchu i napięcie mięśniowe oraz wyjaśnię, czy widzę coś, co warto dalej obserwować lub wspierać.'],
    ['Rozwój ruchowy mnie niepokoi','Możemy potraktować wizytę jako spokojną ocenę etapu rozwoju i omówić, czego można się spodziewać dalej.']
  ],
  '6-12':[
    ['Nie obraca się lub robi to tylko w jedną stronę','Sprawdzę jakość obrotów, symetrię i sposób przenoszenia ciężaru podczas ruchu.'],
    ['Nie siada / siada nietypowo','Ocenię kontrolę tułowia, podpory i sposób dochodzenia do siadu zamiast patrzeć wyłącznie na wiek dziecka.'],
    ['Nie raczkuje albo porusza się asymetrycznie','Sprawdzę organizację ruchu, pracę kończyn i to, czy obecny sposób przemieszczania wymaga wsparcia.'],
    ['Chcę sprawdzić rozwój','Jeśli nie masz konkretnego problemu, konsultacja może po prostu uporządkować obserwacje i dać Ci jasność, co dalej.']
  ],
  '1+':[
    ['Niepokoi mnie chód','Mogę ocenić sposób stawiania stóp, pracę nóg i tułowia oraz ogólną jakość chodu.'],
    ['Martwi mnie ustawienie stóp','Sprawdzę ustawienie stóp i kończyn dolnych oraz podpowiem, czy potrzebna jest dalsza obserwacja lub terapia.'],
    ['Dziecko często się potyka','Ocenię kontrolę ruchu, równowagę i sposób poruszania się w codziennych sytuacjach.'],
    ['Rozwój ruchowy jest wolniejszy','Sprawdzimy aktualne możliwości dziecka i ustalimy, czy potrzebne jest wsparcie, kontrola czy po prostu więcej czasu.']
  ]
};

const tabs=[...document.querySelectorAll('.age-tab')];
const box=document.getElementById('concernButtons');
const result=document.getElementById('guideResult');
let current='0-6';

function renderButtons(){
  box.innerHTML='';
  data[current].forEach(([label,text],i)=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.textContent=label;
    btn.addEventListener('click',()=>{
      [...box.children].forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      result.innerHTML=`<span class="result-kicker">Co można sprawdzić?</span><h3>${label}</h3><p>${text}</p><p><strong>Po konsultacji dostaniesz jasną informację, co obserwuję i jakie kolejne kroki mają sens.</strong></p><a href="https://www.znanylekarz.pl/ewa-stanek-3/fizjoterapeuta-dzieciecy/rzeszow" target="_blank" rel="noopener">Umów konsultację →</a>`;
    });
    box.appendChild(btn);
  });
}

tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  tab.classList.add('active');
  current=tab.dataset.age;
  renderButtons();
  result.innerHTML='<span class="result-kicker">Wybierz obserwację</span><h3>Co zwróciło Twoją uwagę?</h3><p>Wybierz jedną z opcji po lewej. To nie jest diagnoza online — tylko podpowiedź, czego możesz spodziewać się podczas konsultacji.</p><a href="https://www.znanylekarz.pl/ewa-stanek-3/fizjoterapeuta-dzieciecy/rzeszow" target="_blank" rel="noopener">Umów konsultację →</a>';
}));

renderButtons();

// Continuing education section – template entries can later be replaced with real courses and workshops.
const educationStyles=document.createElement('style');
educationStyles.textContent=`
  .education-section{padding:82px 0;background:#f7f3ec}
  .education-shell{display:grid;grid-template-columns:.85fr 1.15fr;gap:52px;align-items:start;padding:48px;border:1px solid rgba(21,63,56,.12);border-radius:34px;background:#fffdf9;box-shadow:0 18px 50px rgba(36,54,48,.07)}
  .education-copy h2{margin:14px 0 18px;font-family:Georgia,serif;font-weight:500;font-size:clamp(38px,4.7vw,56px);line-height:1.05;letter-spacing:-.04em}
  .education-copy p{margin:0;color:#687670;font-size:17px}
  .education-note{margin-top:20px;padding:14px 16px;border-radius:16px;background:#dfeae5;color:#285b51;font-size:13px;font-weight:700}
  .education-list{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .education-item{padding:20px;border-radius:20px;border:1px solid rgba(21,63,56,.11);background:#fff;min-height:120px}
  .education-item small{display:block;color:#3f7468;font-weight:800;text-transform:uppercase;letter-spacing:.08em;font-size:10px;margin-bottom:8px}
  .education-item strong{display:block;font-size:17px;line-height:1.25;margin-bottom:6px}
  .education-item span{color:#687670;font-size:13px;line-height:1.45}
  @media(max-width:900px){.education-shell{grid-template-columns:1fr}.education-list{grid-template-columns:1fr 1fr}}
  @media(max-width:650px){.education-section{padding:58px 0}.education-shell{padding:28px 22px;border-radius:26px;gap:30px}.education-list{grid-template-columns:1fr}}
`;
document.head.appendChild(educationStyles);

const educationSection=document.createElement('section');
educationSection.className='education-section';
educationSection.id='rozwoj-zawodowy';
educationSection.innerHTML=`
  <div class="wrap education-shell">
    <div class="education-copy">
      <div class="eyebrow">Ciągły rozwój</div>
      <h2>Nie przestaję się uczyć.</h2>
      <p>Fizjoterapia dziecięca stale się rozwija, dlatego regularnie uczestniczę w kursach, warsztatach i szkoleniach. Poszerzam wiedzę nie tylko o nowe techniki terapeutyczne, ale też o rozwój neuroruchowy dziecka, pracę z rodziną i praktyczne rozwiązania, które można wykorzystać w codziennym życiu.</p>
      <div class="education-note">Poniższa lista jest obecnie szablonem. Nazwy można później zastąpić rzeczywistymi kursami, datami i organizatorami.</div>
    </div>
    <div class="education-list">
      <div class="education-item"><small>Przykład szkolenia</small><strong>Kurs 1 – rozwój neuroruchowy niemowląt</strong><span>Ocena jakości ruchu i wspieranie kolejnych etapów rozwoju.</span></div>
      <div class="education-item"><small>Przykład warsztatu</small><strong>Warsztat 2 – asymetria i napięcie mięśniowe</strong><span>Praktyczne podejście do najczęstszych trudności w wieku niemowlęcym.</span></div>
      <div class="education-item"><small>Przykład szkolenia</small><strong>Kurs 3 – terapia funkcjonalna małego dziecka</strong><span>Łączenie terapii z naturalnym ruchem, zabawą i codziennymi aktywnościami.</span></div>
      <div class="education-item"><small>Przykład warsztatu</small><strong>Warsztat 4 – wspieranie rozwoju stóp i chodu</strong><span>Ocena ustawienia stóp, kończyn dolnych i jakości wzorca chodu.</span></div>
      <div class="education-item"><small>Przykład szkolenia</small><strong>Kurs 5 – komunikacja z rodzicem w terapii</strong><span>Jak przekazywać zalecenia jasno i dopasować je do realnego życia rodziny.</span></div>
      <div class="education-item"><small>Przykład konferencji</small><strong>Konferencja 6 – współczesna fizjoterapia pediatryczna</strong><span>Aktualna wiedza, wymiana doświadczeń i nowe kierunki pracy z dziećmi.</span></div>
    </div>
  </div>`;

const aboutSection=document.querySelector('.about-section');
if(aboutSection){aboutSection.insertAdjacentElement('afterend',educationSection);}
