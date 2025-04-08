export const initCountdown = (options = {}) => {
  const targetDate = new Date(
    options.targetDate || 'May 10, 2025 19:30:00'
  ).getTime();

  const timerState = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  const updateDigits = (type, value) => {
    if (value === timerState[type]) return;

    timerState[type] = value;

    document.querySelectorAll(`.timer-digits.${type}`).forEach(element => {
      if (element.textContent !== value) {
        element.textContent = value;
      }
    });
  };

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      updateDigits('days', '00');
      updateDigits('hours', '00');
      updateDigits('minutes', '00');
      updateDigits('seconds', '00');
      clearInterval(timerInterval);
      return;
    }

    const daysValue = Math.floor(distance / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');

    const hoursValue = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, '0');

    const minutesValue = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');

    const secondsValue = Math.floor((distance % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    updateDigits('days', daysValue);
    updateDigits('hours', hoursValue);
    updateDigits('minutes', minutesValue);
    updateDigits('seconds', secondsValue);
  };

  updateTimer();

  const timerInterval = setInterval(updateTimer, 1000);

  return () => clearInterval(timerInterval);
};

export default initCountdown;
