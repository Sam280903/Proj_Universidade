// Disciplina.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Disciplina = sequelize.define('Disciplina', {
  idDisciplina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargaHoraria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'disciplinas',
  timestamps: false,
});

module.exports = Disciplina;
