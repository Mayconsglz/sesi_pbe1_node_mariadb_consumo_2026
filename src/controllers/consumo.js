const conexao = require('../db');


exports.cadastrar = (req, res) => {
    const {
        usuarioId,
        local,
        equipamento,
        consumoKwh,
        mesReferencia,
        status
    } = req.body;

    const sql = `
        INSERT INTO consumo
        (usuarioId, local, equipamento, consumoKwh, mesReferencia, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(sql, [
        usuarioId,
        local,
        equipamento,
        consumoKwh,
        mesReferencia,
        status
    ], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(201).json({
            mensagem: 'Consumo cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
};

exports.listar = (req, res) => {
    const sql = 'SELECT * FROM consumo';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.json(resultado);
    });
};


exports.alterar = (req, res) => {
    const { id } = req.params;

    const {
        usuarioId,
        local,
        equipamento,
        consumoKwh,
        mesReferencia,
        status
    } = req.body;

    const sql = `
        UPDATE consumo
        SET usuarioId = ?, local = ?, equipamento = ?,
        consumoKwh = ?, mesReferencia = ?, status = ?
        WHERE id = ?
    `;

    conexao.query(sql, [
        usuarioId,
        local,
        equipamento,
        consumoKwh,
        mesReferencia,
        status,
        id
    ], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Consumo não encontrado!' });
        }

        res.json({ mensagem: 'Consumo alterado com sucesso!' });
    });
};


exports.excluir = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM consumo WHERE id = ?';

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Consumo não encontrado!' });
        }

        res.json({ mensagem: 'Consumo excluído com sucesso!' });
    });
};


exports.media = (req, res) => {
    const sql = 'SELECT AVG(consumoKwh) AS mediaConsumo FROM consumo';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.json({
            mediaConsumo: Number(resultado[0].mediaConsumo || 0)
        });
    });
};