// db.js
const mysql = require('mysql2');

// Configura a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'BDFAC'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
});

module.exports = db; // Exporta a conexão para ser usada em outros arquivos
