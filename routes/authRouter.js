const express = require('express'); 
const router = express.Router(); 
const AuthController = require('../controllers/authController');
const { verificarToken, renovarToken } = require('../middlewares/authMiddleware');
const { autorizarFuncoes } = require('../middlewares/roleMiddleware');

router.post('/criarlogin', AuthController.criarLogin);
router.post('/login', AuthController.login); 
router.post('/renovar',  verificarToken, renovarToken);

router.delete('/:id', verificarToken, autorizarFuncoes('admin'), AuthController.remover); 



module.exports = router; 