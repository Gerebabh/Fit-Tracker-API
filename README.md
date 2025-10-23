# 🏃‍♂️ Trabalho API RESTful — Gestão de Atletas e Atividades

Este projeto consiste no desenvolvimento de uma API RESTful completa para o gerenciamento de atletas, seguindo as melhores práticas de desenvolvimento, autenticação (JWT) e testes unitários.

## 🏁 Requisitos do Projeto

O objetivo é implementar uma API completa para a entidade **Atleta**, com as seguintes funcionalidades obrigatórias:
1.  Implementação de rotas **CRUD** (Create, Read, Update, Delete).
2.  Uso do framework **Express** (Node.js).
3.  Uso do banco de dados **MongoDB** (via Mongoose).
4.  Implementação de **Autenticação JWT** para proteger rotas de escrita (POST, PUT, DELETE).
5.  Separação da lógica em **Rotas, Controladores e Modelos**.
6.  Desenvolvimento de **Testes Unitários**.
7.  Documentação com **Swagger (OpenAPI)**.

## 👥 Participantes

| Nome Completo | Matrícula | Função (Atribuição Principal) |
| :--- | :--- | :--- |
| **Geraldo Lucio Carvalho dos Santos** | 2424290069 | Setup, Infraestrutura e Conexão DB |
| **Gustavo Almeida Von Sperling de Lima** | 2414290052 | Segurança (JWT) e Testes |
| **Pedro Medeiros Resende** | 2424290048 | CRUD Core, Validações e Documentação (Team Leader) |

---

## 🛠️ Tecnologias Utilizadas

| Componente | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Linguagem de Programação** | **Node.js** | Ambiente de execução JavaScript. |
| **Framework** | **Express.js** | Framework web para roteamento e middlewares. |
| **Banco de Dados** | **MongoDB** | Banco de dados NoSQL (utilizando Mongoose). |
| **Autenticação** | **JSON Web Token (JWT)** | Padrão para proteção de rotas. |
| **Testes** | **Jest e Supertest** | Framework de testes unitários e de integração. |
| **Documentação** | **Swagger (OpenAPI)** | Geração de documentação interativa. |
| **Controle de Versão** | **Git e GitHub** | Repositório público e rastreamento de Issues. |

---

## ⬇️ Configuração e Execução

### 1. Clonar o Repositório

Para obter o código-fonte do projeto em sua máquina local, abra seu terminal e execute o seguinte comando:

cd fitTracker-API  
git clone [https://github.com/Gerebabh/Fit-Tracker-API.git](https://github.com/Gerebabh/Fit-Tracker-API.git)


---

## 📝 Boas Práticas de Commit (Conventional Commits)

Adotamos o padrão Conventional Commits para garantir mensagens de commit padronizadas, claras e rastreáveis. Cada mensagem deve ter o formato:

`<tipo>(<escopo>): <descrição breve>`

Onde:
* **tipo**: Define a natureza da alteração.
* **escopo** (Opcional): Indica a parte do código afetada (ex: `routes`, `auth`, `controller`).
* **descrição**: Frase curta e imperativa da mudança (ex: "adiciona rota", "corrige bug").

### Tipos de Commit Mais Comuns

| Tipo | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| **feat** | **Nova Funcionalidade**. Adiciona um novo recurso ao código (maior ou menor). | `feat(atletas): implementa rota POST para criação` |
| **fix** | **Correção de Bug**. Corrige um erro no código. | `fix(auth): corrige erro ao decodificar token JWT` |
| **docs** | **Documentação**. Alterações apenas na documentação (README, Swagger, comentários). | `docs: atualiza seção de testes no README` |
| **style** | **Estilo de Código**. Alterações que não afetam o significado do código (espaços, ponto-e-vírgula, formatação). | `style: ajusta quebra de linha em Atleta.js` |
| **refactor** | **Refatoração**. Mudança que não adiciona *feature* nem corrige *bug* (melhora a estrutura/legibilidade). | `refactor(controller): extrai lógica de validação para middleware` |
| **test** | **Testes**. Adição ou correção de testes (unitários ou de integração). | `test(routes): cria teste para rota GET /atletas/:id` |
| **chore** | **Tarefas/Build**. Mudanças que não afetam o código de produção (atualização de dependências, scripts de build, etc.). | `chore(deps): atualiza express para v4.18.3` |

---

# 📋 Plano de Desenvolvimento (Issues Iniciais)

O plano abaixo segue a metodologia **TDD (Test-Driven Development)**, priorizando a implementação e o teste imediato do **CRUD Básico** (Etapas 1 a 6) para depois introduzir a complexidade de **Segurança (JWT)** e **Documentação (Swagger)**.

| Issue | Título da Issue | Responsável Previsto | Fase | Status |
| :---: | :--- | :---: | :---: | :---: |
| #1 | Setup Inicial do Projeto (Express, Jest, Estrutura, Dependências) | Geraldo | **BASE** | 🟡 EM ANDAMENTO |
| #2 | Configuração do DB (MongoDB/Mongoose) e Variáveis de Ambiente | Geraldo | **BASE** | 🔵 PENDENTE |
| #3 | Modelo Mongoose e Validações Iniciais (Schema Atleta) | Geraldo | **BASE** | 🔵 PENDENTE |
| #4 | Implementação e Testes: Rotas de Leitura (GET All e GET by ID) | Pedro / Gustavo | **CRUD** | 🔵 PENDENTE |
| #5 | Implementação e Testes: Rota de Criação (POST) | Pedro / Gustavo | **CRUD** | 🔵 PENDENTE |
| #6 | Implementação e Testes: Rotas de Modificação e Deleção (PUT/PATCH, DELETE) | Pedro / Gustavo | **CRUD** | 🔵 PENDENTE |
| #7 | Refatoração: Tratamento de Erros (Status HTTP 4XX/5XX) e Middleware de Validação | Pedro | **ROBUSTEZ** | 🔵 PENDENTE |
| #8 | Implementação Rota de Autenticação (POST /login) e Geração de JWT | Pedro | **SEGURANÇA** | 🔵 PENDENTE |
| #9 | Implementação Middleware de Autenticação e Proteção das Rotas de Escrita | Geraldo | **SEGURANÇA** | 🔵 PENDENTE |
| #10 | Desenvolvimento de Testes de Segurança (Login e Rotas Protegidas) | Gustavo | **QUALIDADE** | 🔵 PENDENTE |
| #11 | Documentação da API com Swagger (OpenAPI) | Pedro/Geraldo/Gustavo | **DOCUMENTAÇÃO** | 🔵 PENDENTE |
| #12 | Revisão Final (README, Cobertura de Testes e Histórico de Issues) | Pedro/Geraldo/Gustavo | **FINALIZAÇÃO** | 🔵 PENDENTE |

---
**Legenda de Status:**
- 🔵 PENDENTE: A tarefa ainda não foi iniciada.
- 🟡 EM ANDAMENTO: O trabalho na tarefa está em curso.
- 🟣 EM REVISÃO (Pull Request): O código está pronto e aguarda aprovação.
- 🟢 CONCLUÍDO: A tarefa foi finalizada e integrada à `main`.