import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CadastroAlunos = () => {
  const navigate = useNavigate();

  // Estado para controlar os dados do aluno
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [matricula, setMatricula] = useState('');
  const [inativo, setInativo] = useState(false); // checkbox de inativo
  const [alunos, setAlunos] = useState([]);
  const [editingAluno, setEditingAluno] = useState(null);  // Estado para armazenar o aluno que está sendo editado
  const [canCreate, setCanCreate] = useState(true);

  // UseEffect para carregar os alunos ao carregar a página
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
        email,
        dataCadastro,
        matricula,
        inativo
      });
      console.log(response.data);  // Sucesso no backend
      fetchAlunos();  // Atualizar lista de alunos
      clearFields();  // Limpar campos
    } catch (err) {
      console.error('Erro ao criar aluno:', err);
    }
  };

  // Função para editar aluno
  const handleEditAluno = async (id) => {
    const alunoToEdit = alunos.find(aluno => aluno.id === id);
    setNome(alunoToEdit.nome);
    setEmail(alunoToEdit.email);
    setDataCadastro(alunoToEdit.dataCadastro);
    setMatricula(alunoToEdit.matricula);
    setInativo(alunoToEdit.inativo);
    setEditingAluno(alunoToEdit);  // Marcar como em edição
    setCanCreate(false);  // Desabilitar criar enquanto edita
  };

  // Função para salvar a edição
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/alunos/${editingAluno.id}`, {
        nome,
        email,
        dataCadastro,
        matricula,
        inativo
      });
      console.log(response.data);  // Sucesso no backend
      fetchAlunos();  // Atualizar lista de alunos
      clearFields();  // Limpar os campos
      setEditingAluno(null);  // Finalizar a edição
      setCanCreate(true);  // Habilitar o botão de criar
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
    navigate('/consultas/ConsultaAlunos');
  };

  // Função para limpar os campos do formulário
  const clearFields = () => {
    setNome('');
    setEmail('');
    setDataCadastro('');
    setMatricula('');
    setInativo(false);
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
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />
        <div>
          <label>
            Inativo:
            <input
              type="checkbox"
              checked={inativo}
              onChange={(e) => setInativo(e.target.checked)}
            />
          </label>
        </div>

        {/* Botões */}
        {editingAluno ? (
          <button onClick={handleSaveEdit}>Salvar Edição</button>
        ) : (
          <button onClick={handleCreateNewAluno} disabled={!canCreate}>Cadastrar</button>
        )}
      </div>

      {/* Tabela de alunos */}
      <div>
        <h2>Lista de Alunos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Data de Cadastro</th>
              <th>Matrícula</th>
              <th>Inativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map(aluno => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.dataCadastro}</td>
                <td>{aluno.matricula}</td>
                <td>{aluno.inativo ? 'Sim' : 'Não'}</td>
                <td>
                  <button onClick={() => handleEditAluno(aluno.id)}>Editar</button>
                  <button onClick={() => handleDeleteAluno(aluno.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botão para consultar alunos */}
      <div>
        <button onClick={handleConsultAlunos}>Consultar Alunos</button>
      </div>
    </div>
  );
};

export default CadastroAlunos;
