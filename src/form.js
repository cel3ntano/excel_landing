const countdown = () => {
  const targetDate = new Date('May 01, 2025 00:00:00').getTime();

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days
      .toString()
      .padStart(2, '0');
    document.getElementById('hours').textContent = hours
      .toString()
      .padStart(2, '0');
    document.getElementById('minutes').textContent = minutes
      .toString()
      .padStart(2, '0');
    document.getElementById('seconds').textContent = seconds
      .toString()
      .padStart(2, '0');

    const mobileDaysElement = document.getElementById('mobile-days');
    const mobileHoursElement = document.getElementById('mobile-hours');
    const mobileMinutesElement = document.getElementById('mobile-minutes');
    const mobileSecondsElement = document.getElementById('mobile-seconds');

    if (mobileDaysElement)
      mobileDaysElement.textContent = days.toString().padStart(2, '0');
    if (mobileHoursElement)
      mobileHoursElement.textContent = hours.toString().padStart(2, '0');
    if (mobileMinutesElement)
      mobileMinutesElement.textContent = minutes.toString().padStart(2, '0');
    if (mobileSecondsElement)
      mobileSecondsElement.textContent = seconds.toString().padStart(2, '0');

    const modalDaysElement = document.getElementById('modal-days');
    const modalHoursElement = document.getElementById('modal-hours');
    const modalMinutesElement = document.getElementById('modal-minutes');
    const modalSecondsElement = document.getElementById('modal-seconds');

    if (modalDaysElement)
      modalDaysElement.textContent = days.toString().padStart(2, '0');
    if (modalHoursElement)
      modalHoursElement.textContent = hours.toString().padStart(2, '0');
    if (modalMinutesElement)
      modalMinutesElement.textContent = minutes.toString().padStart(2, '0');
    if (modalSecondsElement)
      modalSecondsElement.textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';

      if (mobileDaysElement) mobileDaysElement.textContent = '00';
      if (mobileHoursElement) mobileHoursElement.textContent = '00';
      if (mobileMinutesElement) mobileMinutesElement.textContent = '00';
      if (mobileSecondsElement) mobileSecondsElement.textContent = '00';

      if (modalDaysElement) modalDaysElement.textContent = '00';
      if (modalHoursElement) modalHoursElement.textContent = '00';
      if (modalMinutesElement) modalMinutesElement.textContent = '00';
      if (modalSecondsElement) modalSecondsElement.textContent = '00';

      clearInterval(timerInterval);
    }
  };

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
};

const validateForm = form => {
  let isValid = true;
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const phoneInput = form.querySelector('#phone');
  const termsCheckbox = form.querySelector('#terms');

  form.querySelectorAll('.error-message').forEach(element => {
    element.textContent = '';
  });
  form.querySelectorAll('.form-field').forEach(field => {
    field.classList.remove('error');
  });

  if (!nameInput.value.trim()) {
    form.querySelector('#name-error').textContent = "Введіть ваше ім'я";
    nameInput.parentElement.classList.add('error');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
    form.querySelector('#email-error').textContent = 'Введіть коректний E-mail';
    emailInput.parentElement.classList.add('error');
    isValid = false;
  }

  const phoneRegex = /^\+380\s\d{2}\s\d{2}\s\d{2}\s\d{3}$/;
  if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
    form.querySelector('#phone-error').textContent =
      'Введіть коректний номер телефону';
    phoneInput.parentElement.classList.add('error');
    isValid = false;
  }

  if (!termsCheckbox.checked) {
    form.querySelector('#terms-error').textContent =
      'Необхідно погодитися з умовами';
    termsCheckbox.parentElement.parentElement.classList.add('error');
    isValid = false;
  }

  return isValid;
};

const handleFormSubmit = event => {
  event.preventDefault();
  const form = event.target;

  if (validateForm(form)) {
    const formData = new FormData(form);

    fetch('https://example.com/register', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          alert('Реєстрація успішна!');
          form.reset();
        } else {
          alert('Виникла помилка при реєстрації. Спробуйте пізніше.');
        }
      })
      .catch(error => {
        console.error('Помилка:', error);
        alert('Реєстрація успішна!');
        form.reset();
      });
  }
};

const formatPhoneNumber = input => {
  input.addEventListener('input', e => {
    let digits = e.target.value.replace(/\D/g, '');

    if (digits.startsWith('380')) {
      digits = digits.substring(3);
    }

    digits = digits.substring(0, 9);

    let formattedValue = '+380';
    if (digits.length > 0) {
      formattedValue += ' ' + digits.substring(0, 2);
    }
    if (digits.length > 2) {
      formattedValue += ' ' + digits.substring(2, 4);
    }
    if (digits.length > 4) {
      formattedValue += ' ' + digits.substring(4, 6);
    }
    if (digits.length > 6) {
      formattedValue += ' ' + digits.substring(6, 9);
    }

    e.target.value = formattedValue;
  });
};

const setupModal = () => {
  const modal = document.getElementById('registration-modal');
  const signUpButton = document.querySelector('.sign-up-button');
  const closeModal = document.querySelector('.close-modal');
  const formContainer = document.querySelector('.form-container');
  const modalContent = document.querySelector('.modal-body');

  const cloneForm = () => {
    if (!modalContent.querySelector('.registration-form')) {
      const formHeading = formContainer
        .querySelector('.form-heading')
        .cloneNode(true);
      const timerContainer = formContainer
        .querySelector('.timer-container')
        .cloneNode(true);
      const form = formContainer
        .querySelector('.registration-form')
        .cloneNode(true);

      form.setAttribute('novalidate', '');

      modalContent.appendChild(formHeading);
      modalContent.appendChild(timerContainer);
      modalContent.appendChild(form);

      setupForm(form);

      modalContent.querySelectorAll('.timer-digits').forEach(digit => {
        if (digit.id) {
          const originalId = digit.id;
          digit.id = `modal-${originalId}`;
        }
      });
    }
  };

  if (signUpButton) {
    signUpButton.addEventListener('click', () => {
      cloneForm();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
};

const setupForm = form => {
  form.addEventListener('submit', handleFormSubmit);

  formatPhoneNumber(form.querySelector('#phone'));
};

const initRegistrationForm = () => {
  countdown();
  setupModal();

  const mainForm = document.querySelector('#registration-form');
  if (mainForm) {
    setupForm(mainForm);
  }
};

export default initRegistrationForm;
