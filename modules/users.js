const users = [
    {id: 1, name: 'Karin Duboy', email: 'karinduboy@gmail.com'},
    {id: 2, name: 'Carmen Mindeguía', email:'mindeguia@hotmail.com'},
];

const getUsers = (req,res,next) => {
    res.json({users});
    next();
}


module.exports = middleware;