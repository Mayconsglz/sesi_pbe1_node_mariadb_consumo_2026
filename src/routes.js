const express = require("express")
const router = express.Router()

const usuarioController = require("./controllers/usuario")
const consumoController = require("./controllers/consumo")

router.get('/', (req, res) => {
    res.json("Back-end de Consumo de Energia respondendo com sucesso!")
})

// [RF002] Login
router.post('/login', usuarioController.login)

// [RF001] CRUD de Usuários
router.post('/usuarios', usuarioController.criarUsuario)
router.get('/usuarios', usuarioController.listarUsuarios)
router.put('/usuarios/:id', usuarioController.atualizarUsuario)
router.delete('/usuarios/:id', usuarioController.deletarUsuario)

// [RF004] Resumo (Média de consumo) - DEVE ficar antes das rotas com parâmetro dinâmico (:id)
router.get('/consumo/resumo', consumoController.resumoMedia)

// [RF003] CRUD de Consumo
router.post('/consumo', consumoController.criarConsumo)
router.get('/consumo', consumoController.listarConsumo)
router.put('/consumo/:id', consumoController.atualizarConsumo)
router.delete('/consumo/:id', consumoController.deletarConsumo)

module.exports = router