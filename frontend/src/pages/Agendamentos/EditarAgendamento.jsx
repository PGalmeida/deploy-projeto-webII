import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vetAPI, veterinaryAPI, clinicAPI } from "../../api/api";
import { isAuthenticated, isAdmin } from "../../utils/auth.js";

const EditarAgendamento = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [loadingClinics, setLoadingClinics] = useState(true);
  const [loadingVeterinaries, setLoadingVeterinaries] = useState(true);

  // Dados do formulário
  const [formData, setFormData] = useState({
    tutorName: "",
    tutorEmail: "",
    tutorPhone: "",
    animalName: "",
    species: "",
    race: "",
    age: "",
    sex: "",
    dateConsult: "",
    hourConsult: "",
    reasonConsult: "",
    symptoms: "",
    status: "Agendada",
    observations: "",
    clinicId: "",
    veterinaryId: "",
  });

  const [clinics, setClinics] = useState([]);
  const [veterinaries, setVeterinaries] = useState([]);

  const fetchVeterinaries = useCallback(async (clinicId) => {
    try {
      setLoadingVeterinaries(true);
      const response = await veterinaryAPI.getAll();
      const vetsData = Array.isArray(response.data) ? response.data : [];
      // Filtrar veterinários por clínica
      const filteredVets = vetsData.filter(vet => vet.clinicId === parseInt(clinicId));
      setVeterinaries(filteredVets);
    } catch (err) {
    } finally {
      setLoadingVeterinaries(false);
    }
  }, []);

  const fetchClinics = useCallback(async () => {
    try {
      const response = await clinicAPI.getAll();
      const clinicsData = Array.isArray(response.data) ? response.data : [];
      setClinics(clinicsData);
    } catch (err) {
    } finally {
      setLoadingClinics(false);
    }
  }, []);

  const fetchAgendamento = useCallback(async () => {
    try {
      setLoadingData(true);
      const response = await vetAPI.getById(id);
      const data = response.data.vet || response.data;
      
      // Formatar data para o input
      const date = data.dateConsult ? new Date(data.dateConsult).toISOString().split("T")[0] : "";
      
      setFormData({
        tutorName: data.tutorName || "",
        tutorEmail: data.tutorEmail || "",
        tutorPhone: data.tutorPhone || "",
        animalName: data.animalName || "",
        species: data.species || "",
        race: data.race || "",
        age: data.age || "",
        sex: data.sex || "",
        dateConsult: date,
        hourConsult: data.hourConsult || "",
        reasonConsult: data.reasonConsult || "",
        symptoms: data.symptoms || "",
        status: data.status || "Agendada",
        observations: data.observations || "",
        clinicId: data.clinicId ? data.clinicId.toString() : "",
        veterinaryId: data.veterinaryId ? data.veterinaryId.toString() : "",
      });

      // Buscar veterinários da clínica selecionada
      if (data.clinicId) {
        fetchVeterinaries(data.clinicId.toString());
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("Agendamento não encontrado.");
      } else {
        setError("Erro ao carregar agendamento. Tente novamente.");
      }
    } finally {
      setLoadingData(false);
    }
  }, [id, fetchVeterinaries]);

  // Verificar autenticação e permissões ao carregar
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    if (!isAdmin()) {
      alert("Apenas administradores podem editar consultas.");
      navigate("/agendamentos");
      return;
    }
    fetchAgendamento();
    fetchClinics();
  }, [navigate, fetchAgendamento, fetchClinics]);

  useEffect(() => {
    if (formData.clinicId) {
      fetchVeterinaries(formData.clinicId);
    }
  }, [formData.clinicId, fetchVeterinaries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validar campos obrigatórios
      if (!formData.tutorName || !formData.tutorEmail || !formData.tutorPhone) {
        throw new Error("Por favor, preencha todos os dados do tutor.");
      }
      if (!formData.animalName || !formData.species || !formData.age) {
        throw new Error("Por favor, preencha todos os dados do animal.");
      }
      if (!formData.dateConsult || !formData.hourConsult) {
        throw new Error("Por favor, preencha data e hora da consulta.");
      }
      if (!formData.reasonConsult || !formData.symptoms) {
        throw new Error("Por favor, preencha o motivo e os sintomas.");
      }

      // Preparar dados para envio
      const dataToSend = {
        ...formData,
        age: parseInt(formData.age) || 0,
        clinicId: formData.clinicId ? parseInt(formData.clinicId) : 1,
        veterinaryId: formData.veterinaryId ? parseInt(formData.veterinaryId) : 1,
        dateConsult: formData.dateConsult ? new Date(formData.dateConsult).toISOString() : new Date().toISOString(),
      };

      await vetAPI.update(id, dataToSend);
      navigate("/agendamentos");
    } catch (err) {
      let errorMessage = "Erro ao atualizar agendamento. Tente novamente.";
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Você precisa estar autenticado para editar uma consulta.";
        } else if (err.response.status === 403) {
          errorMessage = "Apenas administradores podem editar consultas.";
        } else if (err.response.status === 404) {
          errorMessage = "Agendamento não encontrado.";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="container mt-5">
        <h2 className="fw-bold mb-4">Editar Agendamento</h2>
        <p>Carregando dados do agendamento...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold mb-4">Editar Agendamento / Consulta</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="card p-4 shadow">
        <form onSubmit={handleSubmit}>
          <h5 className="mb-3 border-bottom pb-2">Dados do Tutor</h5>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nome do Tutor *</label>
              <input
                type="text"
                className="form-control"
                name="tutorName"
                value={formData.tutorName}
                onChange={handleChange}
                required
                disabled={loading}
                maxLength={100}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email do Tutor *</label>
              <input
                type="email"
                className="form-control"
                name="tutorEmail"
                value={formData.tutorEmail}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Telefone do Tutor *</label>
              <input
                type="tel"
                className="form-control"
                name="tutorPhone"
                value={formData.tutorPhone}
                onChange={handleChange}
                required
                disabled={loading}
                maxLength={15}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <h5 className="mb-3 mt-4 border-bottom pb-2">Dados do Animal</h5>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nome do Animal *</label>
              <input
                type="text"
                className="form-control"
                name="animalName"
                value={formData.animalName}
                onChange={handleChange}
                required
                disabled={loading}
                maxLength={100}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Espécie *</label>
              <input
                type="text"
                className="form-control"
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                disabled={loading}
                maxLength={50}
                placeholder="Ex: Cão, Gato, Pássaro"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Raça</label>
              <input
                type="text"
                className="form-control"
                name="race"
                value={formData.race}
                onChange={handleChange}
                disabled={loading}
                maxLength={50}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Idade (anos) *</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                disabled={loading}
                min="0"
                max="50"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Sexo *</label>
              <select
                className="form-select"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Selecione...</option>
                <option value="Macho">Macho</option>
                <option value="Fêmea">Fêmea</option>
              </select>
            </div>
          </div>

          <h5 className="mb-3 mt-4 border-bottom pb-2">Dados da Consulta</h5>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Data da Consulta *</label>
              <input
                type="date"
                className="form-control"
                name="dateConsult"
                value={formData.dateConsult}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Hora da Consulta *</label>
              <input
                type="time"
                className="form-control"
                name="hourConsult"
                value={formData.hourConsult}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Status *</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="Agendada">Agendada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Realizada">Realizada</option>
              </select>
            </div>
          </div>

          {clinics.length > 0 && (
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Clínica</label>
                <select
                  className="form-select"
                  name="clinicId"
                  value={formData.clinicId}
                  onChange={handleChange}
                  disabled={loading || loadingClinics}
                >
                  {clinics.map((clinic) => (
                    <option key={clinic.id} value={clinic.id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Veterinário</label>
                <select
                  className="form-select"
                  name="veterinaryId"
                  value={formData.veterinaryId}
                  onChange={handleChange}
                  disabled={loading || loadingVeterinaries || !formData.clinicId}
                >
                  {veterinaries.length > 0 ? (
                    veterinaries.map((vet) => (
                      <option key={vet.id} value={vet.id}>
                        {vet.name} - {vet.crmv}
                      </option>
                    ))
                  ) : (
                    <option value="">Nenhum veterinário disponível para esta clínica</option>
                  )}
                </select>
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Motivo da Consulta *</label>
            <textarea
              className="form-control"
              rows="3"
              name="reasonConsult"
              value={formData.reasonConsult}
              onChange={handleChange}
              required
              disabled={loading}
              maxLength={500}
              placeholder="Descreva o motivo da consulta"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sintomas *</label>
            <textarea
              className="form-control"
              rows="3"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              required
              disabled={loading}
              maxLength={500}
              placeholder="Descreva os sintomas apresentados pelo animal"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Observações</label>
            <textarea
              className="form-control"
              rows="3"
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              disabled={loading}
              maxLength={500}
              placeholder="Observações adicionais (opcional)"
            />
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#3CB3AB", color: "#fff" }}
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/agendamentos")}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarAgendamento;

