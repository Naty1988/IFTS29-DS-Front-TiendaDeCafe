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
