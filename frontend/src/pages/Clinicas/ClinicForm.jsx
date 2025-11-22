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

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = async () => {
    try {
      setLoadingData(true);
      setError("");
      const res = await clinicAPI.getById(id);
      setForm(res.data);
    } catch (err) {
      if (err.response?.status === 503) {
        setError("Não foi possível conectar ao banco de dados PostgreSQL. Verifique se o serviço está rodando.");
      } else if (err.response?.status === 404) {
        setError("Clínica não encontrada.");
      } else if (err.response?.status === 401) {
        setError("Você precisa estar autenticado para acessar esta clínica.");
      } else if (!err.response) {
        setError("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      } else {
        const errorMessage = 
          err.response?.data?.message || 
          "Erro ao carregar dados da clínica. Tente novamente.";
        setError(errorMessage);
      }
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (id) {
        await clinicAPI.update(id, form);
      } else {
        await clinicAPI.create(form);
      }
      navigate("/clinicas");
    } catch (err) {
      if (err.response?.status === 503) {
        setError("Não foi possível conectar ao banco de dados PostgreSQL. Verifique se o serviço está rodando e se a DATABASE_URL está correta no backend.");
      } else if (err.response?.status === 404) {
        setError("Clínica não encontrada.");
      } else if (err.response?.status === 401) {
        setError("Você precisa estar autenticado para criar/editar clínicas.");
      } else if (err.response?.status === 403) {
        setError("Você não tem permissão para esta ação. É necessário ser administrador.");
      } else if (!err.response) {
        setError("Não foi possível conectar ao servidor. Verifique se o backend está rodando.");
      } else {
        const errorMessage = 
          err.response?.data?.message || 
          err.message ||
          "Erro ao salvar clínica. Verifique os dados e tente novamente.";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {id ? "Editar Clínica" : "Cadastrar Clínica"}
      </h1>

      {error && (
        <div className="alert alert-danger" role="alert" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nome da clínica *"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            required
            disabled={loading}
          />

          <input
            type="text"
            name="address"
            placeholder="Endereço"
            value={form.address || ""}
            onChange={handleChange}
            className={styles.input}
            disabled={loading}
          />

          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={form.phone || ""}
            onChange={handleChange}
            className={styles.input}
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail *"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            required
            disabled={loading}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button 
              type="submit" 
              className={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? "Salvando..." : (id ? "Salvar Alterações" : "Cadastrar")}
            </button>
            <button 
              type="button"
              onClick={() => navigate("/clinicas")}
              className={styles.btnCancel}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClinicForm;
