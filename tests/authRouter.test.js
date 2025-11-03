const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

const urlCriarLogin = ('/auth/criarLogin'); 
const urlLogin = ('/auth/login'); 
let id = null; 
let email = ""; 
let senha = ""; 

describe('TESTES DO FLUXO AUTENTICAÇÃO /auth', () => {

    test('POST /auth/criarlogin deve retornar 201', async() => { 
        const response = await request.post(urlCriarLogin).send({
            nome: "José da Silva", 
            email: "josedasilva@mail.com.br", 
            motivo: "Trabalho da faculdade", 
            senha: "jose123",
    }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.nome).toBe("José da Silva"); 
        expect(response.body.email).toBe("josedasilva@mail.com.br"); 
        expect(response.body.motivo).toBe("Trabalho da faculdade");
        
        id = response.body._id; 
        email = response.body.email; 
        senha = "jose123"; 
});
    test('POST /auth/login deve retornar 201', async() => { 
        const response = await request.post(urlLogin).send({
            email: email, 
            senha: senha
        });
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.token).toBeDefined(); 
    }); 

})
