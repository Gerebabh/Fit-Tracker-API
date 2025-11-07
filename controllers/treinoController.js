const mongoose = require('mongoose'); 
const Treino = require('../models/treinosModel'); 

async function criar(req,res) { 

    try {
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
    } catch(err) { 
        return res.status(422).json({msg:"Obrigatório passar o corpo da requisição"})
    }
}; 

async function listar(req,res) { 
    try {
    const treinosCadastrados = await Treino.find({}); 
    return res.status(200).json(treinosCadastrados); 
    } catch(err) { 
        res.status(500).json({msg:"Deu ruim..."})
    }
}; 

async function buscar(req,res,next) { 
    const {id} = req.params ; 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg:"Parâmetro inválido"})
    };

    const treinoEncontrado = await Treino.findOne({_id:id}); 
    if(treinoEncontrado) {
    req.treino = treinoEncontrado; 
    return next(); 
    }
    return res.status(404).json({msg: "Treino não encontrado"})
}; 

async function exibir(req,res) { 
    return res.status(200).json(req.treino); 
}; 

async function atualizar(req,res) { 
    try {
    const {id} = req.params ; 
    const treinoAtualizado = await Treino.findOneAndUpdate(
        {_id:id}, 
        {...req.body}, 
        {new: true, runValidators:true},
    ); 
    return res.status(200).json(treinoAtualizado); 
    } catch(err) { 
        return res.status(422).json({msg:"Os parâmetros atleta,data,tipo,duracao,intensidade são obrigatórios"})
    }
}; 

async function remover(req,res) { 
    const {id} = req.params ; 
    const treinoRemovido = await Treino.findOneAndDelete({_id:id}); 
    return res.status(204).end(); 
}

module.exports = {criar, listar, buscar, exibir, atualizar,remover}; 