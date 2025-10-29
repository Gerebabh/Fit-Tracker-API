const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let atletaId = null ; 
let treinoId = null ; 
const url = '/treinos'; 

// TESTE

beforeAll(async() => { 
    const res = await request.post('/atletas').send({
        nome: "Pedro Resende",
        email: "pedroresendo@mail.com.br", 
        idade: 29, 
        peso: 65.2, 
        altura: 1.71, 
        modalidade: "Ciclismo", 
        ativo: true
    }); 
    atletaId = res.body._id; 
}); 

describe('Testes do recurso /treinos', () => { 
    
    test('POST /treinos deve retornar 201', async() => { 
        const response = await request.post(url).send({
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

    test('POST /treinos deve retornar 422(Criar sem passar o body)', async() => { 
        const response = await request.post(url); 
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.status).toBe(422); 
        expect(response.body.msg).toBe("Obrigatório passar o corpo da requisição");
    }); 


    test('GET /treinos deve retornar 200', async() => { 
        const response = await request.get(url); 
        expect(response.status).toBe(200); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(Array.isArray(response.body)).toBe(true); 
    }); 

    test('GET /treinos/:id deve retornar 200', async() => { 
        const response = await request.get(`${url}/${treinoId}`); 
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
        const response = await request.get(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('GET /treinos/000000000000000000000000 deve retornar 404 (Válido mas não existente)', async() => { 
        const response = await request.get(`${url}/000000000000000000000000`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Treino não encontrado"); 
    }); 


    test('PUT /treinos/:id deve retornar 200', async() => { 
        const response = await request.put(`${url}/${treinoId}`)
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
        const response = await request.put(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('PUT /treinos/000000000000000000000000 deve retornar 404 (Válido mas não existente)', async() => { 
        const response = await request.put(`${url}/000000000000000000000000`); 
        expect(response.status).toBe(404); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Treino não encontrado"); 
    }); 

    test('PUT /treinos/:id deve retornar 422(Sem passar os parâmetros obrigatórios)', async() => { 
        const response = await request.put(`${url}/${treinoId}`)
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
        const response = await request.delete(`${url}/${treinoId}`); 
        expect(response.status).toBe(204); 
    }); 

    test('DELETE /treinos/0 deve retornar 400', async() => { 
        const response = await request.delete(`${url}/0`); 
        expect(response.status).toBe(400); 
        expect(response.headers['content-type']).toMatch(/json/); 
        expect(response.body.msg).toBe("Parâmetro inválido")
    }); 

    test('DELETE /treinos/000000000000000000000000 deve retornar 404 (Válido mas não existente)', async() => { 
    const response = await request.delete(`${url}/000000000000000000000000`); 
    expect(response.status).toBe(404); 
    expect(response.headers['content-type']).toMatch(/json/); 
    expect(response.body.msg).toBe("Treino não encontrado"); 
}); 


}); 

afterAll(async() => { 
    if(atletaId) { 
        await request.delete(`/atletas/${atletaId}`)
    }
}); 



