const express = require('express');
const usuario = require('./controllers/usuario');
const consumo = require('./controllers/consumo');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API Energia funcionando!');
});

router.post('/usuarios', usuario.cadastrar);
router.get('/usuarios', usuario.listar);
router.put('/usuarios/:id', usuario.alterar);
router.delete('/usuarios/:id', usuario.excluir);
router.post('/login', usuario.login);
router.post('/consumos', consumo.cadastrar);
router.get('/consumos', consumo.listar);
router.put('/consumos/:id', consumo.alterar);
router.delete('/consumos/:id', consumo.excluir);
router.get('/consumos/media', consumo.media);

module.exports = router;