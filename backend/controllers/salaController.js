// controllers/salaController.js

const Sala = require('../models/Sala');

// Listar todas as salas
exports.getSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll();
    res.status(200).json(salas);
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    res.status(500).json({ error: 'Erro ao buscar salas' });
  }
};

// Criar uma nova sala
exports.createSala = async (req, res) => {
  try {
    const { nome, capacidade } = req.body;
    const novaSala = await Sala.create({ nome, capacidade, inativo: false });
    res.status(201).json(novaSala);
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    res.status(500).json({ error: 'Erro ao criar sala' });
  }
};

// Atualizar uma sala
exports.updateSala = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, capacidade } = req.body;
    const [updated] = await Sala.update({ nome, capacidade }, { where: { idSala: id } });

    if (updated) {
      const updatedSala = await Sala.findOne({ where: { idSala: id } });
      return res.status(200).json(updatedSala);
    }
    res.status(404).json({ error: 'Sala não encontrada' });
  } catch (error) {
    console.error('Erro ao atualizar sala:', error);
    res.status(500).json({ error: 'Erro ao atualizar sala' });
  }
};

// Desativar uma sala
exports.desativarSala = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Sala.update({ inativo: true }, { where: { idSala: id } });

    if (updated) {
      const desativadaSala = await Sala.findOne({ where: { idSala: id } });
      return res.status(200).json(desativadaSala);
    }
    res.status(404).json({ error: 'Sala não encontrada' });
  } catch (error) {
    console.error('Erro ao desativar sala:', error);
    res.status(500).json({ error: 'Erro ao desativar sala' });
  }
};

// Reativar uma sala
exports.reativarSala = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Sala.update({ inativo: false }, { where: { idSala: id } });

    if (updated) {
      const reativadaSala = await Sala.findOne({ where: { idSala: id } });
      return res.status(200).json(reativadaSala);
    }
    res.status(404).json({ error: 'Sala não encontrada' });
  } catch (error) {
    console.error('Erro ao reativar sala:', error);
    res.status(500).json({ error: 'Erro ao reativar sala' });
  }
};
