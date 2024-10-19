import React, { useState } from 'react';
import '../../visualPage/CadastroProfessores.css'; // Importe o arquivo CSS

// Mock de dados iniciais (simulando um banco de dados)
const mockProfessores = [
  { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', dataCadastro: '2024-01-01' },
];

const CadastroProfessores = () => {
  const [professores, setProfessores] = useState(mockProfessores);
  const [professorAtual, setProfessorAtual] = useState({ id: null, nome: '', email: '', dataCadastro: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [novoCadastro, setNovoCadastro] = useState(false);

  // Handle novo cadastro
  const handleNovo = () => {
    setProfessorAtual({ id: null, nome: '', email: '', dataCadastro: new Date().toISOString().split('T')[0] });
    setIsEditing(true);
    setNovoCadastro(true);
  };

  // Handle edição de professor
  const handleEdit = (professor) => {
    setProfessorAtual(professor);
    setIsEditing(true);
    setNovoCadastro(false);
  };

  // Handle exclusão de professor
  const handleExcluir = (id) => {
    setProfessores(professores.filter(professor => professor.id !== id));
    setProfessorAtual(professores[0] || {});
    setIsEditing(false);
  };

  // Handle salvar professor (edição ou novo)
  const handleSalvar = async () => {
    try {
      let response;
      if (novoCadastro) {
        // Para salvar novo professor (simulação)
        response = await fetch('/api/professores', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(professorAtual),
        });
        if (response.ok) {
          const novoProfessor = { ...professorAtual, id: professores.length + 1 };
          setProfessores([...professores, novoProfessor]);
        }
      } else {
        // Para atualizar professor existente
        response = await fetch(`/api/professores/${professorAtual.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(professorAtual),
        });
        if (response.ok) {
          setProfessores(professores.map(professor => (professor.id === professorAtual.id ? professorAtual : professor)));
        }
      }
      setIsEditing(false);
      setNovoCadastro(false);
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  // Handle cancelar edição/novo cadastro
  const handleCancelar = () => {
    setProfessorAtual(professores[0] || {});
    setIsEditing(false);
    setNovoCadastro(false);
  };

  // Handle mudança nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessorAtual(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-cadastro-professores">
      <h2>{novoCadastro ? 'Novo Professor' : 'Cadastro de Professor'}</h2>
      <form>
        <div>
          <label>ID:</label>
          <input type="text" value={professorAtual.id || ''} disabled />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={professorAtual.nome}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={professorAtual.email}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label>Data de Cadastro:</label>
          <input
            type="date"
            name="dataCadastro"
            value={professorAtual.dataCadastro}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="buttons">
          {isEditing ? (
            <>
              <button type="button" onClick={handleSalvar}>Salvar</button>
              <button type="button" onClick={handleCancelar}>Cancelar</button>
            </>
          ) : (
            <>
              <button type="button" onClick={handleNovo}>Novo</button>
              <button type="button" onClick={() => handleEdit(professorAtual)}>Editar</button>
              <button type="button" onClick={() => handleExcluir(professorAtual.id)}>Excluir</button>
            </>
          )}
        </div>
      </form>

      <div className="lista-professores">
        <h3>Professores Cadastrados:</h3>
        <ul>
          {professores.map(professor => (
            <li key={professor.id} onClick={() => setProfessorAtual(professor)}>
              {professor.nome} - {professor.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastroProfessores;
