// Importando o modelo Disciplina
const Disciplina = require('../models/Disciplina');
const { Op } = require('sequelize');

// Função para listar todas as disciplinas
exports.getDisciplinas = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll();
    res.status(200).json(disciplinas);
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    res.status(500).json({ error: 'Erro ao buscar disciplinas' });
  }
};

// Função para criar uma nova disciplina
exports.createDisciplina = async (req, res) => {
  try {
    const { nome, cargaHoraria } = req.body;
    const novaDisciplina = await Disciplina.create({
      nome,
      cargaHoraria,
      inativo: false, // Define como ativa (inativo = false)
    });
    res.status(201).json(novaDisciplina);
  } catch (error) {
    console.error('Erro ao criar disciplina:', error);
    res.status(500).json({ error: 'Erro ao criar disciplina' });
  }
};

// Função para atualizar uma disciplina existente
exports.updateDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cargaHoraria } = req.body;

    const [updated] = await Disciplina.update(
      { nome, cargaHoraria },
      { where: { idDisciplina: id } }
    );

    if (updated) {
      const updatedDisciplina = await Disciplina.findOne({ where: { idDisciplina: id } });
      return res.status(200).json(updatedDisciplina);
    }
    res.status(404).json({ error: 'Disciplina não encontrada' });
  } catch (error) {
    console.error('Erro ao atualizar disciplina:', error);
    res.status(500).json({ error: 'Erro ao atualizar disciplina' });
  }
};

// Função para desativar uma disciplina
exports.desativarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Disciplina.update({ inativo: true }, { where: { idDisciplina: id } });
    if (updated) {
      const desativadaDisciplina = await Disciplina.findOne({ where: { idDisciplina: id } });
      return res.status(200).json(desativadaDisciplina);
    }
    res.status(404).json({ error: 'Disciplina não encontrada' });
  } catch (error) {
    console.error('Erro ao desativar disciplina:', error);
    res.status(500).json({ error: 'Erro ao desativar disciplina' });
  }
};

// Função para reativar uma disciplina
exports.reativarDisciplina = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Disciplina.update({ inativo: false }, { where: { idDisciplina: id } });
    if (updated) {
      const reativadaDisciplina = await Disciplina.findOne({ where: { idDisciplina: id } });
      return res.status(200).json(reativadaDisciplina);
    }
    res.status(404).json({ error: 'Disciplina não encontrada' });
  } catch (error) {
    console.error('Erro ao reativar disciplina:', error);
    res.status(500).json({ error: 'Erro ao reativar disciplina' });
  }
};

// Função para pesquisar disciplinas por nome
exports.pesquisarDisciplinas = async (req, res) => {
  try {
    const { termo } = req.query;
    const disciplinas = await Disciplina.findAll({
      where: {
        nome: { [Op.like]: `%${termo}%` }
      }
    });
    res.status(200).json(disciplinas);
  } catch (error) {
    console.error('Erro ao pesquisar disciplinas:', error);
    res.status(500).json({ error: 'Erro ao pesquisar disciplinas' });
  }
};
