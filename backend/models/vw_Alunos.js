const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajuste o caminho conforme necessário

const VwAlunos = sequelize.define('vw_Alunos', {
  idAluno: {
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
  tableName: 'vw_Alunos', // Nome da view
  timestamps: false // Desabilita os timestamps automáticos
});

module.exports = VwAlunos;
