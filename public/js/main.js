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
        <a href="#"onclick="modalChange()"id="${id}"><i class="material-icons" >&#xE254;</i></a>
        <a href="#" id="${id}" onclick="openModalDelete(this.id)" ><i class="material-icons">&#xE872;</i></a>
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

//const patchExample = (id, payload) => {
//	fetch(`api/users/${id}`, {
	//	method: 'PATCH',
	//	headers: {
	//		'Content-Type': 'application/json'
	//	},
	//	body: JSON.stringify(payload)
	//})
	//	.then((res) => res.json())
	//	.then((res) => {
	//		console.log(res);
	//		formName.value = '';
     //       formEmail.value = '';
      //      formAddress.value = '';
       //     formPhone.value = '';
		//	initialize();
		//})
		//.catch((error) => {
			// acá van otras cositas
	//	});
//};

const searchByQuery= () =>{
  let query = document.getElementById("search").value;
    if ( event.keyCode===13){
        fetch(`/api/users/${query}`)
        .then((res) => res.json())
        .then(res=> printUsers(res))  
    }  
}

const clean = () =>{
    const tbody = document.getElementById('usersTable')
    tbody.innerHTML = ''
}
// datos del modal	
const modalValues = () => {	
    const name = document.getElementById('name');	
    const email = document.getElementById('email');	
    const adress = document.getElementById('adress');	
    const phone = document.getElementById('phone');	
    let info = {	
        'name': name.value,	
        'email': email.value,	
        'adress': adress.value,	
        'phone': phone.value	
    };	
    console.log(info);
}

const openModalDelete = (id)=>{
    const container = document.getElementById('container');
    container.style.display='none';
    const modal =  document.getElementById('modalDelete');
    modal.style.display="block";
    const btnDelete = document.getElementById("btn-delete");
    btnDelete.onclick= () =>deleteUser(id);
   }

const deleteUser=(id)=>{ 
    fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res=>res.json())
        .then(res=>{
            console.log(res);
        })
     closeDelete();   
}

const closeDelete=()=>{
    const container = document.getElementById('container');
    container.style.display='block';
    const modal =  document.getElementById('modalDelete');
    modal.style.display="none" 
    location.reload();
}


const openModal = ()=>{
    const modal =  document.getElementById('modalWrapper');
    modal.style.display='block';
};

const closeModal = ()=>{
    const modal =  document.getElementById("modalWrapper");
    modal.style.display="none";
};


const initialize = async () => {
    usersData = await getUsers();
    printUsers(usersData.users);
};  