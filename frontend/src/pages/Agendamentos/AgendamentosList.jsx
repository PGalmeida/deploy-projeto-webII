import React from "react";
import { Link } from "react-router-dom";

const AgendamentosList = () => {
  const agendamentos = [];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Agendamentos</h2>
        <Link to="/agendamentos/novo" className="btn" style={{ backgroundColor: "#3CB3AB", color: "#fff" }}>
          Novo Agendamento
        </Link>
      </div>

      <div className="card p-4 shadow">
        {agendamentos.length === 0 ? (
          <p className="text-center">Nenhum agendamento cadastrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Médico</th>
                <th>Animal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {agendamentos.map((a, index) => (
                <tr key={index}>
                  <td>{a.data}</td>
                  <td>{a.hora}</td>
                  <td>{a.medico}</td>
                  <td>{a.animal}</td>
                  <td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AgendamentosList;
