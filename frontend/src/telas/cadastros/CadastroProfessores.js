import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Adicionado para redirecionamento
import '../../visualPage/CadastroProfessores.css'; // Importe o arquivo CSS

const CadastroProfessores = () => {
  const navigate = useNavigate(); // Inicializar o hook de navegação
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [ativo, setAtivo] = useState(true); // Estado para ativo/inativo
  const [idProfessorEditando, setIdProfessorEditando] = useState(null);

  // Estados para controlar habilitação de botões
  const [canCreate, setCanCreate] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);

  // Função para criar um novo professor
  const handleCreateNewProfessor = async () => {
    try {
      await axios.post('http://localhost:5000/api/professores', {
        nome,
        email,
        dataCadastro,
        ativo,
      });
      limparCampos();
    } catch (err) {
      console.error('Erro ao criar professor:', err);
    }
  };

  // Função para editar um professor existente
  const handleEditProfessor = async () => {
    try {
      if (idProfessorEditando) {
        await axios.put(`http://localhost:5000/api/professores/${idProfessorEditando}`, {
          nome,
          email,
          dataCadastro,
          ativo,
        });
        limparCampos();
        setIdProfessorEditando(null);
      }
    } catch (err) {
      console.error('Erro ao editar professor:', err);
    }
  };

  // Função para excluir um professor
  const handleDeleteProfessor = async () => {
    try {
      if (idProfessorEditando) {
        await axios.delete(`http://localhost:5000/api/professores/${idProfessorEditando}`);
        limparCampos();
        setIdProfessorEditando(null);
      }
    } catch (err) {
      console.error('Erro ao excluir professor:', err);
    }
  };

  // Função para consultar professores
  const handleConsultProfessors = () => {
    navigate('/consultas/ConsultaProfessores'); // Redirecionar para a rota correta
  };

  // Função para limpar os campos do formulário
  const limparCampos = () => {
    setNome('');
    setEmail('');
    setDataCadastro('');
    setAtivo(true); // Por padrão, ativo
    setIdProfessorEditando(null); // Sai do modo de edição
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <div className="container-cadastro-professores">
      <h2>Cadastro de Professores</h2>
      <div className="form-cadastro">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data de Cadastro"
          value={dataCadastro}
          onChange={(e) => setDataCadastro(e.target.value)}
        />

        <div>
          <label>
            <input
              type="checkbox"
              checked={ativo}
              onChange={(e) => setAtivo(e.target.checked)}
            />
            Ativo
          </label>
        </div>

        <div className="buttons">
          <button onClick={handleCreateNewProfessor} disabled={!canCreate}>Novo</button>
          <button onClick={handleEditProfessor} disabled={!canEdit}>Editar</button>
          <button onClick={handleDeleteProfessor} disabled={!canDelete}>Excluir</button>
          <button onClick={handleConsultProfessors} disabled={!canConsult}>Consultar</button>
        </div>
      </div>
    </div>
  );
};

export default CadastroProfessores;
