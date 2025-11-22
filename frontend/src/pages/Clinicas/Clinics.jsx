import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clinicAPI } from "../../api/api.js";
import styles from "./Clinics.module.css";

function Clinics() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    const res = await clinicAPI.getAll();
    setClinics(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir?")) return;
    await clinicAPI.delete(id);
    loadClinics();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Clínicas</h1>

      <div className={styles.topBar}>
        <Link to="/clinicas/nova" className={styles.btnNew}>
          Nova Clínica
        </Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td>{clinic.name}</td>
                <td>{clinic.address}</td>
                <td>{clinic.phone}</td>
                <td>
                  <div className={styles.actions}>
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clinics;
