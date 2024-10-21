import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importando Axios para fazer as requisições HTTP

const CadastroAlunos = () => {
  const navigate = useNavigate();

  // Estado para controlar os dados do aluno
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [editingAluno, setEditingAluno] = useState(null);  // Estado para armazenar o aluno que está sendo editado
  
  // Estados de habilitação dos botões
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);
  const [canCreate, setCanCreate] = useState(true);

  // UseEffect para carregar os alunos quando a página é carregada
  useEffect(() => {
    fetchAlunos();
  }, []);

  // Função para buscar alunos cadastrados no backend
  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/alunos');
      setAlunos(response.data);  // Armazenar os alunos no estado
    } catch (err) {
      console.error('Erro ao consultar alunos:', err);
    }
  };

  // Função para criar novo aluno
  const handleCreateNewAluno = async () => {
    try {
      const response = await axios.post('http://localhost:5000/alunos', {
        nome,
        idade
      });
      console.log(response.data);  // Sucesso no backend
      fetchAlunos();  // Atualizar lista de alunos
      setNome('');  // Limpar os campos após cadastro
      setIdade('');
    } catch (err) {
      console.error('Erro ao criar aluno:', err);
    }
  };

  // Função para editar aluno
  const handleEditAluno = async (id) => {
    try {
      const alunoToEdit = alunos.find(aluno => aluno.id === id);
      setNome(alunoToEdit.nome);
      setIdade(alunoToEdit.idade);
      setEditingAluno(alunoToEdit);  // Marcar que está editando
      setCanEdit(true);  // Permitir editar
      setCanCreate(false);  // Desabilitar criar durante a edição
    } catch (err) {
      console.error('Erro ao editar aluno:', err);
    }
  };

  // Função para salvar edição de aluno
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/alunos/${editingAluno.id}`, {
        nome,
        idade
      });
      console.log(response.data);  // Sucesso no backend
      fetchAlunos();  // Atualizar lista de alunos
      setNome('');  // Limpar os campos
      setIdade('');
      setEditingAluno(null);  // Finalizar a edição
      setCanEdit(false);  // Desabilitar edição
      setCanCreate(true);  // Habilitar criar novamente
    } catch (err) {
      console.error('Erro ao salvar edição:', err);
    }
  };

  // Função para excluir aluno
  const handleDeleteAluno = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/alunos/${id}`);
      console.log(response.data);  // Sucesso no backend
      fetchAlunos();  // Atualizar lista de alunos
    } catch (err) {
      console.error('Erro ao excluir aluno:', err);
    }
  };

  // Função para navegar para consulta de alunos
  const handleConsultAlunos = () => {
    navigate('/consulta/alunos');
  };

  return (
    <div>
      <h1>{editingAluno ? 'Editar Aluno' : 'Cadastro de Alunos'}</h1>

      {/* Formulário de cadastro ou edição */}
      <div>
        <input
          type="text"
          placeholder="Nome do Aluno"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        
        {editingAluno ? (
          <button onClick={handleSaveEdit}>Salvar Edição</button>
        ) : (
          <button onClick={handleCreateNewAluno} disabled={!canCreate}>Cadastrar</button>
        )}
      </div>

      {/* Lista de alunos */}
      <div>
        <h2>Lista de Alunos</h2>
        <ul>
          {alunos.map(aluno => (
            <li key={aluno.id}>
              {aluno.nome} - {aluno.idade} anos
              <button onClick={() => handleEditAluno(aluno.id)} disabled={!canEdit}>Editar</button>
              <button onClick={() => handleDeleteAluno(aluno.id)} disabled={!canDelete}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={handleConsultAlunos} disabled={!canConsult}>Consultar Alunos</button>
      </div>
    </div>
  );
};

export default CadastroAlunos;
