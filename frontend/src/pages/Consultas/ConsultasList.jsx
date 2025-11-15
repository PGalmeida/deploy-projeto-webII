import React from "react";
import { Link } from "react-router-dom";
import "./Consultas.css";

function ConsultasList() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Consultas</h1>
        <Link to="/consultas/nova" className="btn-new">
          + Nova Consulta
        </Link>
      </div>

      <div className="list-container">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Horário</th>
              <th>Veterinário</th>
              <th>Animal</th>
              <th>Motivo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10/12/2024</td>
              <td>14:00</td>
              <td>Dr. João</td>
              <td>Rex</td>
              <td>Vômito</td>
              <td>
                <button className="btn-details">Detalhes</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultasList;
