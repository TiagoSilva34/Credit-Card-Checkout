export const validateCardNumber = (cardNumber: string) => {
  cardNumber = cardNumber.replace(/\D/g, '');

  if (!/^\d{13,19}$/.test(cardNumber)) {
    return false;
  }

  let soma = 0;
  let deveDuplicar = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digito = parseInt(cardNumber.charAt(i), 10);

    if (deveDuplicar) {
      digito *= 2;
      if (digito > 9) {
        digito -= 9;
      }
    }

    soma += digito;
    deveDuplicar = !deveDuplicar;
  }

  return soma % 10 === 0;
}

export const validateOnlyNumeric= (cvv: any) => {
    cvv = cvv.replace(/[^0-9]/g, '');
    return cvv
}

export const validateCardDate = (value: string) => {
    value = value.replace(/[^0-9-/]/g, '');
    return value
}

export const validateCVVSize = (value: string) => {
  const regex = /^[0-9]{3,4}$/;

  return regex.test(value)
}

export const validateCardName = (name: string) => {
  name = name.replace(/[^a-zA-Z-" "]+/g, '');
  return name
}