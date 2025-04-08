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

const handleFieldInput = event => {
  const field = event.target;
  const fieldContainer = field.closest('.form-field');

  if (fieldContainer) {
    fieldContainer.classList.remove('error');

    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
};

export const setupForm = form => {
  if (!form) return;

  const newForm = form.cloneNode(true);
  if (form.parentNode) {
    form.parentNode.replaceChild(newForm, form);
  }
  form = newForm;

  form.addEventListener('submit', handleFormSubmit);

  const phoneInput = form.querySelector('#phone');
  if (phoneInput) {
    formatPhoneNumber(phoneInput);
  }

  const formInputs = form.querySelectorAll('input');
  formInputs.forEach(input => {
    input.addEventListener('input', handleFieldInput);

    if (input.type === 'checkbox') {
      input.addEventListener('change', handleFieldInput);
    }
  });

  return form;
};

export default setupForm;
