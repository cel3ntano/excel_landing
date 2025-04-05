import setupForm from './form-setup.js';
import { createFormElements } from './form-elements.js';

const selectors = {
  modal: '#registration-modal',
  signUpButton: '.sign-up-button',
  closeModal: '.close-modal',
  formContainer: '.form-container',
  modalContent: '.modal-body',
};

export const setupModal = () => {
  const modal = document.getElementById(selectors.modal.substring(1));
  const signUpButton = document.querySelector(selectors.signUpButton);
  const closeModal = document.querySelector(selectors.closeModal);
  const formContainer = document.querySelector(selectors.formContainer);
  const modalContent = document.querySelector(selectors.modalContent);

  if (!modal || !modalContent) return;

  const cloneForm = () => {
    if (!modalContent.querySelector('.registration-form')) {
      const { formHeading, timerContainer, form } =
        createFormElements(formContainer);

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
      closeModalHandler();
    });
  }

  const closeModalHandler = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  window.addEventListener('click', event => {
    if (event.target === modal) {
      closeModalHandler();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeModalHandler();
    }
  });
};

export default setupModal;
