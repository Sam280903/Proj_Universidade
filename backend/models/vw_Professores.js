const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const VwProfessores = sequelize.define('vw_Professores', {
  idProfessor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dataCadastro: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cpfCNPJ: {
    type: DataTypes.STRING,
    allowNull: true
  },
  inativo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'vw_Professores',
  timestamps: false
});

module.exports = VwProfessores;
