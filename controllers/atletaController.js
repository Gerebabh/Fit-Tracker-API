const mongoose = require('mongoose'); 
const Atleta = require('../models/atletasModel'); 

async function criar(req,res) { 
    
    try {
    const novoAtleta = await Atleta.create(
        {
            nome : req.body.nome, 
            email: req.body.email,
            idade: req.body.idade,
            peso: req.body.peso, 
            altura: req.body.altura, 
            modalidade: req.body.modalidade, 
            ativo: req.body.ativo,
        }
    ); 
    return res.status(201).json(novoAtleta); 
    } catch(err){
        return res.status(422).json({msg:"Obrigatório passar o corpo da requisição"}); 
    } 
};

async function listar(req,res) { 
    try{
    const atletasCadastrados = await Atleta.find({}); 
    return res.status(200).json(atletasCadastrados); 
    } catch(err) { 
        return res.status(500).json({msg: "Deu ruim..."})
    }
};

async function buscar(req,res,next) {
    
    const {id} = req.params; 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg: "Parâmetro inválido"})
    }
    const atletaEncontrado = await Atleta.findOne({_id:id});
    if(atletaEncontrado){ 
    req.atleta = atletaEncontrado; 
    return next(); 
    }
    return res.status(404).json({msg: "Atleta não encontrado"}); 
    
};

async function exibir(req,res) { 
    return res.status(200).json(req.atleta); 
};

async function atualizar(req,res) { 
    try {
    const {id} = req.params; 
    const atletaAtualizado = await Atleta.findOneAndUpdate(
        {_id:id},
        {...req.body},
        {new: true, runValidators: true}
        )
    return res.status(200).json(atletaAtualizado); 
    } catch (err) { 
        return res.status(422).json({msg:"Os parâmetros nome, email, idade, peso, altura e modalidade são obrigatórios"});
    }
}; 

async function remover(req,res) { 
    const {id} = req.params ; 
    const atletaRemovido = await Atleta.findOneAndDelete({_id:id}); 
    return res.status(204).end()
}
module.exports = { listar, buscar, exibir, criar, atualizar, remover }; 

