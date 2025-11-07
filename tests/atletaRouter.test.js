const supertest = require ('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let id = null ; 
let adminId = null; 
let professorId = null; 
let alunoId = null; 
let tokenProfessor = null; 
let tokenAluno = null; 
let tokenAdmin = null; 
const url = '/atletas'; 

beforeAll(async() => { 
    const adminCriado = await request.post('/auth/criarlogin')
    .send({
        nome: "Adriano Menezes", 
        email: "adrianomenezes@mail.com.br", 
        motivo: "Administrar", 
        senha: "adriano123", 
        funcao: "admin"
    }); 
    console.log('SENHA COM HASH', adminCriado.body.senha); 

    const professorCriado = await request.post('/auth/criarlogin')
    .send({
        nome: "Diogo Crispim", 
        email: "diogocrispim@mail.com.br", 
        motivo: "Professor", 
        senha: "diogo123", 
        funcao: "professor"
    }); 

    const alunoCriado = await request.post('/auth/criarlogin')
    .send({
        nome: "Geraldo Azevedo", 
        email: "geraldo@mail.com.br", 
        motivo: "Aluno",
        senha: "geraldo123", 
        funcao: "aluno" 
    }); 

    adminId = adminCriado.body._id; 
    professorId = professorCriado.body._id; 
    alunoId = alunoCriado.body._id; 

    const resAdmin = await request.post('/auth/login')
    .send({
        email: adminCriado.body.email, 
        senha: "adriano123"
    }); 
    tokenAdmin = resAdmin.body.token ; 

    const resProfessor = await request.post('/auth/login')
    .send({
        email: professorCriado.body.email, 
        senha: "diogo123" 
    }); 
    tokenProfessor = resProfessor.body.token ; 

    const resAluno = await request.post('/auth/login')
    .send({
        email: alunoCriado.body.email, 
        senha: "geraldo123" 
    }); 
    tokenAluno = resAluno.body.token
}); 


describe('Testes do recuros /atletas', () => { 

    test('POST /atletas deve retornar 201', async() => { 
        const response = await request
        .post(url)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send({
            nome: "Ivan Lugon", 
            email:"ivanlugon@mail.com.br", 
            idade: 32, 
            peso: 67.5,
            altura: 1.7,
            modalidade:"Triatlo",
            ativo: true
        }); 
        expect(response.status).toBe(201); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.nome).toBe("Ivan Lugon"); 
        expect(response.body.email).toBe("ivanlugon@mail.com.br"); 
        expect(response.body.idade).toBe(32);
        expect(response.body.peso).toBe(67.5); 
        expect(response.body.altura).toBe(1.7); 
        expect(response.body.modalidade).toBe("Triatlo"); 
        expect(response.body.ativo).toBe(true); 
        id = response.body._id; 
    }); 

    test('POST /atletas deve retornar 401', async() => { 
        const response = await request.post(url); 
        expect(response.status).toBe(401)
        expect(response.body.msg).toBe("Não autorizado")
    }); 

    test('POST /atletas deve retornar 401', async() => { 
        const response = await request
        .post(url)
        .set('Authorization', `Bearer 123456789`); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Token inválido")
    })
    
    test('POST /atletas deve retornar 403', async() => { 
        const response = await request
        .post(url)
        .set('Authorization', `Bearer ${tokenAluno}`); 

        expect(response.status).toBe(403); 
        expect(response.body.msg).toBe("Acesso negado, função sem permissão.")
    }); 

    test('POST /atletas deve retornar 422', async() => { 
        const response = await request
        .post(url)
        .set('Authorization', `Bearer ${tokenAdmin}`);
        expect(response.status).toBe(422); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Obrigatório passar o corpo da requisição")
    }); 


    test('GET /atletas deve retornar 200', async() => { 
        const response = await request.get(url)
        .set('Authorization', `Bearer ${tokenAdmin}`) 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(response.body)).toBe(true); 
    }); 

    test('GET /atletas deve retornar 401', async() => { 
        const response = await request.get(url)
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe("Não autorizado"); 
    }); 

    test('GET /atletas deve retornar 401', async() => { 
        const response = await request
        .get(url)
        .set('Authorization', `Bearer 1234567890`); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Token inválido")
    }); 


    test('GET /atletas/:id deve retornar 200', async() => { 
        const response = await request.get(`${url}/${id}`)
        .set('Authorization', `Bearer ${tokenAluno}`); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.nome).toBe('Ivan Lugon'); 
        expect(response.body.email).toBe('ivanlugon@mail.com.br'); 
        expect(response.body.idade).toBe(32); 
        expect(response.body.peso).toBe(67.5); 
        expect(response.body.altura).toBe(1.7); 
        expect(response.body.modalidade).toBe('Triatlo');
        expect(response.body.ativo).toBe(true);
    }); 

    test('GET /atletas/0 deve retornar 400(ID inválido)', async() => {
        const response = await request.get(`${url}/0`)
        .set('Authorization', `Bearer ${tokenAluno}`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('GET /atletas/:id deve retornar 401', async() => { 
        const response = await request.get(`${url}/${id}`)
        expect(response.status).toBe(401)
        expect(response.body.msg).toBe("Não autorizado")
    });

    test('GET /atletas/:id deve retornar 401', async() => { 
        const response = await request.get(`${url}/${id}`)
        .set('Authorization', `Bearer 123456789`);
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Token inválido")
    });


    test('GET /atletas/000000000000000000000000 deve retornar 404 (ID válido mas não encontrado)', async() => { 
        const response = await request.get(`${url}/000000000000000000000000`)
        .set('Authorization', `Bearer ${tokenAluno}`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Atleta não encontrado"); 
    })

    test('PUT /atletas/:id deve retornar 200', async() => { 
        const response = await request.put(`${url}/${id}`)
        .set('Authorization',`Bearer ${tokenAdmin}`)
        .send(
            {
                nome: "Filipe Aragão", 
                email: "filipearagao@mail.com.br", 
                idade: 40, 
                peso: 64.5, 
                altura: 1.68, 
                modalidade: "Triatlo", 
                ativo: true,
            }
        ); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body._id).toBeDefined(); 
        expect(response.body.nome).toBe("Filipe Aragão"); 
        expect(response.body.email).toBe("filipearagao@mail.com.br"); 
        expect(response.body.idade).toBe(40); 
        expect(response.body.peso).toBe(64.5); 
        expect(response.body.altura).toBe(1.68); 
        expect(response.body.modalidade).toBe("Triatlo"); 
        expect(response.body.ativo).toBe(true); 
    });

    test('PUT /atletas/0 deve retornar 400', async() => { 
        const response = await request.put(`${url}/0`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toBe("Parâmetro inválido");
    }); 

    test('PUT /atletas/:id deve retornar 401', async() => { 
        const response = await request.put(`${url}/${id}`);
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Não autorizado")
    }); 

    test('PUT /atletas/:id deve retornar 401', async() => { 
        const response = await request.put(`${url}/${id}`)
        .set('Authorization', 'Bearer 123456890')
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Token inválido")
    });

    test('PUT /atletas/000000000000000000000000 deve retornar 404', async() => { 
        const response = await request.put(`${url}/000000000000000000000000`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Atleta não encontrado")
    }); 

    test('PUT /atletas/:id deve retornar 422 (Sem passar os parâmetros)', async() => { 
        const response = await request.put(`${url}/${id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`)
        .send(
            {
                nome: "", 
                email: "", 
                idade: "", 
                peso: "", 
                altura: "", 
                modalidade: ""
            }
        ); 
        expect(response.status).toBe(422); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Os parâmetros nome, email, idade, peso, altura e modalidade são obrigatórios"); 
    })

    test('DELETE /atletas/:id deve retornar 204 sem corpo', async() => { 
        const response = await request.delete(`${url}/${id}`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(204); 
    }); 

    test('DELETE /atletas/0 deve retornar 400', async() => { 
        const response = await request.delete(`${url}/0`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('DELETE /atletas/:id deve retornar 401', async() => { 
        const response = await request.delete(`${url}/${id}`); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Não autorizado");
    })

    test('DELETE /atletas/:id deve retornar 401', async() => { 
        const response = await request.delete(`${url}/${id}`)
        .set('Authorization', 'Bearer 1234578798'); 
        expect(response.status).toBe(401); 
        expect(response.body.msg).toBe("Token inválido")
    });

    
    test('DELETE /atletas deve retornar 403', async() => { 
        const response = await request
        .delete(`${url}/${id}`)
        .set('Authorization', `Bearer ${tokenAluno}`); 

        expect(response.status).toBe(403); 
        expect(response.body.msg).toBe("Acesso negado, função sem permissão.")
    }); 

    test('DELETE /atletas/000000000000000000000000 deve retornar 404', async() => { 
        const response = await request.delete(`${url}/000000000000000000000000`)
        .set('Authorization', `Bearer ${tokenAdmin}`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Atleta não encontrado")
    });  
}); 

afterAll(async() => { 
    const usuariosRemovidos = [
        {id:adminId, token: tokenAdmin}, 
        {id:professorId, token:tokenAdmin}, 
        {id:alunoId, token:tokenAdmin},
    ]; 

    for (const usuario of usuariosRemovidos){ 
        if(usuario.id){ 
            await request.delete(`/auth/${usuario.id}`)
            .set('Authorization', `Bearer ${usuario.token}`); 
        }
    }
});