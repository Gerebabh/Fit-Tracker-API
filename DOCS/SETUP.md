# ⚙️ Guia de Configuração e Instalação — Fit-Tracker API

Este documento detalha o passo a passo exato para configurar o ambiente de desenvolvimento, instalar as dependências e inicializar a API RESTful.  
Baseado nas Issues #1 (Setup do projeto) e #2 (Integração do MongoDB).

---

## 🧱 1. Estrutura do Projeto (Arquitetura MVC)

O projeto segue o padrão **MVC (Model-View-Controller)**, com a seguinte estrutura na raiz do repositório:

```
📦 Fit-Tracker-API
 ┣ 📁 config          # Configurações (DB, JWT, etc.)
 ┣ 📁 controllers     # Regras de negócio
 ┣ 📁 models          # Modelos Mongoose
 ┣ 📁 routes          # Rotas REST (Express Router)
 ┣ 📁 middlewares     # Middlewares de autenticação e validação
 ┣ 📁 tests           # Testes automatizados com Jest + Supertest
 ┣ 📁 DOCS            # Documentação (Swagger + Markdown)
 ┣ 📄 app.js          # Ponto principal da aplicação Express
 ┣ 📄 .env            # Variáveis de ambiente
 ┣ 📄 package.json
 ┗ 📄 README.md
```

---

## 🧰 2. Instalação e Inicialização do Ambiente

### 2.1. Pré-requisitos

- Node.js 18+  
- NPM 9+  
- MongoDB local ou Atlas (URI configurada no `.env`)  
- Git instalado  

---

### 2.2. Clonar o projeto

```bash
git clone https://github.com/Gerebabh/Fit-Tracker-API.git
cd Fit-Tracker-API
```

---

### 2.3. Instalar dependências

#### Dependências de produção
```bash
npm install express dotenv mongoose cookie-parser morgan bcrypt jsonwebtoken swagger-ui-express yaml cors
```

#### Dependências de desenvolvimento
```bash
npm install -D nodemon jest supertest
```

> 💡 **Obs.:** as dependências `bcrypt` e `jsonwebtoken` são utilizadas na autenticação JWT;  
> `swagger-ui-express` e `yaml` geram a interface `/api-docs`.

---

## ⚙️ 3. Configuração do arquivo `.env`

Crie o arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<senha>@cluster0.mongodb.net/fittracker
JWT_SECRET=pass
JWT_EXPIRES=1h
NODE_ENV=development
```

> ⚠️ Em ambiente de produção, utilize um `JWT_SECRET` forte e mantenha o `.env` fora do versionamento (`.gitignore`).

---

## 🚀 4. Scripts úteis (package.json)

Os scripts configurados no `package.json` são:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon -e js,yaml app.js",
  "test": "jest --runInBand --detectOpenHandles",
  "test:watch": "jest --watchAll"
}
```

---

## 🧪 5. Testes automatizados

Os testes cobrem autenticação (JWT), CRUD de atletas e treinos, e cenários de erro.

Executar todos os testes:

```bash
npm test
```

Ver os testes em tempo real (modo observação):

```bash
npm run test:watch
```

Gerar relatório de cobertura (opcional):

```bash
npx jest --coverage
```

---

## 📜 6. Documentação da API

A documentação completa dos endpoints está no arquivo [`DOCS/swagger.yaml`](../DOCS/swagger.yaml).

Após iniciar o servidor, acesse no navegador:

```
http://localhost:3000/api-docs
```

> Inclui exemplos de requisição, resposta, códigos HTTP e schemas de dados (Atleta, Treino, Login, Error).

---

## 🔐 7. Autenticação JWT

- Endpoint de login: `POST /auth/login`  
- Header obrigatório para rotas protegidas:  
  `Authorization: Bearer <token>`

Os tokens expiram conforme definido em `JWT_EXPIRES`.  
Para renovar, utilize `POST /auth/renovar`.

---

## 🧩 8. Como iniciar o servidor

Em ambiente de desenvolvimento (com reload automático):

```bash
npm run dev
```

Em ambiente de produção:

```bash
npm start
```

Após iniciar, verifique o status da API:
```
GET http://localhost:3000/
→ { 
  "service": "Fit-Tracker API", 
  "status": "Online", 
  "version": "1.0.0", 
  "documentation": "/api-docs" 
}
```

---

## 👥 9. Autores e Contribuição

Projeto desenvolvido por:

- **Geraldo Santos (@Gerebabh)** — Back-end, Autenticação, Testes, Documentação técnica.  
- **Pedro Resende (@PedroMResende)** — Modelagem MongoDB, Controllers e Rotas principais.

Histórico de issues e tarefas disponível no **Project Board**:  
🔗 [https://github.com/users/Gerebabh/projects/5/views/1](https://github.com/users/Gerebabh/projects/5/views/1)

---

### ✅ Status do Setup
| Etapa | Status |
|-------|--------|
| Estrutura MVC | ✔️ Concluído |
| Conexão MongoDB | ✔️ Concluído |
| CRUD Atletas/Treinos | ✔️ Concluído |
| Autenticação JWT | ✔️ Concluído |
| Testes Automatizados | ✔️ Concluído |
| Swagger / Docs | ✔️ Concluído |
| Issues GitHub | ⏳ Última issue em andamento |
| README / Setup | ✔️ Atualizado |

---

## 📚 Referências

- [ExpressJS Documentation](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
- [Jest](https://jestjs.io/)
