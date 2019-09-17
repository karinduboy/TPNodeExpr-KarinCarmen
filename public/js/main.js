//aqui colocaremos el comportamiento dinámico de la web

const openModal = ()=>{
    const container = document.getElementById("container");
    container.style.display="none";
    const modal =  document.getElementById("modalContainer");
    modal.style.display="block";

};

const closeModal = ()=>{
    const container = document.getElementById("container");
    container.style.display="block";
    const modal =  document.getElementById("modalContainer");
    modal.style.display="none";
};

const validateForm = () => {
    let inputName = document.getElementById('name');
    let inputEmail = document.getElementById('email');
    let inputAddress = document.getElementById('address');
    let inputPhone = document.getElementById('phone');
    let isValid = false;

    // if (inputName && inputName.)

}