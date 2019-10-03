//dependencias
const express =  require('express'); //vinculo el módulo
const path = require('path');
const users = require('../api/users');//hice este cambio para guardar users en la carpeta api y dejar router en modules, pero si no te gusta lo dejamos como estaba.

const router = express.Router(); //asigno la funcionalidad que necesito


router.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});


//APIS
router.get('/api/users/:id', users.getUserById);
router.get('/api/users', users.getUsers);
router.get('/api/users/:query', users.searchByQuery);
router.post('/api/users', users.postUser);
router.patch('/api/users', users.patchUser);
router.delete('/api/users/:id', users.deleteUser);


//ERRORS
router.use((req,res)=>{
    res.status(404).send('upss...no encontramos lo que estás buscando');
})

module.exports = router; //esto exporta la variable funcional
