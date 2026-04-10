document.addEventListener('DOMContentLoaded', () => {
  // ==== CAROUSEL ====
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button-right');
  const prevButton = document.querySelector('.carousel-button-left');
  let currentIndex = 0;
  let autoScrollInterval;
  let isInView = false;

  if (slides.length > 0) {
    const slideWidth = slides[0].getBoundingClientRect().width;

    slides.forEach((slide, index) => {
      slide.style.left = `${slideWidth * index}px`;
    });

    const moveToSlide = (targetSlide) => {
      track.style.transform = `translateX(-${targetSlide.style.left})`;
    };

    const updateSlide = (direction) => {
      currentIndex = (currentIndex + direction + slides.length) % slides.length;
      moveToSlide(slides[currentIndex]);
    };

    nextButton.addEventListener('click', () => updateSlide(1));
    prevButton.addEventListener('click', () => updateSlide(-1));

    const autoScroll = () => {
      autoScrollInterval = setInterval(() => {
        if (isInView) {
          updateSlide(1);
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
    };

    const checkIfInView = () => {
      const rect = track.getBoundingClientRect();
      isInView = rect.top < window.innerHeight && rect.bottom > 0;
    };

    document.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);

    checkIfInView();
    autoScroll();
  }
});
