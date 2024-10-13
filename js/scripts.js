window.addEventListener('scroll', function() {
    const parallaxImage = document.querySelector('.parallax-img');
    const scrollPosition = window.pageYOffset;

    // Ajusta el movimiento de la imagen para el efecto parallax
    parallaxImage.style.transform = 'translateY(' + scrollPosition * 0.2 + 'px)';
});
