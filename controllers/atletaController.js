const mongoose = require('mongoose'); 
const Atleta = require('../models/atletasModel'); 

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
    return res.status(200).json(req.produto); 
};

module.exports = { listar, buscar, exibir}; 

