document.addEventListener('DOMContentLoaded', function() {
   crearGaleria();
});

function crearGaleria() {
   const galeria = document.querySelector('.galeria-imagenes');

   for (let i = 1; i <= 12; i++) {
      const imagen = document.createElement('IMG');
      imagen.src = `build/img/thumb/${i}.webp`;
      imagen.dataset.imagenID = i;

      // agregar funcion de mostrar imagen
      imagen.onclick = mostrarImagen;

      const lista = document.createElement('LI');
      lista.appendChild(imagen);
      galeria.appendChild(lista)
   }
}

function mostrarImagen(event) {
   const id = parseInt(event.target.dataset.imagenID)
   const imagen = document.createElement('IMG');
   imagen.src = `build/img/grande/${id}.webp`;

   const overlay = document.createElement('DIV');
   overlay.appendChild(imagen);
   overlay.classList.add('overlay');

   overlay.onclick = function() {
      overlay.remove();
      body.classList.remove('fijar-body');
   }

   //boton para cerrar la image
   const cerrarImagen = document.createElement('P');
   cerrarImagen.textContent = 'X';
   cerrarImagen.classList.add('btn-cerrar');

   //funcion para cerrar imagen
   cerrarImagen.onclick = function() {
      overlay.remove();
      body.classList.remove('fijar-body');
   }

   overlay.appendChild(cerrarImagen);

   //mostrar imgaen en html
   const body = document.querySelector('body');
   body.appendChild(overlay);
   body.classList.add('fijar-body');
}
