import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Bem-vindo ao VetHub</h1>
      <div className={styles.dashboardGrid}>
        <Link to="/tutores" className={styles.dashboardCard}>
          <h2>Tutores</h2>
          <p>Gerencie os tutores dos pacientes</p>
        </Link>

        <Link to="/consultas" className={styles.dashboardCard}>
          <h2>Consultas</h2>
          <p>Acompanhe e registre novas consultas</p>
        </Link>

        <Link to="/medicos" className={styles.dashboardCard}>
          <h2>Médicos</h2>
          <p>Controle os médicos ativos no sistema</p>
        </Link>

        <Link to="/agendamentos" className={styles.dashboardCard}>
          <h2>Agendamentos</h2>
          <p>Visualize e organize os horários</p>
        </Link>

        <Link to="/animais" className={styles.dashboardCard}>
          <h2>Animais</h2>
          <p>Gerencie e controle os animais</p>
        </Link>

        <Link to="/vethub-ia" className={`${styles.dashboardCard} ${styles.cardVetHub}`}>
         <h2>VetHub + IA</h2>
         <p>Ferramenta inteligente para suporte e análise</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
