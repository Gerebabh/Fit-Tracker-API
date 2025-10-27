const express = require('express'); 
const router = express.Router(); 

const atletasController = require('../controllers/atletaController'); 

router.get('/atletas', atletasController.listar); 

router.get('/atletas/:id', atletasController.buscar, atletasController.exibir); 



module.exports = router; 