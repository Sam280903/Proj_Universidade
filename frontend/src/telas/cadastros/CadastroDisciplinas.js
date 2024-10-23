import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicionado para redirecionamento
import '../../visualPage/CadastroDisciplinas.css'; // Importe o arquivo CSS

const CadastroDisciplinas = () => {
  const navigate = useNavigate(); // Inicializar o hook de navegação
  const [disciplinaAtual, setDisciplinaAtual] = useState({ id: null, nome: '', cargaHoraria: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [novoCadastro, setNovoCadastro] = useState(false);

  // Controle de botões (semelhante ao Cadastro de Professores)
  const [canCreate, setCanCreate] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true); // Novo estado para Consultar

  // Carregar a primeira disciplina do backend ao inicializar o componente
  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const response = await fetch('/api/disciplinas');
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('text/html')) {
            throw new Error('Resposta inesperada do servidor. Verifique o caminho da API.');
          }
          throw new Error('Erro ao carregar disciplinas.');
        }
        const data = await response.json();
        setDisciplinaAtual(data[0] || {});
        if (data[0]) {
          setCanEdit(true);
          setCanDelete(true);
        }
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
    setCanCreate(false);
    setCanEdit(false);
    setCanDelete(false);
  };

  // Handle edição de disciplina
  const handleEdit = () => {
    setIsEditing(true);
    setNovoCadastro(false);
  };

  // Handle exclusão de disciplina
  const handleExcluir = async (id) => {
    if (!id) {
      alert('ID inválido para exclusão.');
      return;
    }
    
    try {
      const response = await fetch(`/api/disciplinas/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir disciplina.');
      alert('Disciplina excluída com sucesso!');
      setDisciplinaAtual({ id: null, nome: '', cargaHoraria: '' });
      setCanEdit(false);
      setCanDelete(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle salvar disciplina
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
        alert('Disciplina salva com sucesso!');
        setDisciplinaAtual(data);
        setCanEdit(true);
        setCanDelete(true);
      } else {
        const response = await fetch(`/api/disciplinas/${disciplinaAtual.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(disciplinaAtual),
        });
        if (!response.ok) throw new Error('Erro ao atualizar disciplina.');
        alert('Disciplina atualizada com sucesso!');
      }
      setIsEditing(false);
      setNovoCadastro(false);
      setCanCreate(true);
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle cancelar edição/novo cadastro
  const handleCancelar = () => {
    setDisciplinaAtual({ id: null, nome: '', cargaHoraria: '' });
    setIsEditing(false);
    setNovoCadastro(false);
    setCanCreate(true);
    setCanEdit(false);
    setCanDelete(false);
  };

  // Handle mudança nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisciplinaAtual(prev => ({ ...prev, [name]: value }));
  };

  // Função para consultar disciplinas (redirecionamento)
  const handleConsultDisciplinas = () => {
    navigate('/consultas/ConsultaDisciplinas'); // Redireciona para a página de consulta
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
              <button type="button" onClick={handleNovo} disabled={!canCreate}>Novo</button>
              <button type="button" onClick={handleEdit} disabled={!canEdit}>Editar</button>
              <button type="button" onClick={() => handleExcluir(disciplinaAtual.id)} disabled={!canDelete}>Excluir</button>
              <button type="button" onClick={handleConsultDisciplinas} disabled={!canConsult}>Consultar</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default CadastroDisciplinas;
