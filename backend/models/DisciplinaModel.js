const { DataTypes } = require('sequelize');
const sequelize = require('../db');  // Importar a conexão do Sequelize

const Disciplina = sequelize.define('Disciplina', {
  idDisciplina: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  cargaHoraria: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  inativo: {
    type: DataTypes.BOOLEAN,  // Recomendo usar BOOLEAN para campo inativo
    defaultValue: false,
  }
}, {
  tableName: 'Disciplinas',  // Nome da tabela no banco de dados
  timestamps: false,         // Se não precisar de createdAt e updatedAt
});

module.exports = Disciplina;
