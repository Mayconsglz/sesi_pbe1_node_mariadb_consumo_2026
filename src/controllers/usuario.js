const con = require('../db')

const criarUsuario = (req, res) => {
    const { nome, email, senha } = req.body
    const query = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?))"
    
    con.query(query, [nome, email, senha], (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", id: result.insertId })
    })
}

const listarUsuarios = (req, res) => {
    const query = "SELECT id, nome, email FROM usuario"
    con.query(query, (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        res.json(result)
    })
}

const atualizarUsuario = (req, res) => {
    const { id } = req.params
    const { nome, email } = req.body
    const query = "UPDATE usuario SET nome = ?, email = ? WHERE id = ?"

    con.query(query, [nome, email, id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: "Usuário não encontrado." })
        res.json({ mensagem: "Usuário atualizado com sucesso!" })
    })
}

const deletarUsuario = (req, res) => {
    const { id } = req.params
    const query = "DELETE FROM usuario WHERE id = ?"

    con.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: "Usuário não encontrado." })
        res.json({ mensagem: "Usuário removido com sucesso!" })
    })
}

const login = (req, res) => {
    const { email, senha } = req.body
    const query = "SELECT id, nome, email FROM usuario WHERE email = ? AND senha = password(?)"

    con.query(query, [email, senha], (err, result) => {
        if (err) return res.status(500).json({ erro: err.sqlMessage })
        if (result.length === 0) return res.status(401).json({ mensagem: "E-mail ou senha inválidos!" })
        res.json({ mensagem: "Login realizado com sucesso!", usuario: result[0] })
    })
}

module.exports = { criarUsuario, listarUsuarios, atualizarUsuario, deletarUsuario, login }