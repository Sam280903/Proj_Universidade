const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Conexão com o banco de dados

const Disciplina = sequelize.define('Disciplina', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargaHoraria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Disciplina;
