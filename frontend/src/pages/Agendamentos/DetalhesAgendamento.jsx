import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vetAPI, veterinaryAPI, clinicAPI } from "../../api/api";
import { isAuthenticated } from "../../utils/auth.js";

const DetalhesAgendamento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agendamento, setAgendamento] = useState(null);
  const [clinic, setClinic] = useState(null);
  const [veterinary, setVeterinary] = useState(null);

  const fetchAgendamento = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await vetAPI.getById(id);
      const data = response.data.vet || response.data;
      
      setAgendamento(data);
      
      // Buscar informações da clínica e veterinário
      if (data.clinicId) {
        try {
          const clinicResponse = await clinicAPI.getById(data.clinicId);
          setClinic(clinicResponse.data);
        } catch (err) {
        }
      }
      
      if (data.veterinaryId) {
        try {
          const vetResponse = await veterinaryAPI.getById(data.veterinaryId);
          setVeterinary(vetResponse.data);
        } catch (err) {
        }
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Agendamento não encontrado.");
      } else {
        setError("Erro ao carregar agendamento. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    fetchAgendamento();
  }, [navigate, fetchAgendamento]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    if (timeString.match(/^\d{2}:\d{2}$/)) return timeString;
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

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <p>Carregando detalhes do agendamento...</p>
        </div>
      </div>
    );
  }

  if (error || !agendamento) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error || "Agendamento não encontrado."}
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/agendamentos")}
        >
          Voltar para Lista
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Detalhes da Consulta</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/agendamentos")}
        >
          ← Voltar
        </button>
      </div>

      <div className="card p-4 shadow">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h5 className="border-bottom pb-2 mb-3">Dados do Tutor</h5>
            <div className="mb-2">
              <strong>Nome:</strong> {agendamento.tutorName || "-"}
            </div>
            <div className="mb-2">
              <strong>Email:</strong> {agendamento.tutorEmail || "-"}
            </div>
            <div className="mb-2">
              <strong>Telefone:</strong> {agendamento.tutorPhone || "-"}
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <h5 className="border-bottom pb-2 mb-3">Dados do Animal</h5>
            <div className="mb-2">
              <strong>Nome:</strong> {agendamento.animalName || "-"}
            </div>
            <div className="mb-2">
              <strong>Espécie:</strong> {agendamento.species || "-"}
            </div>
            <div className="mb-2">
              <strong>Raça:</strong> {agendamento.race || "-"}
            </div>
            <div className="mb-2">
              <strong>Idade:</strong> {agendamento.age ? `${agendamento.age} anos` : "-"}
            </div>
            <div className="mb-2">
              <strong>Sexo:</strong> {agendamento.sex || "-"}
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6 mb-4">
            <h5 className="border-bottom pb-2 mb-3">Dados da Consulta</h5>
            <div className="mb-2">
              <strong>Data:</strong> {formatDate(agendamento.dateConsult)}
            </div>
            <div className="mb-2">
              <strong>Hora:</strong> {formatTime(agendamento.hourConsult)}
            </div>
            <div className="mb-2">
              <strong>Status:</strong> {getStatusBadge(agendamento.status)}
            </div>
            {clinic && (
              <div className="mb-2">
                <strong>Clínica:</strong> {clinic.name || "-"}
              </div>
            )}
            {veterinary && (
              <div className="mb-2">
                <strong>Veterinário:</strong> {veterinary.name || "-"} {veterinary.crmv ? `(${veterinary.crmv})` : ""}
              </div>
            )}
          </div>

          <div className="col-md-6 mb-4">
            <h5 className="border-bottom pb-2 mb-3">Informações Médicas</h5>
            <div className="mb-2">
              <strong>Motivo da Consulta:</strong>
              <div className="mt-1 p-2 bg-light rounded">
                {agendamento.reasonConsult || "-"}
              </div>
            </div>
            <div className="mb-2">
              <strong>Sintomas:</strong>
              <div className="mt-1 p-2 bg-light rounded">
                {agendamento.symptoms || "-"}
              </div>
            </div>
            {agendamento.observations && (
              <div className="mb-2">
                <strong>Observações:</strong>
                <div className="mt-1 p-2 bg-light rounded">
                  {agendamento.observations}
                </div>
              </div>
            )}
          </div>
        </div>

        {agendamento.createdAt && (
          <div className="row mt-3">
            <div className="col-12">
              <small className="text-muted">
                Criado em: {new Date(agendamento.createdAt).toLocaleString("pt-BR")}
              </small>
              {agendamento.updatedAt && agendamento.updatedAt !== agendamento.createdAt && (
                <small className="text-muted ms-3">
                  Atualizado em: {new Date(agendamento.updatedAt).toLocaleString("pt-BR")}
                </small>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalhesAgendamento;

