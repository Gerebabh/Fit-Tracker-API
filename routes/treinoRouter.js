const express = require('express'); 
const router = express.Router(); 

const treinoController = require('../controllers/treinoController'); 

router.post('/', treinoController.criar); 

router.get('/', treinoController.listar); 

router.get('/:id', treinoController.buscar, treinoController.exibir); 

module.exports = router; 