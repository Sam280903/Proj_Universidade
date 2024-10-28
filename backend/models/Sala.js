// models/Sala.js
const { DataTypes } = require('sequelize');
const db = require('../config/database'); // Assumindo que você configurou seu banco de dados aqui

const Sala = db.define('Sala', {
  idSala: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'salas', // Nome da tabela no banco de dados
  timestamps: false,
});

module.exports = Sala;
