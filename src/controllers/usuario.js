const bcrypt = require('bcryptjs');
const conexao = require('../db');


exports.cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';

    conexao.query(sql, [nome, email, senhaCriptografada], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            id: resultado.insertId
        });
    });
};


exports.listar = (req, res) => {
    const sql = 'SELECT id, nome, email FROM usuario';

    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.json(resultado);
    });
};

exports.alterar = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?';

    conexao.query(sql, [nome, email, senha, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado!' });
        }

        res.json({ mensagem: 'Usuário alterado com sucesso!' });
    });
};

exports.excluir = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuario WHERE id = ?';

    conexao.query(sql, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado! '});
        }

        res.json({ mensagem: 'Usuario excluido com sucesso! '});
    });
}


exports.login = (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuario WHERE email = ?';

    conexao.query(sql, [email], (erro, resultado) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        if (resultado.length === 0) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos!' });
        }

        const usuario = resultado[0];

        const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Email ou senha incorretos!' });
        }

        res.json({
            mensagem: 'Login realizado com sucesso!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    });
};