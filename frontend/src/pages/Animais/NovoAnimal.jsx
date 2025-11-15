import React, { useState } from "react";

const NovoAnimal = () => {
  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    raca: "",
    idade: "",
    sexo: "",
  });

  const especies = [
    "Cachorro",
    "Gato",
    "Pássaro",
    "Coelho",
    "Hamster",
    "Tartaruga",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4 fw-bold" style={{ color: "#3CB3AB" }}>
        Cadastrar Novo Animal
      </h2>

      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome do Animal</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Digite o nome do animal"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Espécie</label>
            <select
              className="form-select"
              name="especie"
              value={formData.especie}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {especies.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Raça</label>
            <input
              type="text"
              className="form-control"
              name="raca"
              value={formData.raca}
              onChange={handleChange}
              placeholder="Digite a raça"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Idade</label>
            <input
              type="number"
              className="form-control"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              placeholder="Idade em anos"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sexo</label>
            <select
              className="form-select"
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Macho">Macho</option>
              <option value="Fêmea">Fêmea</option>
            </select>
          </div>

          <button
            className="btn w-100 mt-3"
            type="submit"
            style={{ backgroundColor: "#3CB3AB", color: "white" }}
          >
            Salvar Animal
          </button>
        </form>
      </div>
    </div>
  );
};

export default NovoAnimal;
