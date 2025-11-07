const jwt = require('jsonwebtoken'); 

function verificarToken(req,res,next) { 
    const {authorization} = req.headers; 

    if(!authorization){
        return res.status(401).json({msg: "Não autorizado"})
    }
    
    try { 
        const token = authorization.split(" ")[1]; 
        req.payload = jwt.verify(token, process.env.JWT_SECRET); 
        next(); 
    } catch(err) { 
        res.status(401).json({msg: "Token inválido"})
    }
};

function gerarToken(payload) { 
    const expiresIn = 150; 
    try { 
        return jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            {expiresIn}, 
        ); 
    } catch(err) { 
        throw Error("Erro ao gerar token")
    }
}; 

function renovarToken(req,res) { 
    try { 
        console.log("PAYLOAD RECEBIDO AQUI", req.payload);
        const payload = 
        {
            nome: req.payload.nome, 
            email: req.payload.email, 
            funcao: req.payload.funcao
        } ; 
        const novoToken = gerarToken(payload); 
        console.log("PASSOU AQUIIIIIII ")
        return res.status(200).json({token: `${novoToken}`}) 
    } catch (err) { 
        console.log("PAYLOAD RECEBIDO AQUI", req.payload, err.message);
        return res.status(500).json({msg: "Erro ao renovar o token"})
    }
}; 

module.exports = {verificarToken, gerarToken, renovarToken}; 
