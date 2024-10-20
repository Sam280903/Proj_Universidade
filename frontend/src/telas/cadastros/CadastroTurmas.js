import React from 'react';
import { useNavigate } from 'react-router-dom';  // Alteração aqui
import '../../visualPage/CadastroTurmas.css';  // Importa o arquivo de CSS

function EmConstrucao() {
  const navigate = useNavigate(); // Alteração aqui

  const handleBack = () => {
    navigate('/'); // Usando navigate para redirecionar
  };

  return (
    <div className="construction-container">
      <h1 className="construction-title">🚧 EM CONSTRUÇÃO 🚧</h1>
      <p className="construction-description">
        A página de Turma ainda está em desenvolvimento. Volte mais tarde!
      </p>
      <button className="back-button" onClick={handleBack}>
        OK
      </button>
    </div>
  );
}

export default EmConstrucao;
