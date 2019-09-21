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
}

module.exports = { getUsers, postUser, searchByQuery };