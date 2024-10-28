const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
  idAluno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataCadastro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  cpfCNPJ: {
    type: DataTypes.STRING(18), // Aumente o limite para 18 caracteres
    allowNull: false,
  },
}, {
  tableName: 'alunos', // Nome da tabela no banco de dados
  timestamps: false,
});

module.exports = Aluno;
