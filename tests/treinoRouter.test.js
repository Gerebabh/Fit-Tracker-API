const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let tokenProfessor = null; 
let tokenAluno = null ; 
let tokenAdmin = null ;
let adminId = null ; 
let professorId = null ; 
let alunoId = null ; 
let atletaId = null ; 
let treinoId = null ; 
const url = '/treinos'; 

beforeAll(async() => { 

    const adminCriado = await request.post('/auth/criarlogin').send({
        nome: "José da Silva", 
        email: "josedasilva@mail.com.br", 
        motivo: "Trabalho da faculdade", 
        senha: "jose123",
        funcao: 'admin'
    }); 

    const professorCriado = await request.post('/auth/criarlogin').send({
        nome: "Shaolin Matador de Porco", 
        email: "shaolinmataporco@mail.com.br", 
        motivo: "Funcionário", 
        senha: "shaolin123", 
        funcao: "professor"
    }); 

    const alunoCriado = await request.post('/auth/criarlogin').send({
        nome: "Paula Vadão",
        email: "paulavadao@mail.com.br", 
        motivo: 'Aluno', 
        senha: "paula123", 
        funcao: "aluno"
    }); 

    adminId = adminCriado.body._id; 
    professorId = professorCriado.body._id; 
    alunoId = alunoCriado.body._id; 


    const resAdmin = await request.post('/auth/login').send({
        email: adminCriado.body.email, 
        senha: "jose123"
    }); 
    tokenAdmin = resAdmin.body.token; 

    const resProfessor = await request.post('/auth/login').send({
        email: professorCriado.body.email, 
        senha: "shaolin123" 
    }); 
    tokenProfessor = resProfessor.body.token; 

    const resAluno = await request.post('/auth/login').send({
        email: alunoCriado.body.email, 
        senha: "paula123"
    }); 

    tokenAluno = resAluno.body.token; 

    const resAtleta = await request
    .post('/atletas')
    .set('Authorization', `Bearer ${tokenAdmin}`)
    .send(
        {
            nome: "Pedro Resende", 
            email: "pedroresende@mail.com.br", 
            idade: 30,
            peso: 66, 
            altura: 170, 
            modalidade: 'Ciclismo', 
            ativo: true
        }
    ); 
    atletaId = resAtleta.body._id; 

}); 

describe('Testes do recurso /treinos', () => { 
    
    test('POST /treinos deve retornar 201', async() => { 
        const response = await request.post(url)
        .set('Authorization', `Bearer ${tokenProfessor}`)
        .send({
            atleta: atletaId, 
            data: "2025-10-25", 
            tipo: 'Ciclismo', 
            duracao: 120, 
            intensidade: "Moderado", 
            distancia: 50, 
            observacoes: '2 horas de giro leve, percorrendo no mínimo 50km'
        }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.atleta).toBeDefined(); 
        expect(response.body.data).toBe("2025-10-25T00:00:00.000Z")
        expect(response.body.tipo).toBe("Ciclismo"), 
        expect(response.body.duracao).toBe(120); 
        expect(response.body.intensidade).toBe("Moderado"); 
        expect(response.body.distancia).toBe(50); 
        expect(response.body.observacoes).toBe('2 horas de giro leve, percorrendo no mínimo 50km'); 
        treinoId = response.body._id ; 
    }); 

    test('POST /atletas deve retornar 403', async() => { 
        const response = await request
        .post(url)
        .set('Authorization', `Bearer ${tokenAluno}`); 

        expect(response.status).toBe(403); 
        expect(response.body.msg).toBe("Acesso negado, função sem permissão.")
    }); 

    test('POST /treinos deve retornar 422(Criar sem passar o body)', async() => { 
        const response = await request
        .post(url)
        .set('Authorization', `Bearer ${tokenProfessor}`) 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toBe(422); 
        expect(response.body.msg).toBe("Obrigatório passar o corpo da requisição");
    }); 


    test('GET /treinos deve retornar 200', async() => { 
        const response = await request
        .get(url)
        .set('Authorization', `Bearer ${tokenAluno}`);  
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(Array.isArray(response.body)).toBe(true); 
    }); 

    test('GET /treinos/:id deve retornar 200', async() => { 
        const response = await request
        .get(`${url}/${treinoId}`)
        .set('Authorization', `Bearer ${tokenAluno}`)
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.atleta).toBeDefined(); 
        expect(response.body.data).toBe("2025-10-25T00:00:00.000Z"); 
        expect(response.body.tipo).toBe("Ciclismo"), 
        expect(response.body.duracao).toBe(120); 
        expect(response.body.intensidade).toBe("Moderado"); 
        expect(response.body.distancia).toBe(50); 
        expect(response.body.observacoes).toBe('2 horas de giro leve, percorrendo no mínimo 50km'); 
    }); 

    test('GET /treinos/0 deve retornar 400 (Buscar um objeto com um ID inválido', async() => {
        const response = await request.get(`${url}/0`)
        .set('Authorization', `Bearer ${tokenAluno}`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('GET /treinos/000000000000000000000000 deve retornar 404 (Válido mas não existente)', async() => { 
        const response = await request
        .get(`${url}/000000000000000000000000`)
        .set('Authorization', `Bearer ${tokenAluno}`);  
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Treino não encontrado"); 
    }); 


    test('PUT /treinos/:id deve retornar 200', async() => { 
        const response = await request
        .put(`${url}/${treinoId}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(
            {
                atleta: atletaId,
                data: "2025-10-28", 
                tipo: "Natação", 
                duracao: 40, 
                intensidade: "Moderado", 
                distancia: 2, 
                observacoes: "Treino anaeróbico, rodagem na água moderada, 2km."
            }
        ); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.atleta).toBeDefined(); 
        expect(response.body.data).toBeDefined(); 
        expect(response.body.tipo).toBe("Natação"); 
        expect(response.body.duracao).toBe(40); 
        expect(response.body.intensidade).toBe("Moderado"); 
        expect(response.body.distancia).toBe(2), 
        expect(response.body.observacoes).toBe("Treino anaeróbico, rodagem na água moderada, 2km."); 
    }); 

    test('PUT /treinos/0 deve retornar 400 (ID inválido)', async() => { 
        const response = await request
        .put(`${url}/0`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('PUT /atletas deve retornar 403', async() => { 
        const response = await request
        .put(`${url}/${treinoId}`)
        .set('Authorization', `Bearer ${tokenAluno}`); 

        expect(response.status).toBe(403); 
        expect(response.body.msg).toBe("Acesso negado, função sem permissão.")
    }); 

    test('PUT /treinos/000000000000000000000000 deve retornar 404 (Válido mas não existente)', async() => { 
        const response = await request
        .put(`${url}/000000000000000000000000`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Treino não encontrado"); 
    }); 

    test('PUT /treinos/:id deve retornar 422(Sem passar os parâmetros obrigatórios)', async() => { 
        const response = await request
        .put(`${url}/${treinoId}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            atleta: "", 
            data: "", 
            tipo: "",
            duracao: "",
            intensidade: "",
        }); 
        expect(response.status).toBe(422); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Os parâmetros atleta,data,tipo,duracao,intensidade são obrigatórios")
    })

    test('DELETE /treinos/:id deve retornar 204 sem corpo', async() => { 
        const response = await request.delete(`${url}/${treinoId}`)
        .set('Authorization', `Bearer ${tokenProfessor}`) 
        expect(response.status).toBe(204); 
    }); 

    test('DELETE /treinos/0 deve retornar 400', async() => { 
        const response = await request
        .delete(`${url}/0`)
        .set('Authorization', `Bearer ${tokenProfessor}`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('PUT /atletas deve retornar 403', async() => { 
        const response = await request
        .delete(`${url}/${treinoId}`)
        .set('Authorization', `Bearer ${tokenAluno}`); 

        expect(response.status).toBe(403); 
        expect(response.body.msg).toBe("Acesso negado, função sem permissão.")
    }); 

    test('DELETE /treinos/000000000000000000000000 deve retornar 404 (Válido mas não existente)', async() => { 
    const response = await request.delete(`${url}/000000000000000000000000`)
    .set('Authorization', `Bearer ${tokenProfessor}`); 
    expect(response.status).toBe(404); 
    expect(response.headers['content-type']).toMatch(/json/); 
    expect(response.body.msg).toBe("Treino não encontrado"); 
}); 


}); 

afterAll(async() => { 
    if(atletaId) { 
        await request.delete(`/atletas/${atletaId}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
    }; 
    const usuariosRemovidos = [ 
        {id:adminId, token: tokenAdmin}, 
        {id:professorId, token: tokenAdmin},
        {id:alunoId, token: tokenAdmin},
    ]; 

    for (const usuario of usuariosRemovidos) { 
        if(usuario.id){
            await request
            .delete(`/auth/${usuario.id}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
        }; 
    }
}); 


