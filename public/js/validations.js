//aquí colocaré las validaciones del front
const showErrorMsg = (inputId, isValidInput) => {
    let errorCont = document.getElementById(`${inputId}Error`);    
    if (!isValidInput && !errorCont.classList.contains('error')){
        errorCont.classList.toggle('error');
    } else if (isValidInput && errorCont.classList.contains('error')) {
        errorCont.classList.toggle('error')
    };
};

const checkInputLength = (fieldInput, minL, maxL) => {
    let isValidInput = (!fieldInput.value.length=='' && fieldInput.value.length >= minL && fieldInput.value.length <= maxL) ? true : false;
    let inputId = fieldInput.id;
    showErrorMsg(inputId,isValidInput);
    return isValidInput;
}

const checkEmail = (fieldEmail) => {
    let email = fieldEmail.value;
    let exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = (exp.test(email) ? true : false);
    let inputId = fieldEmail.id; 
    showErrorMsg(inputId, isValid);
    return isValid;
};

const checkPhone = (fieldInput) => {
    let isValid = ((isNaN(fieldInput.value) && fieldInput.value.length > 7 && fieldInput.value.length < 12)? false : true)
    showErrorMsg(fieldInput.id,isValid);
    return isValid;
};

const checkForm = (formType,btnId) => {
    let formName = document.getElementById('name');
    let formEmail = document.getElementById('email');
    let formAddress = document.getElementById('address');
    let formPhone = document.getElementById('phone');
    let isValidName = checkInputLength(formName,2,30);
    let isValidEmail = checkEmail(formEmail);
    let isValidAddress = checkInputLength(formAddress,2,30);
    let isValidPhone = checkPhone(formPhone);
    if (isValidName && isValidEmail && isValidAddress && isValidPhone) {
        let userConfirmation = confirm(`Estás a punto de añadir esta información al sistema:
        Nombre: ${formName.value},
        Email: ${formEmail.value},
        Dirección: ${formAddress.value},
        Teléfono: ${formPhone.value}`);
        if (userConfirmation && formType == 'New'){
            createUser();
        } else if (userConfirmation && formType =='Edit') {
            editUser(btnId);
        }
        else {
            closeModal();
        };
    } else {
        let errorMsg = alert(`Debes corregir los errores del formulario`)
    };
};
