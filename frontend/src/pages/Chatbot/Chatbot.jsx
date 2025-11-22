import React, { useState, useRef, useEffect } from "react";
import { chatbotAPI } from "../../api/api";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Mensagem de boas-vindas
    setMessages([
      {
        type: "bot",
        text: "Olá! Bem-vindo ao MedVet + IA. Sou seu assistente virtual para questões veterinárias. Como posso ajudá-lo hoje?",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || loading) {
      return;
    }

    const userMessage = {
      type: "user",
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);
    setError("");

    try {
      const response = await chatbotAPI.sendMessage(inputMessage);
      const botReply = response.data.bot || response.data.reply || "Desculpe, não consegui processar sua mensagem.";

      const botMessage = {
        type: "bot",
        text: botReply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Erro ao comunicar com o assistente. Tente novamente.";

      setError(errorMessage);

      const errorBotMessage = {
        type: "bot",
        text: `Desculpe, ocorreu um erro: ${errorMessage}`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>🐾 MedVet + IA</h1>
        <p className="subtitle">Assistente Virtual Veterinário</p>
      </div>

      {error && (
        <div className="alert alert-warning chatbot-alert" role="alert">
          {error}
        </div>
      )}

      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === "user" ? "message-user" : "message-bot"}`}
          >
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
            {message.type === "bot" && (
              <div className="message-avatar">🤖</div>
            )}
            {message.type === "user" && (
              <div className="message-avatar">👤</div>
            )}
          </div>
        ))}
        {loading && (
          <div className="message message-bot">
            <div className="message-content">
              <div className="message-text">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                Processando...
              </div>
            </div>
            <div className="message-avatar">🤖</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-input-form" onSubmit={handleSendMessage}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Digite sua pergunta sobre veterinária..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!inputMessage.trim() || loading}
          >
            {loading ? "⏳" : "➤"}
          </button>
        </div>
        <small className="text-muted">
          Exemplo: "Como cuidar de um gato filhote?" ou "Quais são os sintomas de cinomose?"
        </small>
      </form>
    </div>
  );
};

export default Chatbot;

