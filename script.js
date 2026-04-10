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

  // ==== COUNTDOWN TIMER ====
  const countdownElement = document.getElementById('timer');

  if (countdownElement) {
    const getTargetDate = () => {
      let targetDate = localStorage.getItem('countdownTargetDate');
      if (!targetDate) {
        const now = new Date();
        targetDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).getTime();
        localStorage.setItem('countdownTargetDate', targetDate);
      } else {
        targetDate = parseInt(targetDate, 10);
      }
      return targetDate;
    };

    const targetDate = getTargetDate();

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const distance = targetDate - currentTime;

      if (distance <= 0) {
        countdownElement.textContent = 'EXPIRED';
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to avoid delay
  }
});
