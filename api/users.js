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
    let searchedUsers = (users, query) => { users.filter(user => user.keys(users).some( key => user[key].includes(query)))};
    if (searchedUsers) {
    res.send(searchedUsers);
    } else {
        res.status('404').json(`No encontramos ningún usuario con "${query}"`)
    };
    next();
}

const patchUser = (req,res,next) => {
    let newUser = req.body;
    let oldUser = users.find(e=> e,id === req.body.id);
    let editUser = {...oldUser,...newUser};
    users.splice(oldUser, 1);
    users.push(editUser);
    res.json(`Se edito con exito el usuario con el id ${req.params.id}`)
    next();
}

const deleteUser = (req, res, next) =>{
    let userId = users.find(e=>e.id === req.params.id);
    users.splice(userId, 1);
    res.json(`Se elimino con exito el usuario con el id ${req.params.id}`);
    next();
}



module.exports = { getUsers, postUser, searchByQuery, patchUser, deleteUser };