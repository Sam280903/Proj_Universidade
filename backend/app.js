const express = require('express');
const cors = require('cors'); // Importando o CORS
const sequelize = require('./config/database');
const alunoRoutes = require('./routes/alunoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const professorRoutes = require('./routes/professorRoutes');
const salaRoutes = require('./routes/salaRoutes');

const app = express();
app.use(cors()); 

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/api/alunos', alunoRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/professores', professorRoutes);
app.use('/salas', salaRoutes);

// Conectando ao banco de dados
sequelize.sync()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error:", error));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
