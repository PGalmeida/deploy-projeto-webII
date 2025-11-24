import axios from "axios";

// Detecta automaticamente a URL da API baseado no ambiente
const getApiUrl = () => {
  // Se estiver em produção (deploy), usa a URL do Render
  if (process.env.NODE_ENV === 'production' || 
      (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')) {
    // URL da API no Render
    return "https://deploy-projeto-webii-1.onrender.com/api/v1";
  }
  // Desenvolvimento local
  return "http://localhost:3000/api/v1";
};

const API_BASE_URL = getApiUrl();
const API_URL = API_BASE_URL;
const cleanApiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

const api = axios.create({
  baseURL: cleanApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    if (config.url && !config.url.startsWith('http')) {
      const urlPath = config.url.startsWith('/') ? config.url : '/' + config.url;
      config.url = `${cleanApiUrl}${urlPath}`;
      config.baseURL = '';
    } else {
      config.baseURL = cleanApiUrl;
    }
    
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined" && window.localStorage) {
        const currentPath = window.location.pathname;
        if (currentPath !== "/login" && currentPath !== "/register") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => {
    const baseUrl = getApiUrl();
    const url = `${baseUrl}/register`;
    return axios({
      method: 'POST',
      url: url,
      data: userData,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
  },
  login: (credentials) => {
    const baseUrl = getApiUrl();
    const url = `${baseUrl}/login`;
    return axios({
      method: 'POST',
      url: url,
      data: credentials,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
  },
  loginApi: (credentials) => api.post("/login", credentials),
  registerApi: (userData) => api.post("/register", userData),
  getCurrentUser: () => api.get("/me"),
  updateProfile: (name) => api.put("/me/update", { name }),
  updatePassword: (currentPassword, newPassword) => api.put("/password/update", { currentPassword, newPassword }),
};

export const vetAPI = {
  getAll: (params) => api.get("/vets", { params }),
  getById: (id) => api.get(`/vets/${id}`),
  create: (vetData) => api.post("/admin/vets", vetData),
  update: (id, vetData) => api.put(`/vets/${id}`, vetData),
  delete: (id) => api.delete(`/vets/${id}`),
};

export const veterinaryAPI = {
  getAll: () => api.get("/veterinaries"),
  getById: (id) => api.get(`/veterinaries/${id}`),
  create: (vetData) => api.post("/veterinaries", vetData),
  update: (id, vetData) => api.put(`/veterinaries/${id}`, vetData),
  delete: (id) => api.delete(`/veterinaries/${id}`),
};

export const clinicAPI = {
  getAll: () => api.get("/clinics"),
  getById: (id) => api.get(`/clinics/${id}`),
  create: (clinicData) => api.post("/clinics", clinicData),
  update: (id, clinicData) => api.put(`/clinics/${id}`, clinicData),
  delete: (id) => api.delete(`/clinics/${id}`),
};

export const chatbotAPI = {
  sendMessage: (message, sessionId) => api.post("/chatbot", { message, sessionId }),
  checkQuota: () => api.get("/chatbot/quota"),
};

export default api;

