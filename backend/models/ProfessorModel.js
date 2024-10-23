const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Professor = sequelize.define('Professor', {
  idProfessor: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  dataCadastro: {
    type: DataTypes.DATE,  // Melhor utilizar DATE ao invés de VARCHAR para datas
    allowNull: false,
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cpfCNPJ: {
    type: DataTypes.STRING(18),  // Usar STRING ao invés de DOUBLE para CPF/CNPJ
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'Professores',
  timestamps: false,
});

module.exports = Professor;
