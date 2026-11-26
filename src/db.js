const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // insira sua senha se houver
    database: 'gestao_energia'
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err)
        return
    }
    console.log('Conectado ao MariaDB/MySQL com sucesso!')
})

module.exports = connection