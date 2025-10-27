const mongoose = require('mongoose'); 
const Atleta = require('../models/atletasModel'); 

async function criar(req,res) { 
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
};

async function listar(req,res) { 
    const atletasCadastrados = await Atleta.find({}); 
    return res.status(200).json(atletasCadastrados); 
};

async function buscar(req,res,next) {
    const {id} = req.params; 
    const atletaEncontrado = await Atleta.findOne({_id:id}); 
    req.atleta = atletaEncontrado; 
    return next(); 
};

async function exibir(req,res) { 
    return res.status(200).json(req.atleta); 
};

module.exports = { listar, buscar, exibir, criar }; 

