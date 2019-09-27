//aquí colocaré las validaciones del front
const checkName = (fieldInput) => (!fieldInput.value == '' && fieldInput.lenght <= 30 && fieldInput.lenght >= 2) ? fieldInput.className = 'valid' : fieldInput.className = 'error';
