/* Modifications de contenu depuis Pages CMS. Le HTML initial reste visible sans JavaScript. */
(async () => {
  if (location.protocol === 'file:') return; // aperçu local du ZIP
  const slug = location.pathname.split('/').pop()?.replace(/\.html$/, '') || 'index';
  try {
    const response = await fetch(`/content/${slug}.json`, {cache:'no-cache'});
    if (!response.ok) return;
    const data = await response.json();
    for (const element of document.querySelectorAll('[data-cms]')) {
      const value = data[element.dataset.cms];
      if (typeof value !== 'string') continue;
      if (element.tagName === 'IMG') {
        if (value.trim()) element.src = value;
      } else {
        element.textContent = value;
      }
    }
  } catch (error) { console.warn('Contenu CMS indisponible : version initiale affichée.'); }
})();
