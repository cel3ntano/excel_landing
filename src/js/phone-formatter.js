export const formatPhoneNumber = input => {
  if (!input) return;

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

export default formatPhoneNumber;
