import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const stats = [
    { title: "Tutores", count: 12, link: "/tutores" },
    { title: "Animais", count: 25, link: "/animais" },
    { title: "Médicos", count: 8, link: "/medicos" },
    { title: "Consultas", count: 34, link: "/consultas" },
    { title: "Agendamentos", count: 15, link: "/agendamentos" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard Geral</h1>
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <Link to={stat.link} className={styles.card} key={index}>
            <h2>{stat.count}</h2>
            <p>{stat.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
