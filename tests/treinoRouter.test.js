const supertest = require('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let atletaId = null ; 
let treinoId = null ; 
const url = '/treinos'; 

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
    } )
})