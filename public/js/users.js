//aqui colocaremos el manejo de los usuarios desde el html
let usersData;

const getUsers = () => {
    return fetch('/api/users').then((res) => res.json());
};

const userView = ({ id, name, email, address, phone }) => `
    <tr id="${id}" class="employee">
        <td><input type="checkbox" value="ok" class="checkbox"></td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td>${phone}</td>
        <td class="contentIcons">
        <a href="#"><i class="material-icons" id="Edit">&#xE254;</i></a>
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
    

};


//con esta funcion hacemos la carga inicial de los usuarios en el home
const initialize = async () => {
    usersData = await getUsers();
    printUsers(usersData.users);
};