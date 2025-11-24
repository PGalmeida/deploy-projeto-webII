# 🐾 MedVet Backend

Backend do sistema MedVet - Sistema de Gestão Veterinária

## 📹 Vídeo de Demonstração

Assista ao vídeo de teste do sistema: [https://www.youtube.com/watch?v=LJmL1Y5XWuc](https://www.youtube.com/watch?v=LJmL1Y5XWuc)

## ⚠️ Nota Importante

O sistema foi desenvolvido e testado com sucesso em ambiente local, funcionando corretamente em todas as funcionalidades implementadas. No entanto, não foi possível realizar o deploy em produção devido a dificuldades técnicas encontradas durante o processo de publicação.

## 🚀 Início Rápido

### Instalação

```bash
npm install
```

### Configuração

Configure as variáveis de ambiente no arquivo `config/config.env`:

```env
PORT=3000
DB_URI=mongodb+srv://...
DATABASE_URL=postgresql://...
JWT_SECRET=seu-secret
JWT_EXPIRES_TIME=7d
OPENAI_API_KEY=sua-chave
```

### Executar

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

### 🔐 Autenticação e Permissões

O sistema possui dois níveis de acesso:

**Administrador:**
- **Email:** `admin@admin.com`
- **Senha:** `admin123`
- **Permissões:** Criar, editar e excluir registros

**Usuários Comuns:**
- Podem se registrar através do endpoint de registro
- **Permissões:** Apenas visualização de dados

### Prisma

**Gerar Prisma Client:**
```bash
npm run prisma:generate
```

**Executar Migrações:**
```bash
npm run prisma:migrate
```

## 🐳 Docker

**Desenvolvimento:**
```bash
docker-compose up
```

**Produção:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📁 Estrutura

```
backend/
├── app.js                 # Servidor Express
├── config/                # Configurações
│   ├── config.env        # Variáveis de ambiente
│   └── dbConnect.js      # Conexões de banco
├── controllers/          # Controladores
├── middleware/           # Middlewares
├── models/              # Modelos MongoDB
├── prisma/              # Prisma (PostgreSQL)
├── routes/              # Rotas da API
├── services/            # Serviços
└── utils/               # Utilitários
```

## 👨‍💻 Desenvolvido por

**Pedro Gomes de Almeida** e **Matheus de Castro Evangelista** 

