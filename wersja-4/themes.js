const themes = {
      sage: {'--bg':'#f7f4ee','--card':'#fffdfa','--card-2':'#f3eee6','--text':'#253530','--muted':'#62716a','--accent':'#7f9b90','--accent-2':'#d7b2a5','--line':'rgba(37,53,48,.12)','--button':'#6e8f82','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(40,58,52,.08)'},
      sand: {'--bg':'#faf6ef','--card':'#fffdf9','--card-2':'#f5efe4','--text':'#43362a','--muted':'#7a6b5c','--accent':'#b6926f','--accent-2':'#d8b9a2','--line':'rgba(67,54,42,.12)','--button':'#c09d79','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(80,60,38,.07)'},
      blush: {'--bg':'#fcf6f5','--card':'#fffdfd','--card-2':'#f8eeec','--text':'#403032','--muted':'#7d6668','--accent':'#c6969e','--accent-2':'#e1c0b6','--line':'rgba(64,48,50,.11)','--button':'#cc9ba1','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(84,58,62,.07)'},
      sky: {'--bg':'#f6f8fb','--card':'#ffffff','--card-2':'#eef3f8','--text':'#2d3a49','--muted':'#697a8c','--accent':'#90a9c2','--accent-2':'#c7d5e5','--line':'rgba(45,58,73,.11)','--button':'#8ea6b9','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(43,60,82,.07)'},
      pure: {'--bg':'#ffffff','--card':'#ffffff','--card-2':'#f5f8f6','--text':'#283631','--muted':'#66736e','--accent':'#8da39a','--accent-2':'#cfdad5','--line':'rgba(40,54,49,.10)','--button':'#829b91','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(44,60,53,.06)'},
      pearl: {'--bg':'#fbfbfa','--card':'#ffffff','--card-2':'#f3f4f1','--text':'#353936','--muted':'#70756f','--accent':'#a7aaa4','--accent-2':'#d8d9d5','--line':'rgba(53,57,54,.10)','--button':'#959b94','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(45,50,47,.055)'},
      coolwhite: {'--bg':'#fafcff','--card':'#ffffff','--card-2':'#f1f5f9','--text':'#2f3d49','--muted':'#6f7d89','--accent':'#93a8ba','--accent-2':'#d4e0e9','--line':'rgba(47,61,73,.10)','--button':'#8ea6b9','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(44,61,77,.055)'},
      mist: {'--bg':'#f7f8f8','--card':'#ffffff','--card-2':'#eef1f0','--text':'#303a37','--muted':'#6e7975','--accent':'#9da9a5','--accent-2':'#d6ddda','--line':'rgba(48,58,55,.10)','--button':'#93a19c','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(48,58,55,.055)'},
      mint: {'--bg':'#fbfdfc','--card':'#ffffff','--card-2':'#eff7f3','--text':'#2d3d37','--muted':'#6b7c75','--accent':'#91b0a4','--accent-2':'#d0e4dc','--line':'rgba(45,61,55,.10)','--button':'#87a99c','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(42,63,55,.055)'},
      lavender: {'--bg':'#fcfbfd','--card':'#ffffff','--card-2':'#f4f1f8','--text':'#383541','--muted':'#767180','--accent':'#aaa1bf','--accent-2':'#ded8e8','--line':'rgba(56,53,65,.10)','--button':'#a49ab9','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(58,52,70,.055)'},
      rosewhite: {'--bg':'#fffdfd','--card':'#ffffff','--card-2':'#f8f2f3','--text':'#3e3436','--muted':'#7c6d70','--accent':'#c3a1a4','--accent-2':'#ead7d8','--line':'rgba(62,52,54,.10)','--button':'#b99599','--button-text':'#ffffff','--shadow':'0 18px 40px rgba(68,51,55,.055)'}
    };

    const select = document.getElementById('themeSelect');

function applyTheme(name){
  const theme = themes[name];
  if(!theme) return;
  Object.entries(theme).forEach(([key,value]) => {
    document.documentElement.style.setProperty(key,value);
  });
  try { localStorage.setItem('ewaTheme', name); } catch {}
}

let initialTheme = 'sage';
try {
  const savedTheme = localStorage.getItem('ewaTheme');
  if(savedTheme && themes[savedTheme]) initialTheme = savedTheme;
} catch {}

if(select){
  select.value = initialTheme;
  applyTheme(initialTheme);
  select.addEventListener('change', () => applyTheme(select.value));
}
