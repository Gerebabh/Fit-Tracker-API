const mongoose = require('mongoose'); 
const Treino = require('../models/treinosModel'); 

async function criar(req,res) { 
    const novoTreino = await Treino.create(
        {
            atleta: req.body.atleta, 
            data: req.body.data, 
            tipo: req.body.tipo, 
            duracao: req.body.duracao, 
            intensidade: req.body.intensidade, 
            distancia: req.body.distancia, 
            observacoes: req.body.observacoes
        }
    ); 
    return res.status(201).json(novoTreino); 
}; 

async function listar(req,res) { 
    const treinosCadastrados = await Treino.find({}); 
    return res.status(200).json(treinosCadastrados); 
}; 

async function buscar(req,res,next) { 
    const {id} = req.params ; 

    const treinoEncontrado = await Treino.findOne({_id:id}); 
    req.treino = treinoEncontrado; 
    return next(); 
}; 

async function exibir(req,res) { 
    return res.status(200).json(req.treino); 
}; 

module.exports = {criar, listar, buscar, exibir}