import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../visualPage/CadastroProfessores.css'; // Arquivo CSS para o layout

const CadastroProfessores = () => {
  const navigate = useNavigate();

  // Estado para controlar os dados do professor
  const [idProfessor, setIdProfessor] = useState(null);  // Adicionando o campo ID
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [ativo, setAtivo] = useState(true);  // Campo de checkbox para o estado ativo/inativo
  const [editingProfessor, setEditingProfessor] = useState(null);

  // Estados para controlar habilitação de botões
  const [canCreate, setCanCreate] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);

  // Função para buscar professores cadastrados no backend
  const fetchProfessores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/professores');
      const professores = response.data;
      // Aqui você pode adicionar lógica adicional se necessário
    } catch (err) {
      console.error('Erro ao consultar professores:', err);
    }
  };

  // Função para criar novo professor
  const handleCreateNewProfessor = async () => {
    try {
      await axios.post('http://localhost:5000/professores', {
        nome,
        email,
        dataCadastro,
        ativo,
      });
      clearFields();  // Limpa os campos
    } catch (err) {
      console.error('Erro ao criar professor:', err);
    }
  };

  // Função para editar professor
  const handleEditProfessor = async () => {
    try {
      await axios.put(`http://localhost:5000/professores/${idProfessor}`, {
        nome,
        email,
        dataCadastro,
        ativo,
      });
      clearFields();
    } catch (err) {
      console.error('Erro ao editar professor:', err);
    }
  };

  // Função para excluir professor
  const handleDeleteProfessor = async () => {
    try {
      await axios.delete(`http://localhost:5000/professores/${idProfessor}`);
      clearFields();
    } catch (err) {
      console.error('Erro ao excluir professor:', err);
    }
  };

  // Função para consultar professores
  const handleConsultProfessores = () => {
    navigate('/consultas/ConsultaProfessores');
  };

  // Função para limpar os campos do formulário
  const clearFields = () => {
    setIdProfessor(null);
    setNome('');
    setEmail('');
    setDataCadastro('');
    setAtivo(true);
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <div className="container-cadastro-professores">
      <h2>{editingProfessor ? 'Editar Professor' : 'Cadastro de Professores'}</h2>
      
      <div className="form-cadastro">
        <div>
          <label>ID do Professor:</label>
          <input
            type="text"
            value={idProfessor || ''}
            disabled
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Data de Cadastro:</label>
          <input
            type="date"
            value={dataCadastro}
            onChange={(e) => setDataCadastro(e.target.value)}
          />
        </div>
        <div>
          <label>Ativo:</label>
          <input
            type="checkbox"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
          />
        </div>

        <div className="buttons">
          <button onClick={handleCreateNewProfessor} disabled={!canCreate}>Novo</button>
          <button onClick={handleEditProfessor} disabled={!canEdit}>Salvar</button>
          <button onClick={handleDeleteProfessor} disabled={!canDelete}>Excluir</button>
          <button onClick={handleConsultProfessores} disabled={!canConsult}>Consultar</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroProfessores;
