import React from "react";
import { Link } from "react-router-dom";
import "./Medicos.css";

function MedicosList() {
  const medicos = [
    {
      id: 1,
      nome: "Dr. João Silva",
      especialidade: "Clínico Geral",
      status: "Ativo"
    },
    {
      id: 2,
      nome: "Dra. Ana Carla",
      especialidade: "Dermatologista",
      status: "Ativo"
    },
    {
      id: 3,
      nome: "Dr. Marcos Lima",
      especialidade: "Ortopedista",
      status: "Inativo"
    }
  ];

  return (
    <div className="page-container">
      <h1>Médicos Cadastrados</h1>

      <div className="top-actions">
        <Link to="/medicos/novo" className="btn-primary">
          Cadastrar Médico
        </Link>
      </div>

      <div className="list-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Especialidade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map((m) => (
              <tr key={m.id}>
                <td>{m.nome}</td>
                <td>{m.especialidade}</td>
                <td className={m.status === "Ativo" ? "status-ativo" : "status-inativo"}>
                  {m.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicosList;
