import React, { useState, useEffect } from 'react';
import '../../visualPage/CadastroDisciplinas.css'; // Importe o arquivo CSS

const CadastroDisciplinas = () => {
  const [disciplinaAtual, setDisciplinaAtual] = useState({ id: null, nome: '', cargaHoraria: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [novoCadastro, setNovoCadastro] = useState(false);

  // Carregar a primeira disciplina do backend ao inicializar o componente
  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await fetch('/api/disciplinas');
        if (!response.ok) throw new Error('Erro ao carregar disciplinas.');
        const data = await response.json();
        setDisciplinaAtual(data[0] || {});
      } catch (error) {
        alert(error.message);
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
    try {
      const response = await fetch(`/api/disciplinas/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir disciplina.');
      alert('Disciplina excluída com sucesso!'); // Mensagem de confirmação
      setDisciplinaAtual({ id: null, nome: '', cargaHoraria: '' });
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle salvar disciplina (edição ou novo)
  const handleSalvar = async () => {
    try {
      if (novoCadastro) {
        const response = await fetch('/api/disciplinas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(disciplinaAtual),
        });
        if (!response.ok) throw new Error('Erro ao salvar disciplina.');
        const data = await response.json();
        alert('Disciplina salva com sucesso!'); // Mensagem de confirmação
      } else {
        const response = await fetch(`/api/disciplinas/${disciplinaAtual.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(disciplinaAtual),
        });
        if (!response.ok) throw new Error('Erro ao atualizar disciplina.');
        alert('Disciplina atualizada com sucesso!'); // Mensagem de confirmação
      }
      setIsEditing(false);
      setNovoCadastro(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle cancelar edição/novo cadastro
  const handleCancelar = () => {
    setDisciplinaAtual({ id: null, nome: '', cargaHoraria: '' });
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
    </div>
  );
};

export default CadastroDisciplinas;
