import React, { useState, useEffect } from 'react';
import '../../visualPage/CadastroAlunos.css';

const CadastroAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [alunoAtual, setAlunoAtual] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [novoCadastro, setNovoCadastro] = useState(false);

  // Carregar os dados do backend ao inicializar o componente
  useEffect(() => {
    const fetchAlunos = async () => {
      const response = await fetch('/api/alunos');
      if (response.ok) {
        const data = await response.json();
        setAlunos(data);
        setAlunoAtual(data[0] || {});
      } else {
        alert('Erro ao carregar alunos.');
      }
    };

    fetchAlunos();
  }, []);

  // Handle novo aluno
  const handleNovo = () => {
    setAlunoAtual({ id: null, nome: '', matricula: '', email: '', dataCadastro: new Date().toISOString().slice(0, 10), ativo: true });
    setIsEditing(true);
    setNovoCadastro(true);
  };

  // Handle edição de aluno
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Handle exclusão de aluno
  const handleExcluir = async () => {
    if (alunoAtual.turmas.length > 0) {
      alert("Não é possível excluir um aluno vinculado a uma turma.");
      return;
    }

    const response = await fetch(`/api/alunos/${alunoAtual.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setAlunos(alunos.filter(aluno => aluno.id !== alunoAtual.id)); // Remove localmente
      setAlunoAtual(alunos[0] || {});
      setIsEditing(false);
      setNovoCadastro(false);
    } else {
      alert('Erro ao excluir aluno.');
    }
  };

  // Handle inativar aluno
  const handleInativar = async () => {
    const response = await fetch(`/api/alunos/${alunoAtual.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ativo: !alunoAtual.ativo }),
    });

    if (response.ok) {
      setAlunoAtual(prev => ({ ...prev, ativo: !prev.ativo }));
    } else {
      alert('Erro ao alterar status.');
    }
  };

  // Handle salvar aluno (edição ou novo)
  const handleSalvar = async () => {
    if (novoCadastro) {
      // Enviar os dados para o backend
      const novoAluno = { ...alunoAtual, id: alunos.length + 1 };
      const response = await fetch('/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAluno),
      });

      if (response.ok) {
        const data = await response.json();
        setAlunos([...alunos, data]); // Atualiza a lista com o novo aluno
      } else {
        alert('Erro ao salvar aluno.');
      }
    } else {
      const response = await fetch(`/api/alunos/${alunoAtual.id}`, { // Atualiza um aluno existente
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alunoAtual),
      });

      if (response.ok) {
        const data = await response.json();
        setAlunos(alunos.map(aluno => (aluno.id === alunoAtual.id ? data : aluno)));
      } else {
        alert('Erro ao atualizar aluno.');
      }
    }
    setIsEditing(false);
    setNovoCadastro(false);
  };

  // Handle cancelar edição/novo cadastro
  const handleCancelar = () => {
    setAlunoAtual(alunos[0] || {});
    setIsEditing(false);
    setNovoCadastro(false);
  };

  // Handle campos de edição
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoAtual(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="cadastro-container">
      <div className="header">
        <button className="back-button" onClick={() => window.location.href = '/'}>← Voltar</button>
        <h2>{novoCadastro ? 'Novo Cadastro de Aluno' : 'Cadastro de Aluno'}</h2>
      </div>

      <div className="form-container">
        <div>
          <label>ID:</label>
          <input type="text" value={alunoAtual.id || ''} disabled />
        </div>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={alunoAtual.nome} onChange={handleChange} disabled={!isEditing} />
        </div>
        <div>
          <label>Matrícula:</label>
          <input type="text" name="matricula" value={alunoAtual.matricula} onChange={handleChange} disabled={!isEditing} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={alunoAtual.email} onChange={handleChange} disabled={!isEditing} />
        </div>
        <div>
          <label>Data de Cadastro:</label>
          <input type="text" value={alunoAtual.dataCadastro} disabled />
        </div>
      </div>

      <div className="buttons">
        {isEditing ? (
          <>
            {novoCadastro ? (
              <>
                <button onClick={handleSalvar}>Salvar</button>
                <button onClick={handleCancelar}>Cancelar</button>
              </>
            ) : (
              <>
                <button onClick={handleSalvar}>Salvar</button>
                <label>
                  <input type="checkbox" checked={!alunoAtual.ativo} onChange={handleInativar} /> Inativar
                </label>
                <button onClick={handleCancelar}>Cancelar</button>
              </>
            )}
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleExcluir}>Excluir</button>
            <button onClick={handleNovo}>Novo</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CadastroAlunos;
