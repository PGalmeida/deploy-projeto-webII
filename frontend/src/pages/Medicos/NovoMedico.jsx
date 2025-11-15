import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NovaMedico = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [crmv, setCrmv] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const validarCRMV = (valor) => {
    const limpo = valor.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    if (limpo.length <= 7) setCrmv(limpo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/medicos");
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Cadastrar Médico / Veterinário</h2>

      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="mb-3">
          <label className="form-label">Nome do Médico</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">CRMV</label>
          <input
            type="text"
            className="form-control"
            value={crmv}
            onChange={(e) => validarCRMV(e.target.value)}
            placeholder="Ex: SP12345"
            required
          />
          {crmv && crmv.length < 7 && (
            <span style={{ color: "red", fontSize: "0.9rem" }}>
              Formato inválido. Exemplo: SP12345
            </span>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Especialidade</label>
          <select
            className="form-select"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            <option value="Clínica Geral">Clínica Geral</option>
            <option value="Cirurgia">Cirurgia</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Odontologia">Odontologia</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Anestesiologia">Anestesiologia</option>
            <option value="Oftalmologia">Oftalmologia</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100 mt-3" type="submit">
          Salvar Médico
        </button>
      </form>
    </div>
  );
};

export default NovaMedico;
