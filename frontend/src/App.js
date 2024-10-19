import React from 'react'; 
import { Route, Routes } from 'react-router-dom';
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
          <Route path="/cadastro/alunos" element={<CadastroAlunos />} />
          <Route path="/cadastro/disciplinas" element={<CadastroDisciplinas />} />
          <Route path="/cadastro/professores" element={<CadastroProfessores />} />
          <Route path="/cadastro/salas" element={<CadastroSalas />} />
          <Route path="/cadastro/turmas" element={<CadastroTurmas />} />

          {/* Rotas de consulta */}
          <Route path="/consulta/alunos" element={<ConsultaAlunos />} />
          <Route path="/consulta/disciplinas" element={<ConsultaDisciplinas />} />
          <Route path="/consulta/professores" element={<ConsultaProfessores />} />
          <Route path="/consulta/salas" element={<ConsultaSalas />} />
          <Route path="/consulta/turmas" element={<ConsultaTurmas />} />

          {/* Página inicial */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
