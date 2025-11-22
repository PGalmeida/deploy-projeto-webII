import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clinicAPI } from "../../api/api.js";
import { isAdmin } from "../../utils/auth.js";
import styles from "./Clinics.module.css";

function Clinics() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await clinicAPI.getAll();
      
      let clinicsData = [];
      if (Array.isArray(res.data)) {
        clinicsData = res.data;
      } else if (res.data && Array.isArray(res.data.clinics)) {
        clinicsData = res.data.clinics;
      } else if (res.data && Array.isArray(res.data.data)) {
        clinicsData = res.data.data;
      } else if (res.data && typeof res.data === 'object') {
        clinicsData = [res.data];
      }
      
      setClinics(clinicsData);
    } catch (err) {
      if (err.response?.status === 503) {
        const errorMessage = err.response?.data?.message || 
          "Não foi possível conectar ao banco de dados PostgreSQL. Verifique se o serviço está rodando e se a DATABASE_URL está correta.";
        setError(errorMessage);
      } else if (err.response?.status === 404) {
        setError(`Rota não encontrada (404). URL: ${err.config?.url}. Verifique se as rotas de clínicas estão registradas no backend.`);
      } else if (err.response?.status === 401) {
        setError("Você precisa estar autenticado para acessar as clínicas.");
      } else if (!err.response) {
        setError(`Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 3000. URL tentada: ${err.config?.url || 'N/A'}`);
      } else {
        const errorMessage = 
          err.response?.data?.message || 
          err.message || 
          "Erro ao carregar clínicas. Verifique os logs do servidor.";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta clínica?")) return;
    
    try {
      await clinicAPI.delete(id);
      loadClinics();
    } catch (err) {
      const errorMessage = 
        err.response?.data?.message || 
        "Erro ao excluir clínica. Tente novamente.";
      alert(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Clínicas</h1>
        <p>Carregando clínicas...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clínicas</h1>

      {isAdmin() && (
        <div className={styles.topBar}>
          <Link to="/clinicas/nova" className={styles.btnNew}>
            Nova Clínica
          </Link>
        </div>
      )}

      {error && (
        <div className="alert alert-warning" role="alert" style={{ marginTop: "20px" }}>
          {error}
        </div>
      )}

      <div className={styles.tableWrapper}>
        {clinics.length === 0 && !error ? (
          <div className="text-center py-5">
            <p>Nenhuma clínica cadastrada ainda.</p>
            {isAdmin() && (
              <Link to="/clinicas/nova" className={styles.btnNew} style={{ display: "inline-block", marginTop: "10px" }}>
                Cadastrar Primeira Clínica
              </Link>
            )}
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clinics.map((clinic) => (
                <tr key={clinic.id}>
                  <td>{clinic.name || "-"}</td>
                  <td>{clinic.address || "-"}</td>
                  <td>{clinic.email || "-"}</td>
                  <td>{clinic.phone || "-"}</td>
                  <td>
                    <div className={styles.actions}>
                      {isAdmin() && (
                        <>
                          <Link
                            to={`/clinicas/editar/${clinic.id}`}
                            className={styles.btnEdit}
                          >
                            Editar
                          </Link>
                          <button
                            className={styles.btnDelete}
                            onClick={() => handleDelete(clinic.id)}
                          >
                            Excluir
                          </button>
                        </>
                      )}
                      {!isAdmin() && <span className="text-muted">Apenas visualização</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Clinics;
