const express = require('express'); 
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');  // Importando as rotas de aluno
const salasRoutes = require('./routes/salasRoutes');  // Importando as rotas de salas
const sequelize = require('../db');  // Certifique-se de que o caminho para o arquivo db.js esteja correto

// Inicializando o aplicativo Express
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());  // Permitir requisições de diferentes origens
app.use(express.json());  // Substitui bodyParser.json(), pois o body-parser já está integrado ao Express

// Usando as rotas para alunos e salas
app.use('/alunos', alunoRoutes);  // As rotas de aluno estarão disponíveis como /alunos
app.use('/salas', salasRoutes);   // As rotas de salas estarão disponíveis como /salas

// Iniciar o servidor e sincronizar o banco de dados
sequelize.sync()  // Sincroniza as tabelas do banco com os modelos definidos no Sequelize
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);  // Usando template literals para interpolar a porta
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
