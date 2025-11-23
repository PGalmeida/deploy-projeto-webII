import React, { useState, useRef, useEffect } from "react";
import { chatbotAPI } from "../../api/api";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasQuota, setHasQuota] = useState(true);
  const [questions, setQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // Verifica quota ao carregar
    checkQuotaStatus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkQuotaStatus = async () => {
    try {
      const response = await chatbotAPI.checkQuota();
      const quotaStatus = response.data.hasQuota;
      const questionsList = response.data.questions || [];
      setHasQuota(quotaStatus);
      setQuestions(questionsList);
      
      // Inicializa mensagens
      const welcomeMessage = "Olá! Bem-vindo ao MedVet + IA. Sou seu assistente virtual para questões veterinárias. Como posso ajudá-lo hoje?";
      
      if (!quotaStatus && questionsList.length > 0) {
        // Se não tem quota, adiciona as perguntas como mensagens do bot
        setMessages([
          {
            type: "bot",
            text: welcomeMessage,
            timestamp: new Date(),
          },
          {
            type: "bot",
            text: "Selecione uma das opções abaixo:",
            timestamp: new Date(),
            isQuestionList: true,
            questions: questionsList,
          },
        ]);
      } else {
        // Se tem quota, apenas mensagem de boas-vindas
        setMessages([
          {
            type: "bot",
            text: welcomeMessage,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error("Erro ao verificar quota:", err);
      setHasQuota(false);
      setMessages([
        {
          type: "bot",
          text: "Olá! Bem-vindo ao MedVet + IA. Sou seu assistente virtual para questões veterinárias.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (messageText = null) => {
    const messageToSend = messageText || inputMessage;

    if (!messageToSend.trim() || loading) {
      return;
    }

    const userMessage = {
      type: "user",
      text: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) {
      setInputMessage("");
    }
    setLoading(true);
    setError("");

    try {
      const response = await chatbotAPI.sendMessage(messageToSend, sessionIdRef.current);
      const botReply = response.data.bot || response.data.reply || "Desculpe, não consegui processar sua mensagem.";

      const botMessage = {
        type: "bot",
        text: botReply,
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const newMessages = [...prev, botMessage];
        return newMessages;
      });

      // Se não tem quota, adiciona as perguntas novamente após um delay
      if (!hasQuota && questions.length > 0) {
        setTimeout(() => {
          setMessages((prev) => {
            // Verifica se já não tem perguntas no final para evitar duplicatas
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.isQuestionList) {
              return prev;
            }
            
            return [...prev, {
              type: "bot",
              text: "Selecione outra opção se precisar de mais ajuda:",
              timestamp: new Date(),
              isQuestionList: true,
              questions: questions,
            }];
          });
        }, 1500); // Espera 1.5 segundos antes de mostrar as perguntas
      }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleQuestionClick = async (question) => {
    // Mostra a pergunta completa no chat
    const userMessage = {
      type: "user",
      text: question.text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");

    try {
      // Envia o ID da pergunta para o backend
      const response = await chatbotAPI.sendMessage(question.id, sessionIdRef.current);
      const botReply = response.data.bot || response.data.reply || "Desculpe, não consegui processar sua mensagem.";

      const botMessage = {
        type: "bot",
        text: botReply,
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const newMessages = [...prev, botMessage];
        return newMessages;
      });

      // Adiciona as perguntas novamente após um delay
      if (!hasQuota && questions.length > 0) {
        setTimeout(() => {
          setMessages((prev) => {
            // Verifica se já não tem perguntas no final para evitar duplicatas
            const lastMessage = prev[prev.length - 1];
            if (lastMessage?.isQuestionList) {
              return prev;
            }
            
            return [...prev, {
              type: "bot",
              text: "Selecione outra opção se precisar de mais ajuda:",
              timestamp: new Date(),
              isQuestionList: true,
              questions: questions,
            }];
          });
        }, 1500); // Espera 1.5 segundos antes de mostrar as perguntas
      }
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
          <div key={index}>
            {message.isQuestionList ? (
              <div className="message message-bot">
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  <div className="questions-list">
                    {message.questions?.map((question) => (
                      <div
                        key={question.id}
                        className="question-item"
                        onClick={() => !loading && handleQuestionClick(question)}
                      >
                        {question.text}
                      </div>
                    ))}
                  </div>
                  <div className="message-time">{formatTime(message.timestamp)}</div>
                </div>
                <div className="message-avatar">🤖</div>
              </div>
            ) : (
              <div
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

      {hasQuota && (
        <form className="chatbot-input-form" onSubmit={handleSubmit}>
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
      )}
    </div>
  );
};

export default Chatbot;
