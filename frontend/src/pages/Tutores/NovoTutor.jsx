import React, { useState } from "react";
import "./NovoTutor.css";

function NovoTutor() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    email: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function enviar(e) {
    e.preventDefault();
    alert("Cadastro salvo (mock). Depois ligaremos no backend!");
  }

  return (
    <div className="novoTutor-container">
      <h1>Novo Tutor</h1>

      <form className="form-tutor" onSubmit={enviar}>
        <label>Nome do Tutor</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <label>Telefone</label>
        <input
          type="text"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          required
        />

        <label>E-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-salvar">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default NovoTutor;
