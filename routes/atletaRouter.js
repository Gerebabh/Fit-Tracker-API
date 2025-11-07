const express = require('express'); 
const router = express.Router(); 

const atletasController = require('../controllers/atletaController'); 
const {verificarToken} = require('../middlewares/authMiddleware'); 
const {autorizarFuncoes} = require('../middlewares/roleMiddleware'); 

router.post('/', verificarToken, autorizarFuncoes('admin'), atletasController.criar); 

router.get('/', verificarToken,  atletasController.listar); 
router.get('/:id', verificarToken, atletasController.buscar, atletasController.exibir); 

router.put('/:id', verificarToken, autorizarFuncoes('professor', 'admin', 'aluno') ,atletasController.buscar, atletasController.atualizar); 
router.delete('/:id', verificarToken, autorizarFuncoes('admin'), atletasController.buscar, atletasController.remover); 

module.exports = router; 