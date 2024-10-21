const ProfessorModel = require('../models/ProfessorModel');

// Obter todos os professores
const getAllProfessores = async (req, res) => {
  try {
    const professores = await ProfessorModel.getProfessores();
    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os professores' });
  }
};

// Criar um novo professor
const createProfessor = async (req, res) => {
  try {
    const professorId = await ProfessorModel.createProfessor(req.body);
    res.status(201).json({ id: professorId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o professor' });
  }
};

// Atualizar um professor
const updateProfessor = async (req, res) => {
  try {
    await ProfessorModel.updateProfessor(req.params.id, req.body);
    res.status(200).json({ message: 'Professor atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o professor' });
  }
};

// Excluir um professor
const deleteProfessor = async (req, res) => {
  try {
    await ProfessorModel.deleteProfessor(req.params.id);
    res.status(200).json({ message: 'Professor excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o professor' });
  }
};

module.exports = {
  getAllProfessores,
  createProfessor,
  updateProfessor,
  deleteProfessor
};
