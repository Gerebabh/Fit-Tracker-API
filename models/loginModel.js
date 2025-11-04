const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const SALT_ROUNDS = 10; 


const loginSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required : [true, 'O nome é obrigatório'], 
        trim : true, 
        minLength : [3, 'O nome deve ter no mínimo 3 caracteres'], 
    }, 
    email: { 
        type: String, 
        required: [true, 'O email é obrigatório'],
        lowercase: true, 
        match: [/.+@.+\..+/, 'Por favor, informe um email válido.'],
    }, 

    motivo: { 
        type: String, 
        required : [true, 'Deve-se colocar o motivo para consulta dos dados da API. ']
    }, 

    senha : { 
        type: "String", 
        required: [true,'A senha é obrigatória']
    }
}, { 
    timestamps: true
}); 

loginSchema.pre('save', async function(next) { 
    if(!this.isModified('senha')) return next(); 
    try { 
        const hashed = await bcrypt.hash(this.senha, SALT_ROUNDS)
        this.senha = hashed; 
        next(); 
    } catch(err){
        next(err);
    }
}); 



module.exports = mongoose.model('Registro', loginSchema); 



