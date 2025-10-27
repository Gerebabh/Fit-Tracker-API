const mongoose = require('mongoose');

// Define a estrutura e as regras de validação para a entidade Atleta
const atletaSchema = new mongoose.Schema({
    // Dados de Identificação
    nome: {
        type: String,
        required: [true, 'O nome do atleta é obrigatório.'], 
        trim: true,
        minlength: [3, 'O nome deve ter no mínimo 3 caracteres.']
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório.'],
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Por favor, informe um email válido.']
    },
    
    // Dados Físicos (Adicionados para o cálculo do IMC)
    idade: {
        type: Number,
        required: [true, 'A idade é obrigatória.'],
        min: [10, 'O atleta deve ter no mínimo 10 anos.'],
        max: [100, 'Idade máxima inválida.'] // Boa prática: Adicionar um limite máximo
    },
    peso: {
        type: Number,
        required: [true, 'O peso (kg) é obrigatório.'],
        min: [1, 'O peso deve ser um valor positivo.'] // Não pode ser 0 ou negativo
    },
    altura: {
        type: Number, // Sugere-se armazenar em metros, ex: 1.75
        required: [true, 'A altura (m) é obrigatória.'],
        min: [0.5, 'A altura deve ser no mínimo 0.5 metros.'] 
    },

    // Dados de Treino
    modalidade: {
        type: String,
        required: [true, 'A modalidade é obrigatória.'],
        enum: {
            values: ['Corrida', 'Natação', 'Ciclismo', 'Triathlon', 'Musculação', 'Crossfit'],
            message: 'Modalidade inválida. Escolha uma das opções.'
        }
    },
    
    // Status (Bom para fins de exclusão lógica)
    ativo: {
        type: Boolean,
        default: true
    },
}, { 
    // Opção Mongoose: Adiciona createdAt e updatedAt automaticamente
    timestamps: true 
});

const Atleta = mongoose.model('Atleta', atletaSchema);

module.exports = Atleta;