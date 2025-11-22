import axios from "axios";

export const chatbotReply = async (userMessage) => {
  const API_KEY = process.env.HUGGINGFACE_API_KEY;
  
  const MODELS_TO_TRY = [
    process.env.HUGGINGFACE_MODEL,
    "google/flan-t5-base",
    "facebook/blenderbot-400M-distill",
    "microsoft/DialoGPT-medium",
  ].filter(Boolean);

  try {
    if (!API_KEY || API_KEY === "your_huggingface_api_key_here") {
      return "Desculpe, o chatbot não está configurado corretamente. Por favor, configure a chave da API do Hugging Face.";
    }

    if (MODELS_TO_TRY.length === 0) {
      return "Desculpe, o modelo do chatbot não está configurado. Por favor, configure HUGGINGFACE_MODEL no arquivo .env.";
    }

    let lastError = null;
    for (let i = 0; i < MODELS_TO_TRY.length; i++) {
      const MODEL = MODELS_TO_TRY[i];
      
      try {
        let prompt;
        if (MODEL.includes("DialoGPT")) {
          prompt = userMessage;
        } else if (MODEL.includes("Mistral") || MODEL.includes("Llama")) {
          prompt = `<s>[INST] ${userMessage} [/INST]`;
        } else if (MODEL.includes("blenderbot")) {
          prompt = userMessage;
        } else {
          prompt = userMessage;
        }
        
        let response;
        try {
          response = await axios.post(
            `https://router.huggingface.co/models/${MODEL}`,
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
          
          let botMessage = "Desculpe, não consegui entender.";
          
          if (response.data) {
            if (Array.isArray(response.data) && response.data[0]?.generated_text) {
              botMessage = response.data[0].generated_text.trim();
            } else if (response.data.generated_text) {
              botMessage = response.data.generated_text.trim();
            } else if (typeof response.data === 'string') {
              botMessage = response.data.trim();
            } else if (Array.isArray(response.data) && response.data[0]) {
              botMessage = String(response.data[0]).trim();
            }
            
            if (botMessage.includes(prompt)) {
              botMessage = botMessage.replace(prompt, "").trim();
            }
            
            botMessage = botMessage.replace(/<s>/g, "");
            botMessage = botMessage.replace(/\[INST\]/g, "");
            botMessage = botMessage.replace(/\[\/INST\]/g, "");
            botMessage = botMessage.replace(/<\/s>/g, "");
            botMessage = botMessage.replace(/<\|begin_of_text\|>/g, "");
            botMessage = botMessage.replace(/<\|.*?\|>/g, "");
            botMessage = botMessage.trim();
            
            if (!botMessage || botMessage.length === 0) {
              botMessage = "Desculpe, não consegui gerar uma resposta adequada.";
            }
            
            return botMessage;
          }
          
          return botMessage;
          
        } catch (apiError) {
          const status = apiError.response?.status;
          
          if (status === 404) {
            lastError = apiError;
            continue;
          }
          
          if (status === 503) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            lastError = apiError;
            continue;
          }
          
          if (status === 401) {
            return "Erro de autenticação. Verifique se a chave da API do Hugging Face está correta no arquivo .env.";
          }
          
          if (status === 429) {
            return "Muitas requisições. Por favor, aguarde um momento antes de tentar novamente.";
          }
          
          lastError = apiError;
          continue;
        }
      } catch (modelError) {
        lastError = modelError;
        continue;
      }
    }
    
    const lastStatus = lastError?.response?.status;
    const lastModel = MODELS_TO_TRY[MODELS_TO_TRY.length - 1];
    
    if (lastStatus === 404) {
      return `Nenhum dos modelos testados está disponível no momento. Último modelo tentado: '${lastModel}'. Por favor, tente novamente mais tarde ou configure um modelo diferente no arquivo .env.`;
    }
    
    if (lastStatus === 503) {
      return "Os modelos estão carregando. Por favor, aguarde alguns segundos e tente novamente.";
    }
    
    if (lastError?.code === "ECONNABORTED" || lastError?.message?.includes("timeout")) {
      return "A requisição demorou muito para responder. Tente novamente com uma pergunta mais simples.";
    }
    
    if (lastError?.code === "ENOTFOUND" || lastError?.code === "ECONNREFUSED") {
      return "Erro de conexão com a API do Hugging Face. Verifique sua conexão com a internet.";
    }
    
    const errorDetails = lastError?.response?.data?.error || lastError?.message || "Erro desconhecido";
    return `Desculpe, não consegui processar sua mensagem. ${errorDetails}. Por favor, tente novamente mais tarde.`;
    
  } catch (error) {
    return "Ops, ocorreu um erro inesperado ao processar sua mensagem. Por favor, tente novamente mais tarde.";
  }
};
