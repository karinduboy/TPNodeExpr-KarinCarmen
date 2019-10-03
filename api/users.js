const generate = require('nanoid/generate');
const alphabet = '0123456789abcdef'

const users = [
    {id: '1', name: 'Karin Duboy', email: 'karinduboy@gmail.com', address: 'nombre de calle 33344', phone:'0800235563'},
    {id: '2', name: 'Carmen Mindeguía', email:'mindeguia@hotmail.com', address: 'Otracalle 2595', phone:'48235563'},
];

const getUsers = (req,res,next) => {
    res.json({users});
    next();
};

const postUser = (req, res, next) => {
	let data = req.body;
	if (data.hasOwnProperty('name') && data.hasOwnProperty('email') && data.hasOwnProperty('address') && data.hasOwnProperty('phone')) {
		data.id = generate(alphabet,10);
		users.push(data);
		res.status('201').json(`recibido con el id ${data.id}`);
	} else {
		res.status('400').json('oh oh!, faltó algún dato');
	}
	next();
};

const searchByQuery = (req,res,next) => {
    let query = req.params.query;
    console.log(query)
    let searchedUsers = (users, query) => { users.filter(user => user.values(users).some( value => user[value].includes(query)))};
    if (searchedUsers) {
    res.json({searchedUsers});
    } else {
        res.status('404').json(`No encontramos ningún usuario con ${query}`)
    };
    next();
}




const getUserById = (req, res, next) => {
    let idToSearch = req.params.id
	let resUser = users.find((e) => e.id === idToSearch);
    // console.log(idToSearch,resUser)
    if (resUser) {
		res.json(resUser);
	} else {
		res.status('404').send('no encontramos al usuario');
    };
    next();
};


const patchUser = (req,res,next) => {
    let newUser = req.body;
    let oldUser = users.find(e => e.id === req.body.id);
    let index = users.findIndex(e => e.id === req.body.id);
    let editedUser = {...oldUser,...newUser};
    users.splice(index, 1);
    users.push(editedUser);
    res.send(`Se edito con exito el usuario con el id ${req.params.id}`)
    next();
}

const deleteUser = (req, res, next) =>{ 
    let indexUser = users.findIndex(e=>e.id === req.params.id)
    users.splice(indexUser, 1)
    res.json(`Se elimino con exito el usuario con el id ${req.params.id}`);
    next();
}



module.exports = { getUsers, postUser, searchByQuery, getUserById, patchUser, deleteUser };