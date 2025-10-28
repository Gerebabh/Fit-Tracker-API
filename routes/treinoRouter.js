const express = require('express'); 
const router = express.Router(); 

const treinoController = require('../controllers/treinoController'); 

router.post('/', treinoController.criar); 

router.get('/', treinoController.listar); 

router.get('/:id', treinoController.buscar, treinoController.exibir); 

router.put('/:id', treinoController.buscar, treinoController.atualizar); 

router.delete('/:id', treinoController.buscar, treinoController.remover); 

module.exports = router; 