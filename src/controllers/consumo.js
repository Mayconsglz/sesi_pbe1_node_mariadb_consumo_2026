const con = require('../db')

const criarConsumo = (req, res) => {
    const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body
    const query = "INSERT INTO consumo (usuarioId, local, equipamento, consumoKwh, mesReferencia, status) VALUES (?, ?, ?, ?, ?, ?)"

    con.query(query, [usuarioId, local, equipamento, consumoKwh, mesReferencia, status || 'Baixo'], (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        res.status(201).json({ mensagem: "Registro de consumo criado com sucesso!", id: result.insertId })
    })
}

const listarConsumo = (req, res) => {
    const query = `
        SELECT c.id, c.local, c.equipamento, c.consumoKwh, c.mesReferencia, c.status, u.nome AS usuario 
        FROM consumo c 
        JOIN usuario u ON c.usuarioId = u.id
    `
    con.query(query, (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        res.json(result)
    })
}

const atualizarConsumo = (req, res) => {
    const { id } = req.params
    const { local, equipamento, consumoKwh, mesReferencia, status } = req.body
    const query = "UPDATE consumo SET local = ?, equipamento = ?, consumoKwh = ?, mesReferencia = ?, status = ? WHERE id = ?"

    con.query(query, [local, equipamento, consumoKwh, mesReferencia, status, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: "Registro de consumo não encontrado." })
        res.json({ mensagem: "Registro atualizado com sucesso!" })
    })
}

const deletarConsumo = (req, res) => {
    const { id } = req.params
    const query = "DELETE FROM consumo WHERE id = ?"

    con.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: "Registro de consumo não encontrado." })
        res.json({ mensagem: "Registro removido com sucesso!" })
    })
}

const resumoMedia = (req, res) => {
    const query = "SELECT AVG(consumoKwh) AS mediaConsumoKwh FROM consumo"
    con.query(query, (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        res.json(result[0])
    })
}

module.exports = { criarConsumo, listarConsumo, atualizarConsumo, deletarConsumo, resumoMedia }