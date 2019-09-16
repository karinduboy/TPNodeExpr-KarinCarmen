//dependencias
const express =  require('express'); //vinculo el módulo
const path = require('path');

//modulos locales
const users = require('./users')

const router = express.Router(); //asigno la funcionalidad que necesito


router.get ('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});


//APIS
router.get('/api/users', users);

//ERRORS
router.use((req,res)=>{
    res.status(404).send('upss...no encontramos lo que estás buscando');
})

module.exports = router; //esto exporta la variable funcional
