const { Sequelize } = require('sequelize');
require('dotenv').config();  // Carregar as variáveis de ambiente do arquivo .env

// Configuração do Sequelize utilizando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_URL,  // Usando a URL de conexão do banco de dados
  {
    dialect: 'mysql',  // Especificando que o banco é MySQL
    logging: false,  // Desabilitar o log de consultas SQL, para produção
  }
);

// Testando a conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;
