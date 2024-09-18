export const validateCardNumber = (cardNumber: string) => {
    cardNumber = cardNumber.replace(/[^0-9]/g, '');

    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        if (shouldDouble)
        if ((digit *= 2) > 9) digit = digit - 9;
        sum += digit;
        shouldDouble = !shouldDouble;
     }
     let isValid = sum % 10 === 0; 

     return isValid
}

export const validateCVC= (cvv: any) => {
    cvv = cvv.replace(/[^0-9]/g, '');
    return cvv
}

export const validateCardDate = (value: string) => {
    value = value.replace(/[^0-9-/]/g, '');
    return value
}