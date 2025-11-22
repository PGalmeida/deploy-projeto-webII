import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/api";
import { getUserInfo, setUserInfo, isAuthenticated } from "../../utils/auth";
import "./Perfil.css";

const Perfil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estados para o formulário de atualizar nome
  const [name, setName] = useState("");

  // Estados para o formulário de atualizar senha
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loadUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // Tentar buscar do localStorage primeiro
      const userInfo = getUserInfo();
      if (userInfo) {
        setUser(userInfo);
        setName(userInfo.name || "");
        return;
      }

      // Se não tiver no localStorage, buscar do backend
      const response = await authAPI.getCurrentUser();
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setName(response.data.user.name || "");
        setUserInfo(response.data.user);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Erro ao carregar informações do usuário. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Carregar informações do usuário
    loadUserInfo();
  }, [navigate, loadUserInfo]);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || name.trim() === "") {
      setError("Por favor, informe um nome/apelido.");
      return;
    }

    if (name.length > 50) {
      setError("O nome não pode ter mais de 50 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.updateProfile(name.trim());

      if (response.data && response.data.user) {
        setUser(response.data.user);
        setUserInfo(response.data.user);
        setSuccess("Nome/apelido atualizado com sucesso!");
        
        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Você precisa estar logado para atualizar seu perfil.");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Erro ao atualizar nome/apelido. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Por favor, preencha todos os campos de senha.");
      return;
    }

    if (newPassword.length < 6) {
      setError("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("A nova senha e a confirmação não coincidem.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("A nova senha deve ser diferente da senha atual.");
      return;
    }

    try {
      setLoading(true);
      await authAPI.updatePassword(currentPassword, newPassword);

      setSuccess("Senha atualizada com sucesso!");
      
      // Limpar campos de senha
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        if (err.response?.data?.message?.includes("Senha atual incorreta")) {
          setError("Senha atual incorreta.");
        } else {
          setError("Você precisa estar logado para atualizar sua senha.");
          navigate("/login");
        }
      } else {
        setError(err.response?.data?.message || "Erro ao atualizar senha. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="perfil-container">
        <div className="perfil-loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-content">
        <h1 className="perfil-title">Meu Perfil</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {user && (
          <div className="perfil-info">
            <div className="perfil-section">
              <h2>Informações do Usuário</h2>
              <div className="perfil-field">
                <label>Email:</label>
                <p className="perfil-value">{user.email}</p>
              </div>
              <div className="perfil-field">
                <label>Nome/Apelido:</label>
                <p className="perfil-value">{user.name || "Não definido"}</p>
              </div>
            </div>

            {/* Formulário para atualizar nome/apelido */}
            <div className="perfil-section">
              <h2>Atualizar Nome/Apelido</h2>
              <form onSubmit={handleUpdateName} className="perfil-form">
                <div className="form-group">
                  <label htmlFor="name">Nome/Apelido:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome ou apelido"
                    maxLength={50}
                    disabled={loading}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Atualizando..." : "Atualizar Nome/Apelido"}
                </button>
              </form>
            </div>

            {/* Formulário para atualizar senha */}
            <div className="perfil-section">
              <h2>Alterar Senha</h2>
              <form onSubmit={handleUpdatePassword} className="perfil-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Senha Atual:</label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Digite sua senha atual"
                    disabled={loading}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Nova Senha:</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite a nova senha (mínimo 6 caracteres)"
                    minLength={6}
                    disabled={loading}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                    minLength={6}
                    disabled={loading}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Atualizando..." : "Atualizar Senha"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;

