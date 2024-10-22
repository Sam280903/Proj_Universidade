import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CadastroAlunos = () => {
  const navigate = useNavigate();

  // Estado para controlar os dados do aluno
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [inativo, setInativo] = useState(false); // checkbox de inativo
  const [cpfCNPJ, setCpfCNPJ] = useState(''); // Novo campo cpfCNPJ
  const [alunos, setAlunos] = useState([]);
  const [editingAluno, setEditingAluno] = useState(null);  // Estado para armazenar o aluno que está sendo editado

  // Estados para controlar habilitação de botões
  const [canCreate, setCanCreate] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);

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
        inativo,
        cpfCNPJ // Adicionando cpfCNPJ
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
    const alunoToEdit = alunos.find(aluno => aluno.idAluno === id); // Alterado para idAluno
    setNome(alunoToEdit.nome);
    setEmail(alunoToEdit.email);
    setDataCadastro(alunoToEdit.dataCadastro);
    setCpfCNPJ(alunoToEdit.cpfCNPJ); // Adicionado
    setInativo(alunoToEdit.inativo);
    setEditingAluno(alunoToEdit);  // Marcar como em edição
    setCanCreate(false);  // Desabilitar criar enquanto edita
    setCanEdit(true);
    setCanDelete(true);
  };

  // Função para salvar a edição
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/alunos/${editingAluno.idAluno}`, { // Alterado para idAluno
        nome,
        email,
        dataCadastro,
        inativo,
        cpfCNPJ // Adicionado
      });
      console.log(response.data);  // Sucesso no backend
      fetchAlunos();  // Atualizar lista de alunos
      clearFields();  // Limpar os campos
      setEditingAluno(null);  // Finalizar a edição
      setCanCreate(true);  // Habilitar o botão de criar
      setCanEdit(false);
      setCanDelete(false);
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
      clearFields();
    } catch (err) {
      console.error('Erro ao excluir aluno:', err);
    }
  };

  // Função para consultar alunos
  const handleConsultAlunos = () => {
    navigate('/consultas/ConsultaAlunos');
  };

  // Função para limpar os campos do formulário
  const clearFields = () => {
    setNome('');
    setEmail('');
    setDataCadastro('');
    setCpfCNPJ(''); // Limpar cpfCNPJ
    setInativo(false);
    setEditingAluno(null); // Limpar o aluno em edição
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <div>
      <h1>{editingAluno ? 'Editar Aluno' : 'Cadastro de Alunos'}</h1>

      {/* Formulário de cadastro ou edição */}
      <div>
        <div>
          <input
            type="text"
            placeholder="Nome do Aluno"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Data de Cadastro"
            value={dataCadastro}
            onChange={(e) => setDataCadastro(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="CPF ou CNPJ"
            value={cpfCNPJ} // Novo campo cpfCNPJ
            onChange={(e) => setCpfCNPJ(e.target.value)} // Novo campo cpfCNPJ
          />
        </div>
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
        <div className="buttons">
          <button onClick={handleCreateNewAluno} disabled={!canCreate}>Novo</button>
          <button onClick={handleSaveEdit} disabled={!canEdit}>Editar</button>
          <button onClick={() => handleDeleteAluno(editingAluno?.idAluno)} disabled={!canDelete}>Excluir</button>
          <button onClick={handleConsultAlunos} disabled={!canConsult}>Consultar</button>
        </div>
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
              <th>CPF/CNPJ</th> {/* Alterado para CPF/CNPJ */}
              <th>Inativo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map(aluno => (
              <tr key={aluno.idAluno}> {/* Alterado para idAluno */}
                <td>{aluno.idAluno}</td> {/* Alterado para idAluno */}
                <td>{aluno.nome}</td>
                <td>{aluno.email}</td>
                <td>{aluno.dataCadastro}</td>
                <td>{aluno.cpfCNPJ}</td> {/* Adicionado */}
                <td>{aluno.inativo ? 'Sim' : 'Não'}</td>
                <td>
                  <button onClick={() => handleEditAluno(aluno.idAluno)}>Editar</button>
                  <button onClick={() => handleDeleteAluno(aluno.idAluno)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CadastroAlunos;
