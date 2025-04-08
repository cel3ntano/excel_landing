import setupForm from './form-setup.js';

const selectors = {
  modal: '#registration-modal',
  signUpButton: '.sign-up-button',
  closeModal: '.close-modal',
  formContainer: '.form-container',
  mobileCard: '.mobile-card',
  modalContent: '.modal-body',
  registrationForm: '#registration-form',
  formHeading: '.form-heading',
  timerContainer: '.timer-container',
};

const elementRefs = {
  form: null,
  formParent: null,
  heading: null,
  headingParent: null,
  timer: null,
  timerParent: null,
  modalContent: null,
  signUpButton: null,
};

const state = {
  isMobile: window.innerWidth < 768,
  isModalOpen: false,
};

const isMobileViewport = () => {
  return window.innerWidth < 768;
};

const insertBefore = (element, container, referenceElement) => {
  if (!element || !container) return null;

  if (element.nextElementSibling === referenceElement) {
    return element;
  }

  if (referenceElement) {
    container.insertBefore(element, referenceElement);
  } else {
    container.appendChild(element);
  }

  return element;
};

const initializeElementRefs = () => {
  const formContainer = document.querySelector(selectors.formContainer);
  const mobileCard = document.querySelector(selectors.mobileCard);
  const modal = document.querySelector(selectors.modal);

  elementRefs.modalContent = modal?.querySelector(selectors.modalContent);
  elementRefs.signUpButton = mobileCard?.querySelector(selectors.signUpButton);

  if (!elementRefs.form) {
    elementRefs.form = document.querySelector(selectors.registrationForm);
    elementRefs.formParent = elementRefs.form?.parentElement;

    elementRefs.heading =
      formContainer?.querySelector(selectors.formHeading) ||
      mobileCard?.querySelector(selectors.formHeading);
    elementRefs.headingParent = elementRefs.heading?.parentElement;

    elementRefs.timer =
      formContainer?.querySelector(selectors.timerContainer) ||
      mobileCard?.querySelector(selectors.timerContainer);
    elementRefs.timerParent = elementRefs.timer?.parentElement;
  }
};

const positionElementsInMobileCard = () => {
  if (!state.isMobile) return;

  const mobileCard = document.querySelector(selectors.mobileCard);
  if (!mobileCard || !elementRefs.timer || !elementRefs.signUpButton) return;

  insertBefore(elementRefs.timer, mobileCard, elementRefs.signUpButton);
};

const positionElementsInModal = () => {
  if (!elementRefs.modalContent) return;

  if (
    elementRefs.heading &&
    !elementRefs.modalContent.contains(elementRefs.heading)
  ) {
    elementRefs.headingParent = elementRefs.heading.parentElement;
    elementRefs.modalContent.appendChild(elementRefs.heading);
  }

  if (
    elementRefs.timer &&
    !elementRefs.modalContent.contains(elementRefs.timer)
  ) {
    elementRefs.timerParent = elementRefs.timer.parentElement;

    if (
      elementRefs.heading &&
      elementRefs.modalContent.contains(elementRefs.heading)
    ) {
      const nextElement = elementRefs.heading.nextElementSibling;
      if (nextElement) {
        elementRefs.modalContent.insertBefore(elementRefs.timer, nextElement);
      } else {
        elementRefs.modalContent.appendChild(elementRefs.timer);
      }
    } else {
      if (elementRefs.modalContent.firstChild) {
        elementRefs.modalContent.insertBefore(
          elementRefs.timer,
          elementRefs.modalContent.firstChild
        );
      } else {
        elementRefs.modalContent.appendChild(elementRefs.timer);
      }
    }
  }

  if (
    elementRefs.form &&
    !elementRefs.modalContent.contains(elementRefs.form)
  ) {
    elementRefs.formParent = elementRefs.form.parentElement;

    if (elementRefs.form.parentElement) {
      elementRefs.form.parentElement.removeChild(elementRefs.form);
    }

    elementRefs.modalContent.appendChild(elementRefs.form);
    elementRefs.form = setupForm(elementRefs.form);
  }
};

const positionElementsBasedOnState = () => {
  initializeElementRefs();

  if (state.isMobile) {
    if (state.isModalOpen) {
      positionElementsInModal();
    } else {
      const mobileCard = document.querySelector(selectors.mobileCard);
      if (mobileCard) {
        if (elementRefs.timer && !mobileCard.contains(elementRefs.timer)) {
          mobileCard.appendChild(elementRefs.timer);
        }

        positionElementsInMobileCard();
      }
    }
  } else {
    const formContainer = document.querySelector(selectors.formContainer);
    if (formContainer) {
      if (elementRefs.heading && !formContainer.contains(elementRefs.heading)) {
        if (elementRefs.heading.parentElement) {
          elementRefs.heading.parentElement.removeChild(elementRefs.heading);
        }
        formContainer.insertBefore(
          elementRefs.heading,
          formContainer.firstChild
        );
      }

      if (elementRefs.timer && !formContainer.contains(elementRefs.timer)) {
        if (elementRefs.timer.parentElement) {
          elementRefs.timer.parentElement.removeChild(elementRefs.timer);
        }

        if (
          elementRefs.heading &&
          formContainer.contains(elementRefs.heading)
        ) {
          const nextElement = elementRefs.heading.nextElementSibling;
          if (nextElement) {
            formContainer.insertBefore(elementRefs.timer, nextElement);
          } else {
            formContainer.appendChild(elementRefs.timer);
          }
        } else {
          formContainer.appendChild(elementRefs.timer);
        }
      }

      if (elementRefs.form && !formContainer.contains(elementRefs.form)) {
        if (elementRefs.form.parentElement) {
          elementRefs.form.parentElement.removeChild(elementRefs.form);
        }

        const existingForm = formContainer.querySelector(
          selectors.registrationForm
        );
        if (existingForm) {
          formContainer.removeChild(existingForm);
        }

        formContainer.appendChild(elementRefs.form);
        elementRefs.form = setupForm(elementRefs.form);
      }
    }
  }
};

export const setupModal = () => {
  const modal = document.querySelector(selectors.modal);
  const signUpButton = document.querySelector(selectors.signUpButton);
  const closeModalButton = modal?.querySelector(selectors.closeModal);

  if (!modal) return;

  state.isMobile = isMobileViewport();
  initializeElementRefs();

  positionElementsBasedOnState();

  if (signUpButton) {
    signUpButton.addEventListener('click', () => {
      state.isModalOpen = true;
      positionElementsBasedOnState();
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  }

  const closeModalHandler = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    state.isModalOpen = false;
    positionElementsBasedOnState();
  };

  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModalHandler);
  }

  window.addEventListener('click', event => {
    if (event.target === modal) {
      closeModalHandler();
    }
  });

  window.addEventListener('resize', () => {
    const wasMobile = state.isMobile;
    state.isMobile = isMobileViewport();

    if (wasMobile !== state.isMobile) {
      if (!state.isMobile && state.isModalOpen) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        state.isModalOpen = false;
      }

      positionElementsBasedOnState();
    }
  });
};

export default setupModal;
