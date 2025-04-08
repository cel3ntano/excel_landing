import initCountdown from './timer.js';
import setupForm from './form-setup.js';
import setupModal from './modal.js';

const initRegistrationForm = () => {
  setupModal();

  const mainForm = document.querySelector('#registration-form');
  if (mainForm) {
    setupForm(mainForm);
  }

  initCountdown({
    targetDate: 'May 10, 2025 19:30:00',
  });
};

export default initRegistrationForm;
