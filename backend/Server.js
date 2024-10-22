const express = require('express');
const cors = require('cors');
const alunoRoutes = require('./routes/AlunoRoute');  // Importando as rotas de aluno (corrigido para AlunoRoute com "A" maiúsculo)
const salasRoutes = require('./routes/salasRoute');  // Importando as rotas de salas
const disciplinaRoutes = require('./routes/DisciplinaRoute');  // Importando as rotas de disciplina
const professorRoutes = require('./routes/ProfessorRoute');  // Importando as rotas de professor
const sequelize = require('../db');  // Certifique-se de que o caminho para o arquivo db.js esteja correto

// Inicializando o aplicativo Express
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());  // Permitir requisições de diferentes origens
app.use(express.json());  // Substitui bodyParser.json(), pois o body-parser já está integrado ao Express

// Usando as rotas para alunos, salas, disciplinas e professores
app.use('/alunos', alunoRoutes);  // As rotas de aluno estarão disponíveis como /alunos
app.use('/salas', salasRoutes);   // As rotas de salas estarão disponíveis como /salas
app.use('/disciplinas', disciplinaRoutes);  // As rotas de disciplina estarão disponíveis como /disciplinas
app.use('/professores', professorRoutes);   // As rotas de professor estarão disponíveis como /professores

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
