const Registro = require('../models/loginModel'); 
const bcrypt = require('bcrypt'); 
const authMiddleware = require('../middlewares/authMiddleware'); 

async function criarLogin(req,res) { 
    try {
    const registroUsuario = await Registro.create(req.body); 
    return res.status(201).json(registroUsuario); 
    } catch(err) { 
        return res.status(422).json({msg: "Obrigatório passar o corpo na requisição"})
    }
}; 

async function login(req,res) { 
    const {email,senha,funcao} = req.body; 

    const usuario = await Registro.findOne({email:email}); 
    if(!usuario) {
        return res.status(401).json({msg:"Email ou senha inválido(a)"})
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha); 
    if (!senhaValida) {
        return res.status(401).json({msg:"Email ou senha inválido(a)"}); 
    }; 

    const payload = {
        id: usuario._id, 
        nome: usuario.nome, 
        email: usuario.email,
        funcao: usuario.funcao,
    }; 

    const token = authMiddleware.gerarToken(payload);


    return res.status(201).json({token: `${token}`})

}

async function remover(req,res) { 
    const {id} = req.params
    const usuarioRemovido = await Registro.findOneAndDelete({_id:id})
    return res.status(204).end()
}

module.exports = { criarLogin,login,remover}; 