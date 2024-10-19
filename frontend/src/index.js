// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Arquivo de estilo global (opcional, mas recomendado)
import App from './App'; // Importando o componente App
import { BrowserRouter as Router } from 'react-router-dom'; // Para usar o Router

// Inicializando a aplicação e renderizando o componente App dentro do 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  </Router>
);
