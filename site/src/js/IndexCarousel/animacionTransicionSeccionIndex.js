/** animacionTransicionSeccionIndex.js*/
// Modernización: Usar IntersectionObserver en lugar de evento scroll para mejor rendimiento

const observerOptions = {
    root: null, // viewport
    rootMargin: '0px', // margen
    threshold: 0.2 // disparar cuando el 10% del elemento sea visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            if (entry.target.classList.contains('animado')) {
                entry.target.classList.add('mostrarArriba');
            } else if (entry.target.classList.contains('animadoHorizontal')) {
                entry.target.classList.add('mostrarIzquierda');
            }
            observer.unobserve(entry.target); // Animación única
        }
    });
}, observerOptions);

document.querySelectorAll(".animado, .animadoHorizontal").forEach(el => observer.observe(el));