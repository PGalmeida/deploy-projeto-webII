import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { vetAPI } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth.js";

const AgendamentosList = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const fetchAgendamentos = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const params = {};
      if (searchKeyword) params.keyword = searchKeyword;
      
      const response = await vetAPI.getAll(params);
      const data = response.data;
      
      const vetsList = data.vets || [];
      
      // Ordena por data e hora: mais próxima primeiro
      const sortedAgendamentos = vetsList.sort((a, b) => {
        // Combina data e hora para comparação
        const dateA = a.dateConsult ? new Date(a.dateConsult) : new Date(0);
        const dateB = b.dateConsult ? new Date(b.dateConsult) : new Date(0);
        
        // Se as datas forem iguais, ordena por hora
        if (dateA.getTime() === dateB.getTime()) {
          const timeA = a.hourConsult || "00:00";
          const timeB = b.hourConsult || "00:00";
          return timeA.localeCompare(timeB);
        }
        
        // Ordena por data: mais próxima primeiro (menor data primeiro)
        return dateA.getTime() - dateB.getTime();
      });
      
      setAgendamentos(sortedAgendamentos);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Erro ao carregar agendamentos. Verifique a conexão com o servidor."
      );
    } finally {
      setLoading(false);
    }
  }, [searchKeyword]);

  useEffect(() => {
    fetchAgendamentos();
  }, [fetchAgendamentos]);

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente excluir este agendamento?")) {
      return;
    }

    try {
      await vetAPI.delete(id);
      fetchAgendamentos();
    } catch (err) {
      alert(
        err.response?.data?.message || 
        "Erro ao excluir agendamento. Tente novamente."
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    // Se já estiver no formato HH:mm, retornar direto
    if (timeString.match(/^\d{2}:\d{2}$/)) return timeString;
    // Se for uma data completa, extrair a hora
    const date = new Date(timeString);
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Agendada: { bg: "bg-info", text: "text-white" },
      Cancelada: { bg: "bg-danger", text: "text-white" },
      Realizada: { bg: "bg-success", text: "text-white" },
    };
    const config = statusConfig[status] || { bg: "bg-secondary", text: "text-white" };
    return (
      <span className={`badge ${config.bg} ${config.text}`}>
        {status || "-"}
      </span>
    );
  };

  if (loading && agendamentos.length === 0) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">Agendamentos / Consultas</h2>
        </div>
        <div className="text-center">
          <p>Carregando agendamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Agendamentos / Consultas</h2>
        {isAdmin() && (
          <Link 
            to="/agendamentos/novo" 
            className="btn" 
            style={{ backgroundColor: "#3CB3AB", color: "#fff" }}
          >
            + Novo Agendamento
          </Link>
        )}
      </div>

      {/* Barra de pesquisa */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome do tutor..."
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}

      <div className="card p-4 shadow" style={{ overflowX: "hidden" }}>
        {agendamentos.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">
              {searchKeyword 
                ? "Nenhum agendamento encontrado com esse critério." 
                : "Nenhum agendamento cadastrado ainda."}
            </p>
            {isAdmin() && (
              <Link 
                to="/agendamentos/novo" 
                className="btn mt-3"
                style={{ backgroundColor: "#3CB3AB", color: "#fff" }}
              >
                Criar Primeiro Agendamento
              </Link>
            )}
          </div>
        ) : (
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table className="table table-hover" style={{ width: "100%" }}>
              <thead className="table-light">
                <tr>
                  <th>Data</th>
                  <th>Hora</th>
                  <th>Tutor</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Espécie</th>
                  <th>Motivo</th>
                  <th>Status</th>
                  <th style={{ width: "110px" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.map((agendamento) => (
                  <tr key={agendamento._id}>
                    <td>{formatDate(agendamento.dateConsult)}</td>
                    <td>{formatTime(agendamento.hourConsult)}</td>
                    <td>{agendamento.tutorName || "-"}</td>
                    <td>{agendamento.tutorEmail || "-"}</td>
                    <td>{agendamento.tutorPhone || "-"}</td>
                    <td>{agendamento.species || "-"}</td>
                    <td>
                      <small className="text-muted">
                        {agendamento.reasonConsult 
                          ? (agendamento.reasonConsult.length > 30 
                              ? `${agendamento.reasonConsult.substring(0, 30)}...` 
                              : agendamento.reasonConsult)
                          : "-"}
                      </small>
                    </td>
                    <td>{getStatusBadge(agendamento.status)}</td>
                    <td>
                      {isAdmin() ? (
                        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                          <button
                            className="btn btn-sm"
                            onClick={() => navigate(`/agendamentos/${agendamento._id}`)}
                            title="Visualizar"
                            style={{ 
                              padding: "4px 8px",
                              minWidth: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "transparent",
                              color: "#0d6efd",
                              border: "none",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#0d6efd";
                              e.target.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#0d6efd";
                            }}
                          >
                            👁️
                          </button>
                          <button
                            className="btn btn-sm"
                            onClick={() => navigate(`/agendamentos/${agendamento._id}/editar`)}
                            title="Editar"
                            style={{ 
                              padding: "4px 8px",
                              minWidth: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "transparent",
                              color: "#198754",
                              border: "none",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#198754";
                              e.target.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#198754";
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-sm"
                            onClick={() => handleDelete(agendamento._id)}
                            title="Excluir"
                            style={{ 
                              padding: "4px 8px",
                              minWidth: "32px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "transparent",
                              color: "#dc3545",
                              border: "none",
                              cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#dc3545";
                              e.target.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "transparent";
                              e.target.style.color = "#dc3545";
                            }}
                          >
                            🗑️
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-sm"
                          onClick={() => navigate(`/agendamentos/${agendamento._id}`)}
                          title="Visualizar"
                          style={{ 
                            backgroundColor: "transparent",
                            color: "#0d6efd",
                            border: "none",
                            cursor: "pointer"
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#0d6efd";
                            e.target.style.color = "#ffffff";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#0d6efd";
                          }}
                        >
                          👁️ Visualizar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgendamentosList;
