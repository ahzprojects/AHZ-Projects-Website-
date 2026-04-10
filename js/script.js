document.addEventListener('DOMContentLoaded', () => {

  const track = document.querySelector('.carousel-track');
  if (!track) return; // safety check

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button-right');
  const prevButton = document.querySelector('.carousel-button-left');

  let currentIndex = 0;
  let autoScrollInterval;
  let isInView = false;

  const updateSlide = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  const moveNext = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  };

  const movePrev = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  };

  nextButton?.addEventListener('click', moveNext);
  prevButton?.addEventListener('click', movePrev);

  // ✅ Auto-scroll
  const startAutoScroll = () => {
    stopAutoScroll(); // prevent stacking
    autoScrollInterval = setInterval(() => {
      if (isInView) moveNext();
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
  };

  // ✅ Check if visible
  const checkIfInView = () => {
    const rect = track.getBoundingClientRect();
    isInView = rect.top < window.innerHeight && rect.bottom > 0;
  };

  document.addEventListener('scroll', checkIfInView);
  window.addEventListener('resize', checkIfInView);

  checkIfInView();
  startAutoScroll();

});
