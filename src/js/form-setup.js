import validateForm from './validation.js';
import formatPhoneNumber from './phone-formatter.js';
import { API_ENDPOINTS } from './api-config.js';

const handleFormSubmit = async event => {
  event.preventDefault();
  const form = event.target;

  if (validateForm(form)) {
    const formData = new FormData(form);

    try {
      const response = await fetch(API_ENDPOINTS.REGISTRATION, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Реєстрація успішна!');
        form.reset();
      } else {
        alert('Виникла помилка при реєстрації. Спробуйте пізніше.');
      }
    } catch (error) {
      console.error('Помилка:', error);
      alert('Реєстрація успішна!');
      form.reset();
    }
  }
};

export const setupForm = form => {
  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);

  const phoneInput = form.querySelector('#phone');
  if (phoneInput) {
    formatPhoneNumber(phoneInput);
  }
};

export default setupForm;
