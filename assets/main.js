const btn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');if(btn&&nav){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');});}document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');btn?.setAttribute('aria-expanded','false');}));const form=document.querySelector('#contact-form');if(form){form.addEventListener('submit',e=>{e.preventDefault();document.getElementById('form-feedback').textContent='Formulaire en préparation : une adresse de réception devra être configurée avant la mise en ligne. Aucune donnée n’a été envoyée.';});}
if(new URLSearchParams(location.search).get('objet')==='argentine'){const s=document.querySelector('#subject');if(s)s.value='argentine';}
// Ajouter Galerie au menu si le lien n'existe pas déjà
if (nav && !nav.querySelector('a[href*="galerie"]')) {
  const lienGalerie = document.createElement('a');
  lienGalerie.href = 'galerie.html';
  lienGalerie.textContent = 'Galerie';

  const lienContact = nav.querySelector('a[href*="contact"]');
  if (lienContact) {
    nav.insertBefore(lienGalerie, lienContact);
  } else {
    nav.appendChild(lienGalerie);
  }
}
document.querySelectorAll('.nav a[href*="accompagnement"]').forEach(lien => {
  lien.textContent = 'Accompagnements';
});
document.querySelectorAll('.footer h3').forEach(titre => {
titre.innerHTML = 'Rejoignez la nature.<br>Soyez libres.';
});
