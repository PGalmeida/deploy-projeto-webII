import React, { useState, useEffect } from "react";
import "./Consultas.css";

function NovaConsulta() {
  const [dataAtual, setDataAtual] = useState("");
  const [horaAtual, setHoraAtual] = useState("");

  useEffect(() => {
    const agora = new Date();

    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");

    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    setDataAtual(`${ano}-${mes}-${dia}`);
    setHoraAtual(`${horas}:${minutos}`);
  }, []);

  return (
    <div className="page-container">
      <h1>Cadastrar Nova Consulta</h1>

      <div className="form-container">
        <form>
          <label>Data da Consulta</label>
          <input type="date" value={dataAtual} readOnly />

          <label>Horário da Consulta</label>
          <input type="time" value={horaAtual} readOnly />

          <label>Médico / Veterinário Responsável</label>
          <select required>
            <option value="">Selecione um Veterinário</option>
            <option>Dr. João</option>
            <option>Dra. Alice</option>
            <option>Dr. Marcos</option>
          </select>

          <label>Animal Consultado</label>
          <select required>
            <option value="">Selecione um Animal</option>
            <option>Rex</option>
            <option>Bolinha</option>
            <option>Mel</option>
          </select>

          <label>Motivo da Consulta</label>
          <input type="text" placeholder="Ex.: Dor abdominal" required />

          <label>Sintomas</label>
          <textarea placeholder="Descreva os sintomas..." rows="4" required />

          <button type="submit" className="btn-submit">
            Salvar Consulta
          </button>
        </form>
      </div>
    </div>
  );
}

export default NovaConsulta;
