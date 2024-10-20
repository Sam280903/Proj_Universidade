// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Não precisa mais importar o Router
import Sidebar from './components/Sidebar';

// Telas de cadastro
import CadastroAlunos from './telas/cadastros/CadastroAlunos';
import CadastroDisciplinas from './telas/cadastros/CadastroDisciplinas';
import CadastroProfessores from './telas/cadastros/CadastroProfessores';
import CadastroSalas from './telas/cadastros/CadastroSalas';
import CadastroTurmas from './telas/cadastros/CadastroTurmas';

// Telas de consulta
import ConsultaAlunos from './telas/consultas/ConsultaAlunos';
import ConsultaDisciplinas from './telas/consultas/ConsultaDisciplinas';
import ConsultaProfessores from './telas/consultas/ConsultaProfessores';
import ConsultaSalas from './telas/consultas/ConsultaSalas';
import ConsultaTurmas from './telas/consultas/ConsultaTurmas';

import Home from './telas/Home'; // Página inicial

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <Routes>
          {/* Rotas de cadastro */}
          <Route path="/cadastros/CadastroAlunos" element={<CadastroAlunos />} />
          <Route path="/cadastros/CadastroDisciplinas" element={<CadastroDisciplinas />} />
          <Route path="/cadastros/CadastroProfessores" element={<CadastroProfessores />} />
          <Route path="/cadastros/CadastroSalas" element={<CadastroSalas />} />
          <Route path="/cadastros/CadastroTurmas" element={<CadastroTurmas />} />

          {/* Rotas de consulta */}
          <Route path="/consultas/ConsultaAlunos" element={<ConsultaAlunos />} />
          <Route path="/consultas/ConsultaDisciplinas" element={<ConsultaDisciplinas />} />
          <Route path="/consultas/ConsultaProfessores" element={<ConsultaProfessores />} />
          <Route path="/consultas/ConsultaSalas" element={<ConsultaSalas />} />
          <Route path="/consultas/ConsultaTurmas" element={<ConsultaTurmas />} />

          {/* Página inicial */}
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
