
const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

const urlCriarLogin = ('/auth/criarLogin'); 
const urlLogin = ('/auth/login'); 
const urlAuth = '/auth';
const urlRenovar = '/auth/renovar'

let idAdmin = null; 
let idAluno = null; 
let idProfessor = null;
let emailAdmin = ""; 
let senhaAdmin = "";
let tokenAdmin = "";
let tokenProfessor = "";  
let novoToken = ""; 
let emailAluno = ""; 
let senhaAluno = ""; 
let emailProfessor = ""; 
let senhaProfessor = "";  

describe('TESTES DO FLUXO AUTENTICAÇÃO /auth', () => {

    test('POST /auth/criarlogin deve retornar 201 (ADMIN)', async() => { 
        const response = await request.post(urlCriarLogin).send({
            nome: "José da Silva TESTE", 
            email: "josedasilva@mail.com.br", 
            motivo: "Trabalho da faculdade", 
            senha: "jose123",
            funcao: 'admin',
    }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.nome).toBe("José da Silva TESTE"); 
        expect(response.body.email).toBe("josedasilva@mail.com.br"); 
        expect(response.body.motivo).toBe("Trabalho da faculdade"); 
        expect(response.body.funcao).toBe("admin"); 
        idAdmin = response.body._id; 
        emailAdmin = response.body.email; 
        senhaAdmin = "jose123"; 
});

    test('POST /auth/criarlogin deve retornar 201 (PROFESSOR)', async() => { 
        const response = await request.post(urlCriarLogin).send({
            nome: "Shaolin Matador de Porco TESTE", 
            email: "shaolinmataporco@mail.com.br", 
            motivo: "Funcionário", 
            senha: "shaolin123", 
            funcao: "professor"
        }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.nome).toBe("Shaolin Matador de Porco TESTE"); 
        expect(response.body.email).toBe("shaolinmataporco@mail.com.br"); 
        expect(response.body.funcao).toBe("professor"); 
        idProfessor = response.body._id; 
        emailProfessor = response.body.email; 
        senhaProfessor = "shaolin123"; 
    }); 

    test('POST /auth/criarlogin deve retornar 201 (ALUNO)', async() => { 
        const response = await request.post(urlCriarLogin).send({
            nome: "Paula Vadão TESTE",
            email: "paulavadao@mail.com.br", 
            motivo: 'Aluno', 
            senha: "paula123", 
            funcao: "aluno"
        }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.nome).toBe("Paula Vadão TESTE"); 
        expect(response.body.email).toBe("paulavadao@mail.com.br"); 
        expect(response.body.funcao).toBe("aluno"); 
        idAluno = response.body._id; 
        emailAluno = response.body.email; 
        senhaAluno = "paula123"; 
    })

    test('POST /auth/login deve retornar 201 (ADMIN)', async() => { 
        const response = await request.post(urlLogin).send({
            email: emailAdmin, 
            senha: senhaAdmin
        });
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.token).toBeDefined(); 
        tokenAdmin = response.body.token; 
    }); 

    test('POST /auth/login deve retornar 201 (PROFESSOR)', async() => { 
        const response = await request.post(urlLogin).send({
            email: emailProfessor, 
            senha: senhaProfessor
        }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.token).toBeDefined(); 
        tokenProfessor = response.body.token; 
    }); 

    test('POST /auth/login deve retornar 201 (ALUNO)', async() => { 
        const response = await request.post(urlLogin).send({
            email:emailAluno, 
            senha: senhaAluno
        });
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.token).toBeDefined();
    });

    test('POST /auth/renovar deve retornar 200', async() => { 
        const response = await request.post(urlRenovar)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined(); 
        novoToken = response.body.token ; 
    }); 

    test('POST /auth/renovar deve retornar 401 (SEM CAMPO AUTHORIZATION)', async() => { 
        const response = await request.post(urlRenovar)
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Não autorizado"); 
    }); 

    test('POST /auth/renovar deve retornar 401 (TOKEN INVÁLIDO)', async() => { 
        const response = await request.post(urlRenovar)
        .set('Authorization', 'Bearer 123456789'); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe('Token inválido');
    });



    test('GET /atletas deve retornar 200', async() => { 
        const response = await request.get('/atletas')
        .set('Authorization', `Bearer ${novoToken}`); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
    })

    test('DELETE /auth deve retornar 204 (ADMIN)', async() => {
        const response = await request.delete(`${urlAuth}/${idAdmin}`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(204); 
    }); 

    test('DELETE /auth deve retornar 204 (PROFESSOR)', async() => { 
        const response = await request.delete(`${urlAuth}/${idProfessor}`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(204);
    }); 

    test('DELETE /auth deve retornar 204 (ALUNO)', async() => { 
        const response = await request.delete(`${urlAuth}/${idAluno}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        ; 
        expect(response.status).toBe(204); 
    }); 

    test('DELETE /auth deve retornar 401 (SEM CAMPO AUTHORIZATION)', async() => { 
        const response = await request.delete(`${urlAuth}/${idAluno}`)
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Não autorizado"); 
    });

    test('DELETE /auth deve retornar 401 (TOKEN INVÁLIDO)', async() => { 
        const response = await request.delete(`${urlAuth}/${idAluno}`)
        .set('Authorization', 'Bearer 1234678901'); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Token inválido");
    });

    test('DELETE /auth deve retornar 403 (SEM PERMISSÃO)', async() => { 
        const response = await request.delete(`${urlAuth}/${idAluno}`)
        .set('Authorization', `Bearer ${tokenProfessor}`)
        expect(response.status).toBe(403); 
        expect(response.body.msg).toBe("Acesso negado, função sem permissão.");
    })
    
    
})
