import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clinicAPI } from "../../api/api.js";
import styles from "./ClinicForm.module.css";

function ClinicForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  const loadData = async () => {
    const res = await clinicAPI.getById(id);
    setForm(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await clinicAPI.update(id, form);
    } else {
      await clinicAPI.create(form);
    }

    navigate("/clinicas");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {id ? "Editar Clínica" : "Cadastrar Clínica"}
      </h1>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nome da clínica"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="text"
            name="address"
            placeholder="Endereço"
            value={form.address}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />

          <button className={styles.btnSubmit}>
            {id ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ClinicForm;
