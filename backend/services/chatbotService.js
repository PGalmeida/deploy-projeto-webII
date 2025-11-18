import axios from "axios";

export const chatbotReply = async (userMessage) => {
  try {
    const API_KEY = process.env.HUGGINGFACE_API_KEY;
    const MODEL = process.env.HUGGINGFACE_MODEL;

    if (!API_KEY || API_KEY === "your_huggingface_api_key_here") {
      console.error("HUGGINGFACE_API_KEY não configurada no arquivo .env");
      return "Desculpe, o chatbot não está configurado corretamente. Por favor, configure a chave da API do Hugging Face.";
    }

    if (!MODEL) {
      console.error("HUGGINGFACE_MODEL não configurado no arquivo .env");
      return "Desculpe, o modelo do chatbot não está configurado.";
    }

    // Formata o prompt (ajustar conforme o modelo)
    // Para modelos de chat como Mistral: `<s>[INST] ${userMessage} [/INST]`
    // Para modelos de texto simples: apenas a mensagem
    const prompt = userMessage;
    
    // Tenta usar a API do router primeiro, se falhar, tenta a API tradicional
    let response;
    try {
      // Tenta com a API do router (nova API) - formato correto
      response = await axios.post(
        `https://api-inference.huggingface.co/models/${MODEL}`,
        {
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            top_p: 0.9,
            return_full_text: false,
            do_sample: true,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );
    } catch (apiError) {
      // Se a API retornar 410, significa que não é mais suportada
      if (apiError.response?.status === 410) {
        throw new Error("A API do Hugging Face mudou. Por favor, verifique a documentação mais recente ou use um modelo diferente.");
      }
      throw apiError;
    }

    // Processa a resposta da API
    let botMessage = "Desculpe, não consegui entender.";
    
    if (response.data) {
      // A API pode retornar um array ou um objeto
      if (Array.isArray(response.data) && response.data[0]?.generated_text) {
        botMessage = response.data[0].generated_text.trim();
      } else if (response.data.generated_text) {
        botMessage = response.data.generated_text.trim();
      } else if (typeof response.data === 'string') {
        botMessage = response.data.trim();
      }
      
      // Remove o prompt do início se estiver presente
      if (botMessage.includes(prompt)) {
        botMessage = botMessage.replace(prompt, "").trim();
      }
      
      // Remove marcadores comuns de modelos se presentes
      botMessage = botMessage.replace(/<s>/g, "");
      botMessage = botMessage.replace(/\[INST\]/g, "");
      botMessage = botMessage.replace(/\[\/INST\]/g, "");
      botMessage = botMessage.replace(/<\/s>/g, "");
      botMessage = botMessage.replace(/<\|begin_of_text\|>/g, "");
      botMessage = botMessage.replace(/<\|.*?\|>/g, "");
      botMessage = botMessage.trim();
      
      // Se a mensagem estiver vazia após limpeza, retorna mensagem padrão
      if (!botMessage || botMessage.length === 0) {
        botMessage = "Desculpe, não consegui gerar uma resposta adequada.";
      }
    }

    return botMessage;
  } catch (error) {
    // Log detalhado do erro para debug
    console.error("=== ERRO NO CHATBOT ===");
    console.error("Mensagem:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Status Text:", error.response?.statusText);
    console.error("Dados da resposta:", JSON.stringify(error.response?.data, null, 2));
    console.error("Código do erro:", error.code);
    console.error("=========================");
    
    if (error.response?.status === 401) {
      return "Erro de autenticação. Verifique se a chave da API do Hugging Face está correta.";
    }
    
    if (error.response?.status === 503) {
      const errorMsg = error.response?.data?.error || "O modelo está carregando";
      return `${errorMsg}. Por favor, tente novamente em alguns segundos.`;
    }
    
    if (error.response?.status === 429) {
      return "Muitas requisições. Por favor, aguarde um momento antes de tentar novamente.";
    }
    
    if (error.response?.status === 404) {
      return "Modelo não encontrado ou não disponível na nova API. O modelo 'meta-llama/Llama-3.2-3B-Instruct' pode não estar disponível. Tente usar um modelo diferente como 'mistralai/Mistral-7B-Instruct-v0.2' ou 'google/gemma-7b-it'.";
    }
    
    if (error.response?.status === 410) {
      return "A API antiga não é mais suportada. O chatbot precisa ser atualizado para usar a nova API do Hugging Face.";
    }
    
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return "A requisição demorou muito para responder. Tente novamente.";
    }
    
    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return "Erro de conexão com a API do Hugging Face. Verifique sua conexão com a internet.";
    }
    
    // Retorna mensagem de erro mais informativa
    const errorDetails = error.response?.data?.error || error.message || "Erro desconhecido";
    return `Ops, tive um problema para responder agora. Erro: ${error.response?.status || ""} - ${errorDetails}. Tente novamente mais tarde.`;
  }
};
