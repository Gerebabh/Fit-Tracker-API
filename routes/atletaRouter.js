const express = require('express'); 
const router = express.Router(); 

const atletasController = require('../controllers/atletaController'); 

router.post('/', atletasController.criar); 

router.get('/', atletasController.listar); 

router.get('/:id', atletasController.buscar, atletasController.exibir); 





module.exports = router; 