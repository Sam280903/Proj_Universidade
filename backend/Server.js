// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Importa a conexão ao banco de dados existente
const alunoRoutes = require('./routes/AlunoRoute'); // Importa as rotas de alunos

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para interpretar JSON do frontend

// Rotas
app.use('/api', alunoRoutes); // Usa as rotas de alunos

// Porta do servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
