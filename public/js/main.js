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
        <a href="#" id="${id}" onclick="modalChange(this.id)"><i class="material-icons" >&#xE254;</i></a>
        <a href="#" id="${id}" onclick="openModalDelete(this.id)"><i class="material-icons">&#xE872;</i></a>
        </td>
    </tr>
`;

const printUsers = (data) => {
    const container = document.getElementById('usersTable');
	container.innerHTML = '';
	data.forEach((e) => (container.innerHTML += userView(e)));
};

const setModalContent = (modalFunction, userId) => {
    let modalBtns = ''
    let modalContent = `
    <div id= "modalContainer" class="modal">
                <div class="title">
                    <h2 id="title">Agregar Usuario</h2>
                    <a href="#"id="close"class="close"onclick="closeModal()">x</a>
                </div>
                <div class="formContainer">
                    <form action="#" id="userDataForm">
                        <div class="inputGroup">
                            <label class="label" for="name">Nombre:</label>
                            <input type="text" id="name" placeholder="Nombre..." class="valid" onblur="checkInputLength(this,2,30)" onkeyup="checkInputLength(this,2,30)">
                            <div id="nameError">El nombre debe tener entre 2 y 30 caracteres</div>
                        </div>
                        <div class="inputGroup">
                            <label class="label" for="email">Email:</label>
                            <input type="email" id="email" placeholder="Email..." required onblur="checkEmail(this)" onkeyup="checkEmail(this)">
                            <div id="emailError">email inválido</div>
                        </div>
                        <div class="inputGroup">
                            <label class="label" for="address">Dirección:</label>
                            <input type="address" id="address" placeholder="Dirección..." required onblur="checkInputLength(this,2,30)" onkeyup="checkInputLength(this,2,30)">
                            <div id="addressError">La dirección debe tener entre 2 y 30 caracteres</div>
                        </div>
                        <div class="inputGroup">
                            <label class="label" for="phone">Phone:</label>
                            <input type="number" id="phone" placeholder="Teléfono..." required onblur="checkPhone(this)" onkeyup="checkPhone(this)">
                            <div id="phoneError">Solo puedes introducir números</div>
                        </div>
                    `;
    if (modalFunction == 'Create'){
        modalBtns = `
                        <div class="contentBtn">
                            <input type="submit" id="btn-add" value="Agregar"class="btnModal" onclick="checkForm('New')">
                            <input type="button" id="btn-cancel" value="Cancelar"class="btnModal" onclick="closeModal()">
                        </div>
                    </form>
                </div>
            </div>
        `;
    } else if(modalFunction == 'Edit'){
        modalBtns = `
                        <div class="contentBtn">
                            <input type="submit" id="${userId}" value="Agregar"class="btnModal" onclick="checkForm('Edit',this.id)">
                            <input type="button" id="btn-cancel" value="Cancelar"class="btnModal" onclick="closeModal()">
                        </div>
                    </form>
                </div>
            </div>
        `;
    }
    modalContent += modalBtns;
    return modalContent;
}

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
	if (checkPayload(payload, 'New')) {
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
                //ojos los status
			});
	} else {
        let errorMsg = alert(`Todos los campos son obligatorios, por favor complétalos`)
    }
    closeModal();
    location.reload(); //éste método hace que la página se actualice luego de enviar la info y se vea automáticamente el nuevo usuario, sino hay que refrescar la página manualmente.
};

const checkPayload = (payload, userType) => {
    if (userType=='New'){
        let isValid = (!payload.name=='' && !payload.email=='' && !payload.address=='' && !payload.phone=='')
        ? true
        : false;
        return isValid;
    } else if(userType=='Edit'){
        let isValid = (!payload.id=='' && !payload.name=='' && !payload.email=='' && !payload.address=='' && !payload.phone=='')
        ? true
        : false;
        return isValid;
    }
};


const searchByQuery= () =>{
    if ( event.keyCode===13){
        let query = document.getElementById("search").value;
        fetch(`/api/users/${query}`)
        .then((res) => res.json())
        .then(res=> console.log(res))  
    }  
}

const clean = () =>{
    const tbody = document.getElementById('usersTable')
    tbody.innerHTML = ''
}

const patchExample = (id, payload) => {
    fetch(`api/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            formName.value = '';
            formEmail.value = '';
            formAddress.value = '';
            formPhone.value = '';
            initialize();
        })
        .catch((error) => {
             //acá van otras cositas
        });
};
// datos del modal
const modalChange = (id) => {
    let userId = id;
    fetch(`api/users/${id}`)
        .then((res) => res.json())
        .then((res) => userFound = res)
            .then( userFound =>{
                openModal('Edit',userId)
                const modal = document.getElementById('modalContainer');
                const title = document.getElementById('title');
                title.innerText = 'Editar Usuario';
                const formName = document.getElementById('name')
                const formEmail = document.getElementById('email')
                const formAddress = document.getElementById('address')
                const formPhone = document.getElementById('phone')
                formName.value = userFound.name;
                formEmail.value = userFound.email;
                formAddress.value= userFound.address;
                formPhone.value= userFound.phone;
            })
};

const editUser = (userId) => {
    event.preventDefault();
    const formName = document.getElementById('name');
    const formEmail = document.getElementById('email');
    const formAddress = document.getElementById('address');
    const formPhone = document.getElementById('phone');
    const payload  = {
        id: userId,
        name: formName.value,
        email: formEmail.value,
        address: formAddress.value,
        phone: formPhone.value
    }
    console.log(payload);
    if (checkPayload(payload, 'Edit')){
        fetch(`api/users`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }
    closeModal();
    location.reload();
}
    // openModal();
    // const userInfo  = {
    //     name: formName.value,
    //     email: formEmail.value,
    //     address: formAddress.value,
    //     phone: formPhone.value
    // };
    // fetch(`api/users/${id}`, {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(userInfo)
    // })
    //     .then((res) => res.json())
    //     .then((res) => {
    //         formName.value = res.name;
    //         formEmail.value = res.email;
    //         formAddress.value = res.address;
    //         formPhone.value = res.phone;
    //     })
    //     .catch((error) => {
    //          //acá van otras cositas
    //     });
    
    // console.log(modal);
    
    
// const modalValues = () => {	
//     const name = document.getElementById('name');	
//     const email = document.getElementById('email');	
//     const adress = document.getElementById('adress');	
//     const phone = document.getElementById('phone');	
//     let info = {	
//         'name': name.value,	
//         'email': email.value,	
//         'adress': adress.value,	
//         'phone': phone.value	
//     };	
//     console.log(info);
// }

const openModalDelete = (id)=>{
    const mask = document.getElementById('deleteFather');
    mask.style.display='block';
    const modal = document.getElementById('modalDelete');
    modal.style.display='block';
    const btnDelete = document.getElementById('btn-delete');
    btnDelete.onclick = () => deleteUser(id);
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


const openModal = (modalFunction, userId)=>{
    let modalContent = setModalContent(modalFunction, userId);
    const modal =  document.getElementById('modalWrapper');
    modal.innerHTML = '';
    modal.innerHTML = modalContent;
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