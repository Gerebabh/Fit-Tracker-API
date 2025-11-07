function autorizarFuncoes(...funcoespermitidas) {
    return (req,res,next) => { 
        const {funcao} = req.payload ; 

        if(!funcoespermitidas.includes(funcao)) {
            return res.status(403).json({msg: "Acesso negado, função sem permissão."})
        }
        next(); 
    }
}

module.exports = {autorizarFuncoes};