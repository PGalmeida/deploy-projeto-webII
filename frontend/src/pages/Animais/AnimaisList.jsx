import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AnimaisList.css";

function AnimaisList() {
  const [animais] = useState([
    { id: 1, nome: "Rex", especie: "Cachorro", raca: "Labrador", idade: 5, sexo: "Macho" },
    { id: 2, nome: "Mimi", especie: "Gato", raca: "Siamês", idade: 2, sexo: "Fêmea" }
  ]);

  return (
    <div className="animais-container">
      <div className="animais-header">
        <h1>Animais</h1>
        <Link to="/animais/novo" className="btn-add">+ Novo Animal</Link>
      </div>

      <table className="animais-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Raça</th>
            <th>Idade</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {animais.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.nome}</td>
              <td>{animal.especie}</td>
              <td>{animal.raca}</td>
              <td>{animal.idade}</td>
              <td>{animal.sexo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnimaisList;
