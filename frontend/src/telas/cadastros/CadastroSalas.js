import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../visualPage/CadastroSalas.css';

const CadastroSalas = () => {
  const navigate = useNavigate();
  const [numeroSala, setNumeroSala] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [isActive, setIsActive] = useState(true); // Estado para controlar se a sala está ativa
  const [salas, setSalas] = useState([]);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canConsult, setCanConsult] = useState(true);
  const [canCreate, setCanCreate] = useState(true);

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

  const handleCreateNewSala = async () => {
    try {
      await axios.post('http://localhost:5000/api/salas', {
        numeroSala,
        capacidade,
        dataCadastro,
        isActive, // Enviar o estado ativo/inativo ao criar uma nova sala
      });
      fetchSalas();
      clearFields();
    } catch (err) {
      console.error('Erro ao criar sala:', err);
    }
  };

  const handleEditSala = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/salas/${id}`, {
        numeroSala,
        capacidade,
        dataCadastro,
        isActive, // Enviar o estado ativo/inativo ao editar
      });
      fetchSalas();
    } catch (err) {
      console.error('Erro ao editar sala:', err);
    }
  };

  const handleDeleteSala = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/salas/${id}`);
      fetchSalas();
    } catch (err) {
      console.error('Erro ao excluir sala:', err);
    }
  };

  const handleConsultSalas = () => {
    navigate('/consultas/ConsultaSalas');
  };

  const clearFields = () => {
    setNumeroSala('');
    setCapacidade('');
    setDataCadastro('');
    setIsActive(true); // Resetar para ativo por padrão após cadastro
  };

  return (
    <div className="container-cadastro-salas">
      <h2>Cadastro de Sala</h2>
      <div className="form-container">
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

        {/* Checkbox para inativar sala */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={!isActive} // Quando marcado, a sala será inativa
              onChange={(e) => setIsActive(!e.target.checked)} // Alterar estado ativo/inativo
            />
            Inativar sala
          </label>
        </div>
      </div>

      {/* Botões para ação */}
      <div className="buttons">
        <button onClick={handleCreateNewSala} disabled={!canCreate}>Novo</button>
        <button onClick={handleEditSala} disabled={!canEdit}>Editar</button>
        <button onClick={handleDeleteSala} disabled={!canDelete}>Excluir</button>
        <button onClick={handleConsultSalas} disabled={!canConsult}>Consultar</button>
      </div>
    </div>
  );
};

export default CadastroSalas;
