const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Professor = sequelize.define('Professor', {
  idProfessor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING(15),  // Usar STRING em vez de DOUBLE para o telefone
    allowNull: true,
  },
  cpfCNPJ: {
    type: DataTypes.DOUBLE,
    allowNull: true,
  },
  dataCadastro: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  inativo: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
}, {
  tableName: 'professores',
  timestamps: false,
});

module.exports = Professor;
