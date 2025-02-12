document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentSlide = 0;

    const setSlidePositions = () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = `${index * slideWidth}px`;
        });
        moveToSlide(currentSlide); // Asegura que el carrusel esté correctamente alineado.
    };

    const moveToSlide = (currentIndex) => {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    // Control manual: siguiente diapositiva
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        moveToSlide(currentSlide);
        resetAutoPlay(); // Reinicia el autoplay al hacer clic manual
    });

    // Control manual: diapositiva anterior
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        moveToSlide(currentSlide);
        resetAutoPlay(); // Reinicia el autoplay al hacer clic manual
    });

    // Autoplay: cambiar automáticamente de diapositiva cada 10 segundos
    const intervalTime = 7000; // 7 segundos
    let autoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        moveToSlide(currentSlide);
    }, intervalTime);

    // Función para reiniciar el autoplay
    const resetAutoPlay = () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            moveToSlide(currentSlide);
        }, intervalTime);
    };

    // Escucha el evento resize para recalcular el ancho de las diapositivas.
    window.addEventListener('resize', setSlidePositions);

    // Inicializa las posiciones de las diapositivas al cargar.
    setSlidePositions();
});
