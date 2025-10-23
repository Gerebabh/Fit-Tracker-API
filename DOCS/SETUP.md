# ⚙️ Guia de Configuração e Instalação

Este documento detalha o passo a passo exato para configurar o ambiente de desenvolvimento, instalar as dependências e inicializar a API RESTful, conforme a **Issue #1**.

## 1. Comandos para Inicialização e Estrutura

Execute os comandos na raiz do projeto (após o `git clone`):

### 1.1. Inicialização e Estrutura de Pastas (MVC na Raiz)

O projeto usa a arquitetura MVC (Model-View-Controller) com pastas de componentes na raiz.

```bash
# 1. Inicializa o package.json (se necessário)
npm init -y

# 2. Cria a pasta para documentação
mkdir DOCS

# 3. Cria o arquivo SETUP.md para registrar o passo a passo da configuração do ambiente
SETUP.md

# 4. Cria a estrutura de pastas do código fonte (na raiz do projeto)
mkdir config routes controllers models middlewares tests

# 5. Criar arquivos necessários na pasta raiz
.env, app.js
```

### 1.2 Instalação das dependências
```bash
# 1. Instala dependências de PRODUÇÃO:
- express, dotenv, mongoose, cookie-parser, morgan
npm install express dotenv mongoose cookie-parser morgan

# 2. Instala dependências de DESENVOLVIMENTO:
- nodemon, jest, supertest
npm install -D nodemon jest supertest
```