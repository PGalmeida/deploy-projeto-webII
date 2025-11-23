# 🐾 MedVet Frontend

Frontend do sistema MedVet - Sistema de Gestão Veterinária

## 🚀 Início Rápido

### Instalação

```bash
npm install
```

### Executar

**Desenvolvimento:**
```bash
npm start
```

**Build de Produção:**
```bash
npm run build
```

## ⚙️ Configuração

Configure a URL da API no arquivo `src/api/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";
```

Ou use variável de ambiente:

```env
REACT_APP_API_URL=http://localhost:3000/api/v1
```

## 📁 Estrutura

```
frontend/
├── public/              # Arquivos públicos
├── src/
│   ├── api/            # Configuração da API
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas principais
│   └── utils/          # Utilitários
└── package.json
```

## 🛠️ Tecnologias

- React 18.2.0
- React Router DOM
- Axios
- Bootstrap 5
- React Helmet

## 👨‍💻 Desenvolvido por

**Pedro Gomes de Almeida** e **Matheus de Castro Evangelista**

