const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se de que este caminho está correto

// Definição do modelo Aluno com Sequelize
const Aluno = sequelize.define('Aluno', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Garantir que o email seja único
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // Opções do modelo
  timestamps: true,  // Adiciona campos createdAt e updatedAt
  tableName: 'alunos'  // Nome da tabela no banco de dados
});

// Função para criar um aluno
const createAluno = async (nome, email, telefone) => {
  try {
    const novoAluno = await Aluno.create({ nome, email, telefone });
    return novoAluno;
  } catch (err) {
    throw err;
  }
};

// Função para consultar todos os alunos
const getAllAlunos = async () => {
  try {
    const alunos = await Aluno.findAll();
    return alunos;
  } catch (err) {
    throw err;
  }
};

// Função para editar um aluno
const updateAluno = async (id, nome, email, telefone) => {
  try {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    aluno.nome = nome;
    aluno.email = email;
    aluno.telefone = telefone;

    await aluno.save();
    return aluno;
  } catch (err) {
    throw err;
  }
};

// Função para excluir aluno
const deleteAluno = async (id) => {
  try {
    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      throw new Error('Aluno não encontrado');
    }

    await aluno.destroy();
    return { message: 'Aluno excluído com sucesso' };
  } catch (err) {
    throw err;
  }
};

module.exports = { createAluno, getAllAlunos, updateAluno, deleteAluno };
