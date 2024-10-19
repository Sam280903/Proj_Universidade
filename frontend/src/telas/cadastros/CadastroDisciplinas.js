import React, { useState, useEffect } from 'react';
import '../../visualPage/CadastroDisciplinas.css'; // Importe o arquivo CSS

const CadastroDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinaAtual, setDisciplinaAtual] = useState({ id: null, nome: '', cargaHoraria: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [novoCadastro, setNovoCadastro] = useState(false);

  // Carregar as disciplinas do backend ao inicializar o componente
  useEffect(() => {
    const fetchDisciplinas = async () => {
      const response = await fetch('/api/disciplinas');
      if (response.ok) {
        const data = await response.json();
        setDisciplinas(data);
        setDisciplinaAtual(data[0] || {}); // Set the first disciplina if available
      } else {
        alert('Erro ao carregar disciplinas.');
      }
    };

    fetchDisciplinas();
  }, []);

  // Handle novo cadastro
  const handleNovo = () => {
    setDisciplinaAtual({ id: null, nome: '', cargaHoraria: '' });
    setIsEditing(true);
    setNovoCadastro(true);
  };

  // Handle edição de disciplina
  const handleEdit = (disciplina) => {
    setDisciplinaAtual(disciplina);
    setIsEditing(true);
    setNovoCadastro(false);
  };

  // Handle exclusão de disciplina
  const handleExcluir = async (id) => {
    const response = await fetch(`/api/disciplinas/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDisciplinas(disciplinas.filter(disciplina => disciplina.id !== id));
      setDisciplinaAtual(disciplinas[0] || {});
      setIsEditing(false);
    } else {
      alert('Erro ao excluir disciplina.');
    }
  };

  // Handle salvar disciplina (edição ou novo)
  const handleSalvar = async () => {
    if (novoCadastro) {
      // Enviar os dados para o backend (novo cadastro)
      const novaDisciplina = { ...disciplinaAtual, id: disciplinas.length + 1 }; // ID gerado no frontend, mas será ajustado no backend
      const response = await fetch('/api/disciplinas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaDisciplina),
      });

      if (response.ok) {
        const data = await response.json();
        setDisciplinas([...disciplinas, data]); // Atualiza a lista com o novo dado
      } else {
        alert('Erro ao salvar disciplina.');
      }
    } else {
      // Atualizar disciplina existente
      const response = await fetch(`/api/disciplinas/${disciplinaAtual.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(disciplinaAtual),
      });

      if (response.ok) {
        const data = await response.json();
        setDisciplinas(disciplinas.map(disciplina => (disciplina.id === disciplinaAtual.id ? data : disciplina)));
      } else {
        alert('Erro ao atualizar disciplina.');
      }
    }
    setIsEditing(false);
    setNovoCadastro(false);
  };

  // Handle cancelar edição/novo cadastro
  const handleCancelar = () => {
    setDisciplinaAtual(disciplinas[0] || {});
    setIsEditing(false);
    setNovoCadastro(false);
  };

  // Handle mudança nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplinaAtual(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-cadastro-disciplinas">
      <h2>{novoCadastro ? 'Nova Disciplina' : 'Cadastro de Disciplina'}</h2>
      <form>
        <div>
          <label>ID:</label>
          <input type="text" value={disciplinaAtual.id || ''} disabled />
        </div>
        <div>
          <label>Nome da Disciplina:</label>
          <input
            type="text"
            name="nome"
            value={disciplinaAtual.nome}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label>Carga Horária (em horas):</label>
          <input
            type="number"
            name="cargaHoraria"
            value={disciplinaAtual.cargaHoraria}
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
              <button type="button" onClick={() => handleEdit(disciplinaAtual)}>Editar</button>
              <button type="button" onClick={() => handleExcluir(disciplinaAtual.id)}>Excluir</button>
            </>
          )}
        </div>
      </form>

      <div className="lista-disciplinas">
        <h3>Disciplinas Cadastradas:</h3>
        <ul>
          {disciplinas.map(disciplina => (
            <li key={disciplina.id} onClick={() => setDisciplinaAtual(disciplina)}>
              {disciplina.nome} - {disciplina.cargaHoraria}h
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastroDisciplinas;
