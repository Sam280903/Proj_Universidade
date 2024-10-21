const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const alunoRoutes = require('./routes/alunoRoutes');  // Importando as rotas de aluno
const salasRoutes = require('./routes/salasRoutes');  // Importando as rotas de salas
const sequelize = require('./db');  // Conexão com o banco de dados (db.js está na mesma pasta)

// Inicializando o aplicativo Express
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());  // Permitir requisições de diferentes origens
app.use(bodyParser.json());  // Para lidar com JSON no corpo das requisições

// Usando as rotas para alunos e salas
app.use('/alunos', alunoRoutes);  // As rotas de aluno estarão disponíveis como /alunos
app.use('/salas', salasRoutes);   // As rotas de salas estarão disponíveis como /salas

// Iniciar o servidor e sincronizar o banco de dados
sequelize.sync()  // Sincroniza as tabelas do banco com os modelos definidos no Sequelize
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
