const mongoose = require('mongoose'); 

const treinosSchema = new mongoose.Schema({
    atleta: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Atleta', 
        required: true
    }, 
    data: { 
        type: Date, 
        required: true
    },
    tipo: { 
        type: String, 
        required: true, 
        enum: ['Corrida', 'Natação', 'Ciclismo', 'Musculação', 'Crossfit', 'Triatlo']
    }, 
    duracao: { 
        type: Number, 
        required: true,
        min: [1, 'A duração deve ser de pelo menos 1 minuto']
    }, 
    intensidade: { 
        type: String,
        enum: ['Leve', 'Moderado', 'Forte'], 
        required: true
    }, 
    distancia: { 
        type: Number, 
        default: 0
    }, 
    observacoes: { 
        type: String, 
        trim: true
    }
}, {
    timestamps: true
}) 

module.exports = mongoose.model('Treino', treinosSchema); 