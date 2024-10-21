const db = require('../config/database'); // Configuração do banco de dados

// Função para obter todos os professores
const getProfessores = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM professores', (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

// Função para adicionar um novo professor
const createProfessor = (professor) => {
  const { nome, email, dataCadastro } = professor;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO professores (nome, email, dataCadastro) VALUES (?, ?, ?)',
      [nome, email, dataCadastro],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results.insertId);
      }
    );
  });
};

// Função para atualizar um professor
const updateProfessor = (id, professor) => {
  const { nome, email, dataCadastro } = professor;
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE professores SET nome = ?, email = ?, dataCadastro = ? WHERE id = ?',
      [nome, email, dataCadastro, id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
};

// Função para excluir um professor
const deleteProfessor = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM professores WHERE id = ?', [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  getProfessores,
  createProfessor,
  updateProfessor,
  deleteProfessor
};
