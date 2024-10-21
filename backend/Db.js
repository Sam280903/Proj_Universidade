const { Sequelize } = require('sequelize');
require('dotenv').config();  // Carregar as variáveis de ambiente do arquivo .env

// Configuração do Sequelize utilizando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Nome do banco de dados
  process.env.DB_USER,   // Nome de usuário
  process.env.DB_PASSWORD,  // Senha
  {
    host: process.env.DB_HOST,  // Endereço do servidor do banco de dados
    dialect: 'mysql',  // Especificando que o banco é MySQL
    logging: false,  // Desabilitar o log de consultas SQL, para produção
    pool: {
      max: 5,      // Número máximo de conexões no pool
      min: 0,      // Número mínimo de conexões no pool
      acquire: 30000, // Tempo máximo, em milissegundos, que a conexão pode demorar para ser adquirida antes de gerar erro
      idle: 10000,  // Tempo máximo que uma conexão pode ficar inativa antes de ser liberada
    }
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
