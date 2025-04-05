export const initCountdown = (options = {}) => {
  const targetDate = new Date(
    options.targetDate || 'May 10, 2025 19:30:00'
  ).getTime();

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    updateTimerElement('days', days);
    updateTimerElement('hours', hours);
    updateTimerElement('minutes', minutes);
    updateTimerElement('seconds', seconds);

    updateTimerElement('mobile-days', days);
    updateTimerElement('mobile-hours', hours);
    updateTimerElement('mobile-minutes', minutes);
    updateTimerElement('mobile-seconds', seconds);

    updateTimerElement('modal-days', days);
    updateTimerElement('modal-hours', hours);
    updateTimerElement('modal-minutes', minutes);
    updateTimerElement('modal-seconds', seconds);

    if (distance < 0) {
      updateTimerElement('days', 0);
      updateTimerElement('hours', 0);
      updateTimerElement('minutes', 0);
      updateTimerElement('seconds', 0);

      updateTimerElement('mobile-days', 0);
      updateTimerElement('mobile-hours', 0);
      updateTimerElement('mobile-minutes', 0);
      updateTimerElement('mobile-seconds', 0);

      updateTimerElement('modal-days', 0);
      updateTimerElement('modal-hours', 0);
      updateTimerElement('modal-minutes', 0);
      updateTimerElement('modal-seconds', 0);

      clearInterval(timerInterval);
    }
  };

  const updateTimerElement = (elementId, value) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = value.toString().padStart(2, '0');
    }
  };

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);

  return () => clearInterval(timerInterval);
};

export default initCountdown;
