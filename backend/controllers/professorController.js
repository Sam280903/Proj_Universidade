// controllers/professorController.js

const Professor = require('../models/Professor');
const { Op } = require('sequelize');

// Função para listar todos os professores
exports.getProfessores = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.status(200).json(professores);
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    res.status(500).json({ error: 'Erro ao buscar professores' });
  }
};

// Função para criar um novo professor
exports.createProfessor = async (req, res) => {
    try {
      const { nome, email, telefone, cpfCNPJ, dataCadastro = new Date() } = req.body; // Inclui cpfCNPJ no corpo da requisição
      const novoProfessor = await Professor.create({
        nome,
        email,
        telefone,
        cpfCNPJ,
        dataCadastro,
        inativo: false,
      });
      res.status(201).json(novoProfessor);
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      res.status(500).json({ error: 'Erro ao criar professor' });
    }
  };

// Função para atualizar um professor existente
exports.updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    const [updated] = await Professor.update(
      { nome, email, telefone },
      { where: { idProfessor: id } }
    );

    if (updated) {
      const updatedProfessor = await Professor.findOne({ where: { idProfessor: id } });
      return res.status(200).json(updatedProfessor);
    }
    res.status(404).json({ error: 'Professor não encontrado' });
  } catch (error) {
    console.error('Erro ao atualizar professor:', error);
    res.status(500).json({ error: 'Erro ao atualizar professor' });
  }
};

// Função para desativar um professor
exports.desativarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Professor.update({ inativo: true }, { where: { idProfessor: id } });

    if (updated) {
      const desativadoProfessor = await Professor.findOne({ where: { idProfessor: id } });
      return res.status(200).json(desativadoProfessor);
    }
    res.status(404).json({ error: 'Professor não encontrado' });
  } catch (error) {
    console.error('Erro ao desativar professor:', error);
    res.status(500).json({ error: 'Erro ao desativar professor' });
  }
};

// Função para reativar um professor
exports.reativarProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Professor.update({ inativo: false }, { where: { idProfessor: id } });

    if (updated) {
      const reativadoProfessor = await Professor.findOne({ where: { idProfessor: id } });
      return res.status(200).json(reativadoProfessor);
    }
    res.status(404).json({ error: 'Professor não encontrado' });
  } catch (error) {
    console.error('Erro ao reativar professor:', error);
    res.status(500).json({ error: 'Erro ao reativar professor' });
  }
};

// Função para pesquisar professores por nome ou email
exports.pesquisarProfessores = async (req, res) => {
  try {
    const { termo } = req.query;
    const professores = await Professor.findAll({
      where: {
        [Op.or]: [
          { nome: { [Op.like]: `%${termo}%` } },
          { email: { [Op.like]: `%${termo}%` } },
        ]
      }
    });
    res.status(200).json(professores);
  } catch (error) {
    console.error('Erro ao pesquisar professores:', error);
    res.status(500).json({ error: 'Erro ao pesquisar professores' });
  }
};
