import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px' }}>
      <ul>
        <li><Link to="/cadastros/CadastroAlunos">Alunos</Link></li>
        <li><Link to="/cadastros/CadastroDisciplinas">Disciplinas</Link></li>
        <li><Link to="/cadastros/CadastroProfessores">Professores</Link></li>
        <li><Link to="/cadastros/CadastroSalas">Salas</Link></li>
        <li><Link to="/cadastros/CadastroTurmas">Turmas</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
