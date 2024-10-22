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

const sliderImg1 = document.querySelector('.slider-img1');
const nonVisibleImg = document.querySelector('.slider-img1-nonvisible');

// Mostrar u ocultar la imagen no visible al hacer click en slider-img1
sliderImg1.addEventListener('click', function() {
    nonVisibleImg.classList.toggle('show'); // Alterna entre mostrar y ocultar
});

// Ocultar la imagen no visible al hacer click en la propia imagen no visible
nonVisibleImg.addEventListener('click', function() {
    nonVisibleImg.classList.remove('show'); // Se oculta al hacer click sobre la imagen grande
});
