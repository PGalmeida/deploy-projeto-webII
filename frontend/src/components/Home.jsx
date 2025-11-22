import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { vetAPI, veterinaryAPI, clinicAPI } from "../api/api";
import styles from "./Home.module.css";

function Home() {
  const [stats, setStats] = useState({
    consultas: 0,
    medicos: 0,
    clinicas: 0,
  });
  const [medicos, setMedicos] = useState([]);
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Carregar consultas/agendamentos
      try {
        const consultasRes = await vetAPI.getAll();
        const consultasData = consultasRes.data;
        const consultasCount = consultasData.vets ? consultasData.vets.length : 0;
        setStats((prev) => ({ ...prev, consultas: consultasCount }));
      } catch (err) {
      }

      try {
        const medicosRes = await veterinaryAPI.getAll();
        const medicosData = Array.isArray(medicosRes.data) ? medicosRes.data : [];
        setMedicos(medicosData);
        setStats((prev) => ({ ...prev, medicos: medicosData.length }));
      } catch (err) {
      }

      try {
        const clinicasRes = await clinicAPI.getAll();
        const clinicasData = Array.isArray(clinicasRes.data) ? clinicasRes.data : [];
        setClinicas(clinicasData);
        setStats((prev) => ({ ...prev, clinicas: clinicasData.length }));
      } catch (err) {
      }
    } catch (err) {
      setError("Erro ao carregar algumas informações do dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.homeContainer}>
        <h1 className={styles.homeTitle}>Bem-vindo ao MedVet</h1>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Bem-vindo ao MedVet</h1>

      {error && (
        <div className="alert alert-warning" role="alert" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      {/* Cards de Estatísticas */}
      <div className={styles.dashboardGrid}>
        <Link to="/agendamentos" className={styles.dashboardCard}>
          <div className={styles.cardNumber}>{stats.consultas}</div>
          <h2>Consultas</h2>
          <p>Agendamentos realizados</p>
        </Link>

        <Link to="/medicos" className={styles.dashboardCard}>
          <div className={styles.cardNumber}>{stats.medicos}</div>
          <h2>Veterinários</h2>
          <p>Profissionais disponíveis</p>
        </Link>

        <Link to="/clinicas" className={styles.dashboardCard}>
          <div className={styles.cardNumber}>{stats.clinicas}</div>
          <h2>Clínicas</h2>
          <p>Unidades disponíveis</p>
        </Link>

        <Link to="/medvet-ia" className={`${styles.dashboardCard} ${styles.cardMedVet}`}>
          <div className={styles.cardIcon}>🤖</div>
          <h2>MedVet + IA</h2>
          <p>Assistente virtual inteligente</p>
        </Link>
      </div>

      {/* Lista de Veterinários */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2>Veterinários Disponíveis</h2>
          <Link to="/medicos" className={styles.viewAllLink}>
            Ver todos →
          </Link>
        </div>
        {medicos.length === 0 ? (
          <p className={styles.emptyMessage}>Nenhum médico cadastrado ainda.</p>
        ) : (
          <div className={styles.listGrid}>
            {medicos.slice(0, 6).map((medico) => (
              <div key={medico.id} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <h4>{medico.name}</h4>
                  <p className={styles.itemDetail}>CRMV: {medico.crmv}</p>
                  <p className={styles.itemDetail}>{medico.email}</p>
                  {medico.clinic && (
                    <p className={styles.itemClinic}>📍 {medico.clinic.name}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {medicos.length > 6 && (
          <div className={styles.viewMoreContainer}>
            <Link to="/medicos" className={styles.viewMoreLink}>
              Ver mais veterinários ({medicos.length - 6} restantes)
            </Link>
          </div>
        )}
      </div>

      {/* Lista de Clínicas */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2>Clínicas Disponíveis</h2>
          <Link to="/clinicas" className={styles.viewAllLink}>
            Ver todas →
          </Link>
        </div>
        {clinicas.length === 0 ? (
          <p className={styles.emptyMessage}>Nenhuma clínica cadastrada ainda.</p>
        ) : (
          <div className={styles.listGrid}>
            {clinicas.slice(0, 6).map((clinica) => (
              <div key={clinica.id} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <h4>{clinica.name}</h4>
                  {clinica.address && (
                    <p className={styles.itemDetail}>📍 {clinica.address}</p>
                  )}
                  {clinica.email && (
                    <p className={styles.itemDetail}>✉️ {clinica.email}</p>
                  )}
                  {clinica.phone && (
                    <p className={styles.itemDetail}>📞 {clinica.phone}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {clinicas.length > 6 && (
          <div className={styles.viewMoreContainer}>
            <Link to="/clinicas" className={styles.viewMoreLink}>
              Ver mais clínicas ({clinicas.length - 6} restantes)
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
