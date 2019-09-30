//aquí colocaré las validaciones del front
const showErrorMsg = (inputId, isValidInput) => {
    let errorCont = document.getElementById(`${inputId}Error`);    
    if (!isValidInput && !errorCont.classList.contains('error')){
        // debugger;
        errorCont.classList.toggle('error');
    } else if (isValidInput && errorCont.classList.contains('error')) {
        // debugger;
        errorCont.classList.toggle('error')
    };
};

const hideErrorMsg = (inputId) => {
    
}

const checkInputLength = (fieldInput, minL, maxL) => {
    let isValidInput = (!fieldInput.value.length=='' && fieldInput.value.length >= minL && fieldInput.value.length <= maxL) ? true : false;
    let inputId = fieldInput.id;
    showErrorMsg(inputId,isValidInput);
}

const checkEmail = (fieldEmail) => {
    let email = fieldEmail.value;
    let exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // debugger;
    let isValid = (exp.test(email) ? true : false);
    let inputId = fieldEmail.id; 
    showErrorMsg(inputId, isValid);
};

const checkPhone = (fieldInput) => {
    let isValid = ((isNAN(fieldInput.value) && fieldInput.value.length > 7 && fieldInput.value.length<12)? false : true)
    showErrorMsg(fieldInput.id,isValid)
};

const checkForm = () => {
    inName = document.getElementById('name');
    inEmail = document.getElementById('email');
    inAdress = document.getElementById('address');
    inPhone = document.getElementById('phone');
    debugger;
    if (checkInputLenght(inName, 2, 30) && checkEmail(inEmail) && checkInputLenght(Address, 2, 30) && checkPhone(inPhone)) {
        createUser();
    } else {
        //aqui tengo que manejar el error del formulario
    }
}
