import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { authAPI } from "../api/api";
import { setToken, setUserInfo } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      
      // Verificar se o token existe na resposta
      if (response.data && (response.data.token || response.data.data?.token)) {
        const token = response.data.token || response.data.data?.token;
        setToken(token);
        
        // Salvar informações do usuário
        if (response.data.user) {
          setUserInfo(response.data.user);
        } else {
          // Se não vier nas informações de login, buscar do servidor
          setTimeout(async () => {
            try {
              const userResponse = await authAPI.getCurrentUser();
              if (userResponse.data && userResponse.data.user) {
                setUserInfo(userResponse.data.user);
              }
            } catch (err) {
            }
          }, 500);
        }
        
        navigate("/");
      } else if (response.data && response.data.success) {
        setError("Token não recebido do servidor. Tente novamente.");
      } else {
        setError("Resposta inválida do servidor.");
      }
    } catch (err) {
      if (err.response) {
        // Erro com resposta do servidor
        const errorMessage = err.response.data?.message || 
                           err.response.data?.error ||
                           `Erro ${err.response.status}: ${err.response.statusText}`;
        setError(errorMessage);
      } else if (err.request) {
        // Erro de rede (servidor não respondeu)
        setError("Não foi possível conectar ao servidor. Verifique se o back-end está rodando.");
      } else {
        // Outro tipo de erro
        setError("Erro ao fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authContainer}>
        <h1 className={styles.authTitle}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
