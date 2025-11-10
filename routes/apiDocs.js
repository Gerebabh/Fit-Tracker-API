// routes/apidocs.js

const express = require('express');
const router = express.Router();
const YAML = require('yaml'); // Usa o 'yaml' conforme sua aula
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const path = require('path'); // Necessário para garantir o caminho

// 1. Constrói o caminho completo do arquivo YAML
const yamlPath = path.join(__dirname, '..', 'swagger.yaml');

// 2. Carrega o arquivo swagger.yaml de forma síncrona
const file = fs.readFileSync(yamlPath, 'utf8');

// 3. Valida e faz o parse do formato YAML para objeto JavaScript
const swaggerDoc = YAML.parse(file);

// 4. Carrega o middleware de rota do Swagger UI
router.use("/", swaggerUi.serve);

// 5. Renderiza a documentação do Swagger na rota /api-docs/
router.get("/", swaggerUi.setup(swaggerDoc));

module.exports = router;