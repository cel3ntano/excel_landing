export const errorMessages = {
  nameRequired: "Введіть ваше ім'я",
  emailInvalid: 'Введіть коректний E-mail',
  phoneInvalid: 'Введіть коректний номер телефону',
  termsRequired: 'Необхідно погодитися з умовами',
};

export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+380\s\d{2}\s\d{2}\s\d{2}\s\d{3}$/,
};

const clearErrors = form => {
  if (!form) return;

  form.querySelectorAll('.error-message').forEach(element => {
    element.textContent = '';
  });

  form.querySelectorAll('.form-field').forEach(field => {
    field.classList.remove('error');
  });
};

const showError = (form, selector, message) => {
  const errorElement = form.querySelector(selector);
  if (errorElement) {
    errorElement.textContent = message;
  }

  const fieldContainer = errorElement?.closest('.form-field');
  if (fieldContainer) {
    fieldContainer.classList.add('error');
  }
};

export const validateForm = form => {
  if (!form) return false;

  let isValid = true;

  clearErrors(form);

  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const phoneInput = form.querySelector('#phone');
  const termsCheckbox = form.querySelector('#terms');

  if (nameInput && !nameInput.value.trim()) {
    showError(form, '#name-error', errorMessages.nameRequired);
    nameInput.parentElement.classList.add('error');
    isValid = false;
  }

  if (
    emailInput &&
    (!emailInput.value.trim() ||
      !validationPatterns.email.test(emailInput.value.trim()))
  ) {
    showError(form, '#email-error', errorMessages.emailInvalid);
    emailInput.parentElement.classList.add('error');
    isValid = false;
  }

  if (
    phoneInput &&
    (!phoneInput.value.trim() ||
      !validationPatterns.phone.test(phoneInput.value.trim()))
  ) {
    showError(form, '#phone-error', errorMessages.phoneInvalid);
    phoneInput.parentElement.classList.add('error');
    isValid = false;
  }

  if (termsCheckbox && !termsCheckbox.checked) {
    showError(form, '#terms-error', errorMessages.termsRequired);
    termsCheckbox.parentElement.parentElement.classList.add('error');
    isValid = false;
  }

  return isValid;
};

export default validateForm;
