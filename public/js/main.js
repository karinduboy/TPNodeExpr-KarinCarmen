//aqui colocaremos el comportamiento dinámico de la web

let usersData;

const getUsers = () => {
    return fetch('/api/users').then((res) => res.json());
};


const userView = ({ id, name, email, address, phone }) => `
    <tr id="${id}" class="employee">
        <td>${name}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td>${phone}</td>
        <td class="contentIcons">
        <a href="#"onclick="modalChange()"><i class="material-icons" id="Edit">&#xE254;</i></a>
        <a href="#"><i class="material-icons" id="Delete">&#xE872;</i></a>
        </td>
    </tr>
`;

const printUsers = (data) => {
    const container = document.getElementById('usersTable');
	container.innerHTML = '';
	data.forEach((e) => (container.innerHTML += userView(e)));
};

const searchUsersByQuery = () => {
    
};

const createUser = () => {
    event.preventDefault();
	const formName = document.getElementById('name');
    const formEmail = document.getElementById('email');
    const formAddress = document.getElementById('address');
    const formPhone = document.getElementById('phone');
    

	const payload  = {
        name: formName.value,
        email: formEmail.value,
        address: formAddress.value,
        phone: formPhone.value
	};

	if (isValid(payload)) {
		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then((res) => res.json())
			.then((res) => {
                formName.value = '';
                formEmail.value = '';
                formAddress.value = '';
                formPhone.value = '';
			})
			.catch((error) => {
				// acá van otras cositas
			});
	} else {
    }
    closeModal();
    location.reload(); //éste método hace que la página se actualice luego de enviar la info y se vea automáticamente el nuevo usuario, sino hay que refrescar la página manualmente.
};

const isValid = (payload) => {
	
	return true;
};

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


const initialize = async () => {
    usersData = await getUsers();
    printUsers(usersData.users);
};  