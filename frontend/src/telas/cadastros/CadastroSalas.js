import React, { useState } from 'react';
import '../../visualPage/CadastroSalas.css'; // Importe o arquivo CSS

// Mock de dados iniciais (simulando um banco de dados)
const mockSalas = [
  { id: 1, numeroSala: '101', capacidade: 30, dataCadastro: '2024-01-01' },
];

const CadastroSalas = () => {
  const [salas, setSalas] = useState(mockSalas);
  const [salaAtual, setSalaAtual] = useState({ id: null, numeroSala: '', capacidade: '', dataCadastro: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [novoCadastro, setNovoCadastro] = useState(false);

  // Handle novo cadastro
  const handleNovo = () => {
    setSalaAtual({ id: null, numeroSala: '', capacidade: '', dataCadastro: new Date().toISOString().split('T')[0] });
    setIsEditing(true);
    setNovoCadastro(true);
  };

  // Handle edição de sala
  const handleEdit = (sala) => {
    setSalaAtual(sala);
    setIsEditing(true);
    setNovoCadastro(false);
  };

  // Handle exclusão de sala
  const handleExcluir = (id) => {
    setSalas(salas.filter(sala => sala.id !== id));
    setSalaAtual(salas[0] || {});
    setIsEditing(false);
  };

  // Handle salvar sala (edição ou novo)
  const handleSalvar = async () => {
    try {
      let response;
      if (novoCadastro) {
        // Para salvar nova sala (simulação)
        response = await fetch('/api/salas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(salaAtual),
        });
        if (response.ok) {
          const novaSala = { ...salaAtual, id: salas.length + 1 };
          setSalas([...salas, novaSala]);
        }
      } else {
        // Para atualizar sala existente
        response = await fetch(`/api/salas/${salaAtual.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(salaAtual),
        });
        if (response.ok) {
          setSalas(salas.map(sala => (sala.id === salaAtual.id ? salaAtual : sala)));
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
    setSalaAtual(salas[0] || {});
    setIsEditing(false);
    setNovoCadastro(false);
  };

  // Handle mudança nos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalaAtual(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-cadastro-salas">
      <h2>{novoCadastro ? 'Nova Sala' : 'Cadastro de Sala'}</h2>
      <form>
        <div>
          <label>ID:</label>
          <input type="text" value={salaAtual.id || ''} disabled />
        </div>
        <div>
          <label>Número da Sala:</label>
          <input
            type="text"
            name="numeroSala"
            value={salaAtual.numeroSala}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label>Capacidade:</label>
          <input
            type="number"
            name="capacidade"
            value={salaAtual.capacidade}
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
            value={salaAtual.dataCadastro}
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
              <button type="button" onClick={() => handleEdit(salaAtual)}>Editar</button>
              <button type="button" onClick={() => handleExcluir(salaAtual.id)}>Excluir</button>
            </>
          )}
        </div>
      </form>

      <div className="lista-salas">
        <h3>Salas Cadastradas:</h3>
        <ul>
          {salas.map(sala => (
            <li key={sala.id} onClick={() => setSalaAtual(sala)}>
              Sala {sala.numeroSala} - Capacidade: {sala.capacidade}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CadastroSalas;
