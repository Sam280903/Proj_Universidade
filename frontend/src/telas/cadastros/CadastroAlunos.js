import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CadastroAlunos = () => {
  const navigate = useNavigate();

  // Estado para controlar a habilitação dos botões
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [canConsult, setCanConsult] = useState(true);  // Exemplo: consulta sempre habilitada
  const [canCreate, setCanCreate] = useState(true);  // Exemplo: criação sempre habilitada
  
  useEffect(() => {
    // Lógica para verificar se o aluno tem movimentação fora da tabela
    const hasMovements = checkMovementsInOtherTables();
    if (hasMovements) {
      setCanEdit(false);
      setCanDelete(false);
    } else {
      setCanEdit(true);
      setCanDelete(true);
    }
  }, []);

  const checkMovementsInOtherTables = () => {
    // Aqui você implementaria a lógica de verificação de movimentação nas outras tabelas
    // Exemplo: Verificar se o aluno está associado a outras turmas, etc.
    // Retorne `true` se houver movimentações e `false` caso contrário.
    return false;  // Simulação de sem movimentação
  };

  const handleConsultAlunos = () => {
    navigate('/consulta/alunos');
  };

  const handleCreateNewAluno = () => {
    // Lógica para criação de novo aluno
  };

  const handleEditAluno = () => {
    // Lógica para edição de aluno
  };

  const handleDeleteAluno = () => {
    // Lógica para exclusão de aluno
  };

  return (
    <div>
      <h1>Cadastro de Alunos</h1>
      {/* Formulário de cadastro aqui */}

      <div>
        {/* Botão Novo */}
        <button onClick={handleCreateNewAluno} disabled={!canCreate}>Novo</button>

        {/* Botão Editar */}
        <button onClick={handleEditAluno} disabled={!canEdit}>Editar</button>

        {/* Botão Excluir */}
        <button onClick={handleDeleteAluno} disabled={!canDelete}>Excluir</button>

        {/* Botão Consultar */}
        <button onClick={handleConsultAlunos} disabled={!canConsult}>Consultar</button>
      </div>
    </div>
  );
};

export default CadastroAlunos;
