import React from 'react';
import '../visualPage/Home.css';  // Importa o arquivo de CSS
import Fundo_Pag from '../assets/Fundo_Pag.png'; // Importa a logo da pasta assets

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bem-vindo à Home Page</h1>
      <p className="home-description">
        Esta é a página inicial do nosso sistema. Aqui você pode navegar para outras seções
        utilizando o menu lateral.
      </p>
      
      {/* Logo da pasta assets */}
      <div className="home-logo">
        <img src={Fundo_Pag} alt="Logo da Página" />
      </div>
    </div>
  );
}

export default Home;
