// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../visualPage/Sidebar.css'; // Verifique se o caminho está correto

function Sidebar() {
  return (
    <div style={{ width: '250px', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <ul>
        <li>
          <Link to="./telas/cadastro/CadastroAlunos">Alunos</Link>
        </li>
        <li>
          <Link to="/disciplinas">Disciplinas</Link>
        </li>
        <li>
          <Link to="/professores">Professores</Link>
        </li>
        <li>
          <Link to="/salas">Salas</Link>
        </li>
        <li>
          <Link to="/turmas">Turmas</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
