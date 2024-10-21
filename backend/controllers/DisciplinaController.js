const Disciplina = require('../models/Disciplina'); // Importa o modelo de Disciplina

// Criar uma nova disciplina
exports.create = async (req, res) => {
  try {
    const disciplina = await Disciplina.create(req.body);
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar disciplina' });
  }
};

// Obter todas as disciplinas
exports.getAll = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll();
    res.status(200).json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter disciplinas' });
  }
};

// Atualizar uma disciplina
exports.update = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) {
      return res.status(404).json({ error: 'Disciplina não encontrada' });
    }
    await disciplina.update(req.body);
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar disciplina' });
  }
};

// Excluir uma disciplina
exports.delete = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByPk(req.params.id);
    if (!disciplina) {
      return res.status(404).json({ error: 'Disciplina não encontrada' });
    }
    await disciplina.destroy();
    res.status(200).json({ message: 'Disciplina excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir disciplina' });
  }
};
