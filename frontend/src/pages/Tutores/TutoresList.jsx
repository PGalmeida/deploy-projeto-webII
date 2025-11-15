import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Tutores.css";

function TutoresList() {
  const [tutores] = useState([
    { id: 1, nome: "Carlos Silva", telefone: "(11) 99999-9999", email: "carlos@email.com" },
    { id: 2, nome: "Ana Souza", telefone: "(21) 98888-8888", email: "ana@email.com" }
  ]);

  return (
    <div className="tutores-container">
      <div className="tutores-header">
        <h1>Tutores</h1>
        <Link to="/tutores/novo" className="btn-add">+ Novo Tutor</Link>
      </div>

      <table className="tutores-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {tutores.map((tutor) => (
            <tr key={tutor.id}>
              <td>{tutor.nome}</td>
              <td>{tutor.telefone}</td>
              <td>{tutor.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default TutoresList;
