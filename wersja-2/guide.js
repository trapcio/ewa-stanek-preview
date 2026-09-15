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