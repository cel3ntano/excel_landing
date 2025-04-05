export const createFormElements = sourceContainer => {
  if (!sourceContainer) {
    throw new Error('Source container is required');
  }

  const formHeading = sourceContainer
    .querySelector('.form-heading')
    .cloneNode(true);

  const timerContainer = sourceContainer
    .querySelector('.timer-container')
    .cloneNode(true);

  const form = sourceContainer
    .querySelector('.registration-form')
    .cloneNode(true);

  return {
    formHeading,
    timerContainer,
    form,
  };
};

export const createFormField = (
  type,
  id,
  name,
  placeholder,
  required = true
) => {
  const fieldContainer = document.createElement('div');
  fieldContainer.className = 'form-field';

  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = name;
  input.placeholder = placeholder;
  if (required) input.required = true;

  const errorElement = document.createElement('span');
  errorElement.className = 'error-message';
  errorElement.id = `${id}-error`;

  fieldContainer.appendChild(input);
  fieldContainer.appendChild(errorElement);

  return fieldContainer;
};
