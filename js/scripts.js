window.addEventListener('scroll', function() {
    const parallaxImages = document.querySelectorAll('.parallax-img');

    parallaxImages.forEach(function(img) {
        const rect = img.getBoundingClientRect(); // Obtiene la posición relativa al viewport
        const scrollPosition = window.pageYOffset; // Posición del scroll de la página
        const imgTop = rect.top + scrollPosition; // Posición absoluta de la imagen en la página

        // Calcula el movimiento parallax solo si la imagen está en el viewport
        if (scrollPosition + window.innerHeight > imgTop && scrollPosition < imgTop + rect.height) {
            img.style.transform = 'translateY(' + (scrollPosition - imgTop) * 0.2 + 'px)';
        }
    });
});

// Seleccionamos todas las imágenes y sus versiones no visibles
const sliderImages = document.querySelectorAll('.slider img'); 
const nonVisibleImages = document.querySelectorAll('.slider-img1-nonvisible, .slider-img2-nonvisible, .slider-img3-nonvisible');
const containers = document.querySelectorAll('.slider-img1-nonvisible-container, .slider-img2-nonvisible-container, .slider-img3-nonvisible-container');

// Función para cerrar todas las imágenes abiertas, quitar el background y resetear el display
function closeAllImages() {
    nonVisibleImages.forEach(img => img.classList.remove('show'));
    containers.forEach(container => {
        container.style.zIndex = ''; // Reseteamos el z-index
        container.style.backgroundColor = ''; // Reseteamos el background
        container.style.display = 'none'; // Reseteamos el display a none
    });
}

// Función que controla el toggle de mostrar/ocultar imagen
function toggleImage(nonVisibleImg, container) {
    const isVisible = nonVisibleImg.classList.contains('show');
    closeAllImages(); // Cierra todas antes de abrir la actual
    if (!isVisible) { // Si no estaba visible, la mostramos y cambiamos el fondo
        nonVisibleImg.classList.add('show');
        containers.forEach(container => container.style.zIndex = '2');
        container.style.display = 'flex'; // Cambiamos el display a flex
        container.style.backgroundColor = 'rgb(23, 23, 26, 0.7)'; // Aplicamos el fondo oscuro
    }
}

// Agregar eventos de click a las imágenes del slider
sliderImages.forEach((img, index) => {
    img.addEventListener('click', () => toggleImage(nonVisibleImages[index], containers[index]));
});

// Ocultar la imagen no visible al hacer click en ella misma
nonVisibleImages.forEach(img => {
    img.addEventListener('click', closeAllImages);
});
