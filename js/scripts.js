/* ------------------------------ PARALLAX ------------------------------ */


window.addEventListener('scroll', function() {
    const parallaxImages = document.querySelectorAll('.parallax-img');

    parallaxImages.forEach(function(img) {
        const rect = img.getBoundingClientRect();
        const scrollPosition = window.pageYOffset;
        const imgTop = rect.top + scrollPosition;

        if (scrollPosition + window.innerHeight > imgTop && scrollPosition < imgTop + rect.height) {
            img.style.transform = 'translateY(' + (scrollPosition - imgTop) * 0.2 + 'px)';
        }
    });
});


/* ------------------------------ NAVBAR ------------------------------ */

const navbar = document.querySelector('.navbar');
const barsButton = document.querySelector('.bars-button');
const crossButton = document.querySelector('.cross-button');

// Función para mostrar/ocultar el navbar
const toggleNavbar = () => {
    navbar.classList.toggle('visible');
};

// Evento de click en el botón de barras
barsButton.addEventListener('click', (event) => {
    toggleNavbar();
    event.stopPropagation(); // Evitar que el click en el botón cierre el navbar
});

// Evento de click en el botón de cierre
crossButton.addEventListener('click', toggleNavbar);

// Evento para cerrar el navbar al hacer click fuera de él
document.addEventListener('click', (event) => {
    if (navbar.classList.contains('visible') && !navbar.contains(event.target)) {
        toggleNavbar();
    }
});
