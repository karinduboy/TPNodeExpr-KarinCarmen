//aquí colocaré las validaciones del front
const checkInputLenght = (fieldInput, minL, maxL) => (!fieldInput.value == '' && fieldInput.lenght <= maxL && fieldInput.lenght >= minL) ? fieldInput.className = 'valid' : fieldInput.className = 'error';

const checkEmail = (fieldEmail) => {
    let email = fieldEmail.value;
    let exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = (exp.test() ? fieldEmail.className='valid':fieldEmail.className='error');   
    return isValid; 
};

const checkPhone = (fieldInput) => (isNAN(fieldInput.value)?fieldInput.className='valid':fieldInput.className='error');

const checkForm = () => {
    inName = document.getElementById('name');
    inEmail = document.getElementById('email');
    inAdress = document.getElementById('address');
    inPhone = document.getElementById('phone');
    if (checkInputLenght(inName, 2, 30) && checkEmail(inEmail) && checkInputLenght(Address, 2, 30) && checkPhone(inPhone)) {
        createUser();
    } else {
        //aqui tengo que manejar el error del formulario
    }
}
