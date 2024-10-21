import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importando Axios para fazer as requisições HTTP
import { useNavigate } from 'react-router-dom'; // Importando para navegação
import '../../visualPage/CadastroSalas.css'; // Importando o arquivo CSS

const CadastroSalas = () => {
  const navigate = useNavigate();
  
  // Estados para controlar os dados da sala
  const [numeroSala, setNumeroSala] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [salas, setSalas] = useState([]);
  const [dataCadastro, setDataCadastro] = useState('');
  
  // Estados de habilitação dos botões
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);
  const [canCreate, setCanCreate] = useState(true);

  // Função para carregar as salas cadastradas
  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/salas');
      setSalas(response.data);
    } catch (err) {
      console.error('Erro ao consultar salas:', err);
    }
  };

  // Função para criar nova sala
  const handleCreateNewSala = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/salas', {
        numeroSala,
        capacidade,
        dataCadastro
      });
      console.log(response.data);
      fetchSalas();  // Atualiza a lista de salas
      setNumeroSala('');
      setCapacidade('');
      setDataCadastro('');
    } catch (err) {
      console.error('Erro ao criar sala:', err);
    }
  };

  // Função para editar sala
  const handleEditSala = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/salas/${id}`, {
        numeroSala,
        capacidade,
        dataCadastro
      });
      console.log(response.data);
      fetchSalas();  // Atualiza a lista de salas
    } catch (err) {
      console.error('Erro ao editar sala:', err);
    }
  };

  // Função para excluir sala
  const handleDeleteSala = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/salas/${id}`);
      console.log(response.data);
      fetchSalas();  // Atualiza a lista de salas
    } catch (err) {
      console.error('Erro ao excluir sala:', err);
    }
  };

  // Função para navegar para a consulta de salas
  const handleConsultSalas = () => {
    navigate('/consulta/salas');
  };

  return (
    <div className="container-cadastro-salas">
      <h2>Cadastro de Sala</h2>

      {/* Formulário de cadastro */}
      <div>
        <input
          type="text"
          placeholder="Número da Sala"
          value={numeroSala}
          onChange={(e) => setNumeroSala(e.target.value)}
        />
        <input
          type="number"
          placeholder="Capacidade"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data de Cadastro"
          value={dataCadastro}
          onChange={(e) => setDataCadastro(e.target.value)}
        />

        <button onClick={handleCreateNewSala} disabled={!canCreate}>Cadastrar</button>
      </div>

      {/* Lista de salas */}
      <div>
        <h3>Salas Cadastradas</h3>
        <ul>
          {salas.map(sala => (
            <li key={sala.id}>
              Sala {sala.numeroSala} - Capacidade: {sala.capacidade}
              <button onClick={() => handleEditSala(sala.id)} disabled={!canEdit}>Editar</button>
              <button onClick={() => handleDeleteSala(sala.id)} disabled={!canDelete}>Excluir</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Botões de navegação */}
      <div>
        <button onClick={handleConsultSalas} disabled={!canConsult}>Consultar Salas</button>
      </div>
    </div>
  );
};

export default CadastroSalas;
