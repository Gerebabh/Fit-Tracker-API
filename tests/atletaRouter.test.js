const supertest = require ('supertest'); 
const app = require('../app'); 
const request = supertest(app); 

let id = null ; 
const url = '/atletas'; 

describe('Testes do recuros /atletas', () => { 
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
    }); 

})