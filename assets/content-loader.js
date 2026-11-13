/* Pages CMS -> site public. Prévisualisation locale : valeurs HTML par défaut. */
(async () => {
  if (location.protocol === 'file:') return;
  const slug = location.pathname.split('/').pop()?.replace(/\.html$/, '') || 'index';
  async function getJSON(url) {
    const response = await fetch(url, {cache: 'no-cache'});
    return response.ok ? response.json() : null;
  }
  try {
    const [data, identite] = await Promise.all([
      getJSON(`/content/${slug}.json`),
      getJSON('/content/identite.json')
    ]);
    if (data) {
      for (const el of document.querySelectorAll('[data-cms]')) {
        const value = data[el.dataset.cms];
        if (typeof value !== 'string') continue;
        if (el.tagName === 'IMG') {
          if (value.trim()) el.src = value;
        } else {
          el.textContent = value;
        }
      }
    }
    if (identite) {
      for (const el of document.querySelectorAll('[data-identite]')) {
        const key=el.dataset.identite;
        const val=identite[key];
        if (typeof val !== 'string') continue;
        if (key==='logo') { if (val.trim()) el.src=val; }
        else el.textContent=val;
      }
      const bounded=(key,min,max)=>{
        const n=Number(identite[key]);
        return Number.isFinite(n) ? Math.min(max,Math.max(min,n)) : null;
      };
      const root=document.documentElement.style;
      const size=bounded('largeur_logo',35,180);
      if(size!==null) root.setProperty('--logo-size',size+'px');
      const nom=bounded('grandeur_nom',10,32);
      if(nom!==null) root.setProperty('--nom-size',nom+'px');
      const sous=bounded('grandeur_sous_nom',8,24);
      if(sous!==null) root.setProperty('--sous-nom-size',sous+'px');
      const gap=bounded('espacement_logo_texte',0,60);
      if(gap!==null) root.setProperty('--brand-gap',gap+'px');
      for (const el of document.querySelectorAll('header .brand')) {
        el.setAttribute('aria-label', [identite.nom,identite.sous_nom].filter(Boolean).join(' '));
      }
    }
  } catch (error) { console.warn('Contenu CMS indisponible : version initiale affichée.'); }
})();
