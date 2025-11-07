const express = require('express'); 
const router = express.Router(); 

const treinoController = require('../controllers/treinoController'); 
const {verificarToken} = require('../middlewares/authMiddleware'); 
const {autorizarFuncoes} = require('../middlewares/roleMiddleware'); 

router.post('/', verificarToken, autorizarFuncoes('professor', 'admin'), treinoController.criar); 

router.get('/', verificarToken, treinoController.listar); 

router.get('/:id' ,verificarToken, treinoController.buscar, treinoController.exibir); 

router.put('/:id', verificarToken, autorizarFuncoes('professor','admin'), treinoController.buscar, treinoController.atualizar); 

router.delete('/:id', verificarToken, autorizarFuncoes('professor', 'admin') ,treinoController.buscar, treinoController.remover); 

module.exports = router; 