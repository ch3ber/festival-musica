document.addEventListener('DOMContentLoaded', function() {
   scrollNav();

   navegacionFija();
});

function navegacionFija() {
   const barra = document.querySelector('.header')
   //registrat el intersection observer
   const observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
         barra.classList.remove('fijo');
      } else {
         barra.classList.add('fijo');
      }
   });
   //elemento a observar
   observer.observe(document.querySelector('.video'));
}

function scrollNav() {
   const enlaces = document.querySelectorAll('.navegacion-principal a');
   enlaces.forEach(function(enlace) {
      enlace.addEventListener('click', function(event) {
         event.preventDefault();
         const seccion = document.querySelector(event.target.attributes.href.value);
         seccion.scrollIntoView({
            behavior: 'smooth'
         });
      });
   })
}
