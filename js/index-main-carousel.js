document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slideWidth = slides[0].getBoundingClientRect().width;

    let currentSlide = 0;

    slides.forEach((slide, index) => {
        slide.style.left = `${index * slideWidth}px`;
    });

    const moveToSlide = (currentIndex) => {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        moveToSlide(currentSlide);
    });

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        moveToSlide(currentSlide);
    });
});
