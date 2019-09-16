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
