import React from "react";

import { FiLogIn } from "react-icons/fi";

import { Link } from "react-router-dom";

import "./styles.css";

import logo from "../../assets/logo.svg";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>
        <main>
          <h1>Pontos de suporte para caminhoneiros</h1>
          <p>
            Ajudamos os caminhoneiros a encontrarem pontos que disponibilizam serviços de descanço e saúde,
          </p>
          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de saúde</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
