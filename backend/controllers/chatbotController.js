import { chatbotReply } from "../services/chatbotService.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Mensagem é obrigatória." });
    }

    const reply = await chatbotReply(message);

    return res.json({
      user: message,
      bot: reply,
    });
  } catch (error) {
    const errorMessage = error.message || "Erro ao processar a mensagem. Tente novamente.";
    return res.status(500).json({ 
      error: errorMessage,
      bot: errorMessage 
    });
  }
};
