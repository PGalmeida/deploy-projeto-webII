import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Redireciona para Novo Agendamento já que são a mesma funcionalidade
function NovaConsulta() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/agendamentos/novo", { replace: true });
  }, [navigate]);

  return (
    <div className="page-container">
      <p>Redirecionando para Novo Agendamento...</p>
    </div>
  );
}

export default NovaConsulta;
