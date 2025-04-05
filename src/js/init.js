import initCountdown from './timer.js';
import setupModal from './modal.js';
import setupForm from './form-setup.js';

const initRegistrationForm = () => {
  initCountdown({
    targetDate: 'May 10, 2025 19:30:00',
  });

  setupModal();

  const mainForm = document.querySelector('#registration-form');
  if (mainForm) {
    setupForm(mainForm);
  }
};

export default initRegistrationForm;
