import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Redireciona para Agendamentos já que são a mesma funcionalidade
function ConsultasList() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/agendamentos", { replace: true });
  }, [navigate]);

  return (
    <div className="page-container">
      <p>Redirecionando para Agendamentos...</p>
    </div>
  );
}

export default ConsultasList;
