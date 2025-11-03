const express = require('express'); 
const router = express.Router(); 
const AuthController = require('../controllers/authController');

router.post('/criarlogin', AuthController.criarLogin)

router.post('/login', AuthController.login); 


module.exports = router; 