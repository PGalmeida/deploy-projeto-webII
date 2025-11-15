import React, { useState, useEffect } from "react";

const NovoAgendamento = () => {
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    const agora = new Date();
    const dataAtual = agora.toISOString().split("T")[0];
    const horaAtual = agora.toTimeString().slice(0, 5);
    setData(dataAtual);
    setHora(horaAtual);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Novo Agendamento</h2>

      <div className="card p-4 shadow">
        <form>
          <div className="mb-3">
            <label className="form-label">Data do Agendamento</label>
            <input
              type="date"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Horário do Agendamento</label>
            <input
              type="time"
              className="form-control"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Médico Responsável</label>
            <select className="form-select">
              <option>Selecione um médico</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Animal</label>
            <select className="form-select">
              <option>Selecione um animal</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Tipo de Atendimento</label>
            <select className="form-select">
              <option>Consulta</option>
              <option>Retorno</option>
              <option>Vacinação</option>
              <option>Exames</option>
              <option>Emergência</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Observações / Motivo</label>
            <textarea className="form-control" rows="3"></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#3CB3AB", color: "#fff" }}
          >
            Salvar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoAgendamento;
