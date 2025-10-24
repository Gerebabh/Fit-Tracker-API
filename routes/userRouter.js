// routes/atletaRouter.js

const express = require('express');
const router = express.Router();

// Placeholder da rota GET /atletas (Será expandida na Issue #3)
router.get('/', (req, res) => {
    res.json({ message: 'Router de Atletas funcionando (placeholder da Issue #1)' });
});

module.exports = router;