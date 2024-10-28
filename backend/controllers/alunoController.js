// Importando o modelo Aluno
const Aluno = require('../models/Aluno');
const { Op } = require('sequelize');

// Função para listar todos os alunos
exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();

    // Converte dataCadastro para o formato dd/mm/yyyy antes de enviar para o frontend
    const formattedAlunos = alunos.map((aluno) => {
      return {
        ...aluno.dataValues,
        dataCadastro: aluno.dataCadastro
          ? aluno.dataCadastro.split('-').reverse().join('/')
          : null,
      };
    });

    res.status(200).json(formattedAlunos);
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

// Função para criar um novo aluno
exports.createAluno = async (req, res) => {
  try {
    const { nome, email, dataCadastro, inativo, cpfCNPJ } = req.body;

    // Valida e converte a data de dd/mm/yyyy para yyyy-mm-dd
    if (!dataCadastro || !/^\d{2}\/\d{2}\/\d{4}$/.test(dataCadastro)) {
      return res.status(400).json({ error: 'Data de cadastro inválida. Use o formato dd/mm/yyyy.' });
    }
    const [day, month, year] = dataCadastro.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    // Criar o aluno no banco de dados com CPF/CNPJ sem máscara
    const novoAluno = await Aluno.create({
      nome,
      email,
      dataCadastro: formattedDate,
      inativo,
      cpfCNPJ: cpfCNPJ.replace(/\D/g, ''),
    });

    res.status(201).json(novoAluno);
  } catch (error) {
    console.error('Erro ao criar aluno:', error);
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
};

// Função para atualizar informações de um aluno existente
exports.updateAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { dataCadastro, cpfCNPJ, ...rest } = req.body;

    // Converte a data de dd/mm/yyyy para yyyy-mm-dd
    const updatedData = {
      ...rest,
      cpfCNPJ: cpfCNPJ ? cpfCNPJ.replace(/\D/g, '') : undefined,
      dataCadastro: dataCadastro
        ? dataCadastro.split('/').reverse().join('-')
        : undefined,
    };

    const [updated] = await Aluno.update(updatedData, { where: { idAluno: id } });
    if (updated) {
      const updatedAluno = await Aluno.findOne({ where: { idAluno: id } });
      return res.status(200).json(updatedAluno);
    }
    res.status(404).json({ error: 'Aluno não encontrado' });
  } catch (error) {
    console.error('Erro ao atualizar aluno:', error);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

// Função para desativar um aluno
exports.desativarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Aluno.update({ inativo: 1 }, { where: { idAluno: id } });
    if (updated) {
      const desativadoAluno = await Aluno.findOne({ where: { idAluno: id } });
      return res.status(200).json(desativadoAluno);
    }
    res.status(404).json({ error: 'Aluno não encontrado' });
  } catch (error) {
    console.error('Erro ao desativar aluno:', error);
    res.status(500).json({ error: 'Erro ao desativar aluno' });
  }
};

// Função para pesquisar alunos
exports.pesquisarAlunos = async (req, res) => {
  try {
    const { termo } = req.query;
    const alunos = await Aluno.findAll({
      where: {
        [Op.or]: [
          { nome: { [Op.like]: `%${termo}%` } },
          { email: { [Op.like]: `%${termo}%` } },
        ],
      },
    });
    res.status(200).json(alunos);
  } catch (error) {
    console.error('Erro ao pesquisar alunos:', error);
    res.status(500).json({ error: 'Erro ao pesquisar alunos' });
  }
};

// Função para reativar um aluno
exports.reativarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Aluno.update({ inativo: 0 }, { where: { idAluno: id } });
    if (updated) {
      const reativadoAluno = await Aluno.findOne({ where: { idAluno: id } });
      return res.status(200).json(reativadoAluno);
    }
    res.status(404).json({ error: 'Aluno não encontrado' });
  } catch (error) {
    console.error('Erro ao reativar aluno:', error);
    res.status(500).json({ error: 'Erro ao reativar aluno' });
  }
};
