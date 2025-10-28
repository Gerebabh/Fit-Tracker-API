const supertest = require ('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let id = null ; 
const url = '/atletas'; 

describe('Testes do recuros /atletas', () => { 

    test('POST /atletas deve retornar 201', async() => { 
        const response = await request.post(url).send({
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

    test('POST /atletas deve retornar 422', async() => { 
        const response = await request.post(url);
        expect(response.status).toBe(422); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Obrigatório passar o corpo da requisição")
    })

    test('GET /atletas deve retornar 200', async() => { 
        const response = await request.get(url); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/)
        expect(Array.isArray(response.body)).toBe(true); 
    }); 

    test('GET /atletas/:id deve retornar 200', async() => { 
        const response = await request.get(`${url}/${id}`); 
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
        const response = await request.get(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('GET /atletas/000000000000000000000000 deve retornar 404 (ID válido mas não encontrado)', async() => { 
        const response = await request.get(`${url}/000000000000000000000000`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Atleta não encontrado"); 
    })

    test('PUT /atletas/:id deve retornar 200', async() => { 
        const response = await request.put(`${url}/${id}`)
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
        const response = await request.put(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.msg).toBe("Parâmetro inválido");
    }); 

    test('PUT /atletas/000000000000000000000000 deve retornar 404', async() => { 
        const response = await request.put(`${url}/000000000000000000000000`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Atleta não encontrado")
    }); 

    test('PUT /atletas/:id deve retornar 422 (Sem passar os parâmetros)', async() => { 
        const response = await request.put(`${url}/${id}`)
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
        const response = await request.delete(`${url}/${id}`); 
        expect(response.status).toBe(204); 
    }); 

    test('DELETE /atletas/0 deve retornar 400', async() => { 
        const response = await request.delete(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('DELETE /atletas/000000000000000000000000 deve retornar 404', async() => { 
        const response = await request.delete(`${url}/000000000000000000000000`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Atleta não encontrado")
    })

})