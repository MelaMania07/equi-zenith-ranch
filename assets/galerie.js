(()=>{const dialog=document.querySelector('#photo-dialog');if(!dialog)return;const image=dialog.querySelector('img');dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.addEventListener('click',e=>{const link=e.target.closest('.album a');if(!link||typeof dialog.showModal!=='function')return;e.preventDefault();image.src=link.href;image.alt=link.querySelector('img')?.alt||'Photographie';dialog.showModal()});async function load(){try{const response=await fetch('/content/galerie.json',{cache:'no-cache'});if(!response.ok)return;const data=await response.json();for(const category of ['ranch','argentine','bien_etre','maison_hotes']){if(!Array.isArray(data[category]))continue;const container=document.querySelector('#album-'+category);container.replaceChildren();for(const source of data[category]){if(typeof source!=='string'||!source.trim())continue;const url=new URL(source,location.origin);if(url.origin!==location.origin||!url.pathname.startsWith('/assets/'))continue;const a=document.createElement('a');a.href=url.href;const img=document.createElement('img');img.src=url.href;img.alt='Photographie — '+({ranch:'Le ranch',argentine:"L’Argentine",bien_etre:'Les activités bien-être',maison_hotes:"La maison d’hôtes"}[category]);img.loading='lazy';a.append(img);container.append(a)}if(!container.children.length){const msg=document.createElement('p');msg.textContent='Les photos seront bientôt disponibles.';container.append(msg)}}}catch(e){console.warn('Galerie indisponible',e)}}load()})();
// Navigation entre les photos agrandies
(() => {
  const dialog = document.querySelector('#photo-dialog');
  if (!dialog) return;

  const image = dialog.querySelector('img');
  let photos = [];
  let position = 0;

  document.addEventListener('click', (event) => {
    const lien = event.target.closest('.album a');
    if (!lien) return;

    photos = [...document.querySelectorAll('.album a[href]')];
    position = photos.indexOf(lien);
  });

  function naviguer(direction) {
    if (!dialog.open || !photos.length) return;

    position = (position + direction + photos.length) % photos.length;
    const lien = photos[position];

    image.src = lien.href;
    image.alt = lien.querySelector('img')?.alt || 'Photographie';
  }

  const style = document.createElement('style');
  style.textContent = `
    .galerie-fleche {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      width: 48px;
      height: 48px;
      border: 0;
      border-radius: 50%;
      background: rgba(255,255,255,.9);
      color: #203b30;
      font-size: 30px;
      cursor: pointer;
    }
    .galerie-precedente { left: 12px; }
    .galerie-suivante { right: 12px; }
  `;
  document.head.appendChild(style);

  [
    ['❮', -1, 'galerie-precedente', 'Photo précédente'],
    ['❯', 1, 'galerie-suivante', 'Photo suivante']
  ].forEach(([symbole, direction, classe, titre]) => {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'galerie-fleche ' + classe;
    bouton.textContent = symbole;
    bouton.setAttribute('aria-label', titre);
    bouton.addEventListener('click', () => naviguer(direction));
    dialog.appendChild(bouton);
  });

  document.addEventListener('keydown', (event) => {
    if (!dialog.open) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      naviguer(1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      naviguer(-1);
    }
  });
})();
