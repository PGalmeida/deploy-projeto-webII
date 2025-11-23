# 🐾 MedVet - Sistema de Gestão Veterinária

Sistema completo de gestão para clínicas veterinárias, desenvolvido com tecnologias modernas e integração de Inteligência Artificial para assistência virtual.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Autores](#autores)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura](#arquitetura)
- [Funcionalidades](#funcionalidades)
- [Inteligência Artificial](#inteligência-artificial)
- [Bancos de Dados](#bancos-de-dados)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## 🎯 Sobre o Projeto

O **MedVet** é uma aplicação web completa para gestão de clínicas veterinárias, oferecendo:

- **Gestão de Agendamentos e Consultas** - Sistema completo de agendamento com ordenação por data
- **Cadastro de Clínicas e Veterinários** - Gerenciamento de profissionais e estabelecimentos
- **Gestão de Tutores e Animais** - Controle completo de clientes e seus pets
- **Chatbot com IA** - Assistente virtual inteligente para atendimento 24/7
- **Sistema de Autenticação** - Login seguro com JWT e controle de permissões
- **Interface Responsiva** - Design moderno e adaptável para todos os dispositivos

---

## 👥 Autores

Este projeto foi desenvolvido por:

- **Pedro Gomes de Almeida**
- **Matheus de Castro Evangelista**

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js** - Runtime JavaScript
- **Express.js 5.1.0** - Framework web para Node.js
- **JavaScript (ES6+)** - Linguagem de programação
- **Prisma 6.19.0** - ORM para PostgreSQL
- **Mongoose 8.19.3** - ODM para MongoDB
- **JWT (jsonwebtoken 9.0.2)** - Autenticação e autorização
- **bcryptjs 3.0.3** - Criptografia de senhas
- **Axios 1.13.2** - Cliente HTTP
- **CORS 2.8.5** - Controle de acesso cross-origin
- **dotenv 17.2.3** - Gerenciamento de variáveis de ambiente

### Frontend

- **React 18.2.0** - Biblioteca JavaScript para interfaces
- **React Router DOM 6.30.2** - Roteamento de páginas
- **Axios 1.13.2** - Cliente HTTP para API
- **React Helmet 6.1.0** - Gerenciamento de meta tags
- **Bootstrap 5.3.2** - Framework CSS
- **CSS Modules** - Estilização modular

### Inteligência Artificial

- **OpenAI GPT-3.5-turbo** - Modelo de linguagem para o chatbot
- **Sistema de Fallback Inteligente** - IA baseada em regras quando a API não está disponível

### Bancos de Dados

- **MongoDB** - Banco NoSQL para dados de agendamentos e consultas
- **PostgreSQL** - Banco relacional para clínicas e veterinários (via Prisma)

### DevOps e Ferramentas

- **Docker** - Containerização da aplicação
- **Nodemon 3.1.10** - Desenvolvimento com hot-reload
- **Prisma Migrate** - Migrações de banco de dados

---

## 🏗️ Arquitetura

### Backend

O backend segue uma arquitetura **MVC (Model-View-Controller)** organizada:

```
backend/
├── controllers/     # Lógica de negócio
├── models/         # Modelos de dados (MongoDB)
├── routes/         # Definição de rotas
├── services/       # Serviços e integrações
├── middleware/     # Middlewares (auth, errors, etc)
├── utils/          # Utilitários e helpers
├── config/         # Configurações e conexões
└── prisma/         # Schema e migrações (PostgreSQL)
```

### Frontend

O frontend utiliza **componentes React** organizados por funcionalidade:

```
frontend/
├── src/
│   ├── pages/      # Páginas principais
│   ├── components/  # Componentes reutilizáveis
│   ├── api/         # Configuração da API
│   └── utils/       # Utilitários
```

---

## ✨ Funcionalidades

### 🔐 Autenticação e Autorização

- Registro de usuários
- Login com JWT
- Controle de permissões (Admin/Usuário)
- Middleware de autenticação
- Proteção de rotas

### 📅 Agendamentos e Consultas

- Criação de agendamentos
- Listagem ordenada por data (mais próxima primeiro)
- Edição e exclusão de agendamentos
- Visualização de detalhes
- Busca por nome do tutor
- Status de agendamento (Agendada, Cancelada, Realizada)

### 🏥 Gestão de Clínicas

- Cadastro de clínicas veterinárias
- Listagem e visualização
- Edição e exclusão
- Relacionamento com veterinários

### 👨‍⚕️ Gestão de Veterinários

- Cadastro de veterinários
- Vinculação com clínicas
- Gerenciamento de CRMV
- Listagem e busca

### 🐕 Gestão de Animais e Tutores

- Cadastro de tutores
- Cadastro de animais
- Relacionamento tutor-animal
- Histórico e informações completas

### 🤖 Chatbot com IA

- Assistente virtual veterinário
- Integração com OpenAI GPT-3.5-turbo
- Sistema de fallback inteligente
- Perguntas frequentes pré-definidas
- Interface conversacional moderna

---

## 🤖 Inteligência Artificial

### Sistema de IA do Chatbot

O chatbot utiliza uma arquitetura em camadas:

1. **OpenAI GPT-3.5-turbo** (Principal)
   - Respostas contextuais e naturais
   - Entendimento de linguagem natural
   - Conversas fluidas

2. **IA Baseada em Regras** (Fallback)
   - Sistema inteligente de detecção de intenções
   - Respostas pré-definidas para perguntas comuns
   - Funciona mesmo sem conexão com APIs externas

### Funcionalidades do Chatbot

- **Modo com Quota**: Usuário pode digitar livremente, IA responde com GPT
- **Modo sem Quota**: Lista de perguntas frequentes clicáveis
- **Perguntas Disponíveis**:
  - Vômito em pets
  - Diarreia
  - Febre
  - Vacinação
  - Alimentação
  - Cuidados com filhotes
  - Castração
  - Banho e higiene
  - Pulgas e parasitas
  - Obesidade
  - Saúde dental
  - Emergências

### Configuração da IA

A IA é configurada através de variáveis de ambiente:

```env
OPENAI_API_KEY=sua-chave-aqui
```

Quando a quota da OpenAI está disponível, o sistema usa GPT-3.5-turbo. Caso contrário, utiliza o sistema de regras inteligente.

---

## 💾 Bancos de Dados

### MongoDB

Utilizado para dados de agendamentos, consultas e informações relacionadas:

- **Modelos**: Agendamentos, Consultas, Tutores, Animais
- **ODM**: Mongoose
- **Conexão**: MongoDB Atlas (Cloud) ou local

**Modelos principais:**
- `Vet` - Agendamentos e consultas
- `User` - Usuários do sistema

### PostgreSQL

Utilizado para dados relacionais de clínicas e veterinários:

- **ORM**: Prisma
- **Modelos**:
  - `Clinic` - Clínicas veterinárias
  - `Veterinario` - Veterinários vinculados a clínicas

**Schema Prisma:**
```prisma
model Clinic {
  id         Int            @id @default(autoincrement())
  name       String
  address    String?
  email      String
  phone      String?
  vets       Veterinario[]
}

model Veterinario {
  id        Int     @id @default(autoincrement())
  name      String
  email     String
  crmv      String
  clinicId  Int
  clinic    Clinic  @relation(fields: [clinicId], references: [id])
}
```

### Configuração

```env
# MongoDB
DB_URI=mongodb+srv://user:password@cluster.mongodb.net/database

# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5433/database
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- MongoDB (local ou Atlas)
- PostgreSQL (local ou remoto)
- Chave da API OpenAI (opcional, para uso completo do chatbot)

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/medvet.git
cd medvet
```

### Passo 2: Instale as Dependências

```bash
# Instalar dependências do backend e frontend
npm install

# Instalar dependências do frontend
cd frontend
npm install
cd ..
```

### Passo 3: Configure as Variáveis de Ambiente

Crie/edite o arquivo `backend/config/config.env`:

```env
# Servidor
PORT=3000

# MongoDB
DB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/database

# PostgreSQL
DATABASE_URL=postgresql://usuario:senha@localhost:5433/database

# JWT
JWT_SECRET=seu-secret-jwt-aqui
JWT_EXPIRES_TIME=7d

# OpenAI (Opcional)
OPENAI_API_KEY=sua-chave-openai-aqui
```

### Passo 4: Configure o Banco de Dados

```bash
# Gerar Prisma Client
npm run prisma:generate

# Executar migrações do PostgreSQL
npm run prisma:migrate
```

### Passo 5: Inicie os Servidores

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Passo 6: Acesse a Aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api/v1

---

## 📁 Estrutura do Projeto

```
medvet/
├── backend/
│   ├── app.js                    # Servidor Express principal
│   ├── config/
│   │   ├── config.env            # Variáveis de ambiente
│   │   └── dbConnect.js          # Conexão MongoDB
│   ├── controllers/              # Controladores (lógica de negócio)
│   │   ├── authControllers.js
│   │   ├── chatbotController.js
│   │   ├── clinicControllers.js
│   │   ├── vetControllers.js
│   │   └── veterinaryControllers.js
│   ├── middleware/               # Middlewares
│   │   ├── auth.js              # Autenticação JWT
│   │   ├── erros.js             # Tratamento de erros
│   │   ├── isAdmin.js           # Verificação de admin
│   │   └── catchAsyncErrors.js  # Wrapper para async
│   ├── models/                   # Modelos MongoDB
│   │   ├── user.js
│   │   └── vet.js
│   ├── prisma/                   # Prisma (PostgreSQL)
│   │   ├── schema.prisma        # Schema do banco
│   │   ├── migrations/          # Migrações
│   │   └── seed.js              # Seed de dados
│   ├── routes/                   # Rotas da API
│   │   ├── auth.js
│   │   ├── chatbotRoutes.js
│   │   ├── clinicRoutes.js
│   │   ├── vet.js
│   │   └── veterinaryRoutes.js
│   ├── services/                 # Serviços
│   │   ├── chatbotService.js    # Serviço de IA
│   │   ├── clinicService.js
│   │   └── veterinaryService.js
│   └── utils/                    # Utilitários
│       ├── apiFilters.js        # Filtros de API
│       └── errorHandle.js       # Tratamento de erros
│
├── frontend/
│   ├── public/                   # Arquivos públicos
│   └── src/
│       ├── api/
│       │   └── api.js           # Configuração Axios
│       ├── components/          # Componentes React
│       │   ├── layout/         # Header, Footer
│       │   ├── Dashboard.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   └── Register.jsx
│       ├── pages/               # Páginas principais
│       │   ├── Agendamentos/
│       │   ├── Animais/
│       │   ├── Chatbot/
│       │   ├── Clinicas/
│       │   ├── Consultas/
│       │   ├── Medicos/
│       │   ├── Perfil/
│       │   └── Tutores/
│       ├── utils/
│       │   └── auth.js         # Utilitários de autenticação
│       ├── App.js              # Componente principal
│       └── index.js            # Entry point
│
├── docker-compose.yml           # Configuração Docker
├── Dockerfile                    # Dockerfile produção
├── Dockerfile.dev               # Dockerfile desenvolvimento
└── package.json                 # Dependências principais
```

---

## 🔌 API Endpoints

### Autenticação

- `POST /api/v1/register` - Registrar novo usuário
- `POST /api/v1/login` - Login de usuário
- `GET /api/v1/me` - Obter usuário atual
- `PUT /api/v1/me/update` - Atualizar perfil
- `PUT /api/v1/password/update` - Atualizar senha

### Agendamentos/Consultas

- `GET /api/v1/vets` - Listar agendamentos
- `GET /api/v1/vets/:id` - Obter agendamento específico
- `POST /api/v1/vets` - Criar agendamento (Admin)
- `PUT /api/v1/vets/:id` - Atualizar agendamento
- `DELETE /api/v1/vets/:id` - Excluir agendamento

### Clínicas

- `GET /api/v1/clinics` - Listar clínicas
- `GET /api/v1/clinics/:id` - Obter clínica específica
- `POST /api/v1/clinics` - Criar clínica
- `PUT /api/v1/clinics/:id` - Atualizar clínica
- `DELETE /api/v1/clinics/:id` - Excluir clínica

### Veterinários

- `GET /api/v1/veterinaries` - Listar veterinários
- `GET /api/v1/veterinaries/:id` - Obter veterinário específico
- `POST /api/v1/veterinaries` - Criar veterinário
- `PUT /api/v1/veterinaries/:id` - Atualizar veterinário
- `DELETE /api/v1/veterinaries/:id` - Excluir veterinário

### Chatbot

- `POST /api/v1/chatbot` - Enviar mensagem ao chatbot
- `GET /api/v1/chatbot/quota` - Verificar status da quota OpenAI

---

## 📜 Scripts Disponíveis

### Backend

```bash
npm start          # Inicia o servidor em produção
npm run dev        # Inicia o servidor em desenvolvimento (nodemon)
npm run prisma:generate  # Gera o Prisma Client
npm run prisma:migrate   # Executa migrações do PostgreSQL
```

### Frontend

```bash
cd frontend
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Cria build de produção
npm test           # Executa testes
```

---

## 🔒 Segurança

- Autenticação JWT com tokens expiráveis
- Senhas criptografadas com bcryptjs
- Middleware de autenticação em rotas protegidas
- Controle de acesso baseado em roles (Admin/Usuário)
- Validação de dados de entrada
- Tratamento centralizado de erros
- CORS configurado para segurança

---

## 🐳 Docker

O projeto inclui configuração completa do Docker para facilitar o desenvolvimento e deploy. Todos os serviços necessários (backend, MongoDB, PostgreSQL) são containerizados.

### Pré-requisitos

- Docker instalado (versão 20.10 ou superior)
- Docker Compose instalado (versão 2.0 ou superior)

### Estrutura Docker

O projeto utiliza **Docker Compose** com os seguintes serviços:

1. **Backend (Node.js)**
   - Porta: 3000
   - Hot-reload em desenvolvimento
   - Migrações automáticas do Prisma

2. **MongoDB**
   - Porta: 27017
   - Volume persistente para dados
   - Healthcheck configurado

3. **PostgreSQL**
   - Porta: 5432
   - Volume persistente para dados
   - Healthcheck configurado

### Arquivos Docker

- `Dockerfile` - Imagem de produção otimizada
- `Dockerfile.dev` - Imagem de desenvolvimento com nodemon
- `docker-compose.yml` - Configuração para desenvolvimento
- `docker-compose.prod.yml` - Configuração para produção

### Uso Básico

#### Desenvolvimento

```bash
# Iniciar todos os serviços
docker-compose up

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Parar serviços
docker-compose down
```

#### Produção

```bash
# Iniciar em modo produção
docker-compose -f docker-compose.prod.yml up -d

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f

# Parar serviços
docker-compose -f docker-compose.prod.yml down
```

### Configuração de Variáveis de Ambiente

As variáveis de ambiente podem ser configuradas de duas formas:

1. **Arquivo `.env` na raiz do projeto**
2. **Variáveis de ambiente do sistema**

Variáveis importantes para Docker:

```env
# Backend
PORT=3000
NODE_ENV=development  # ou production

# MongoDB (usado dentro do Docker)
DB_URI=mongodb://mongodb:27017/medvet

# PostgreSQL (usado dentro do Docker)
DATABASE_URL=postgresql://postgres:medvet123@postgres:5432/medvet?schema=public

# JWT
JWT_SECRET=seu-secret-jwt
JWT_EXPIRES_TIME=7d

# OpenAI (Opcional)
OPENAI_API_KEY=sua-chave-openai
```

### Comandos Úteis

#### Gerenciamento de Containers

```bash
# Ver status dos containers
docker-compose ps

# Reconstruir imagens
docker-compose build --no-cache

# Parar e remover volumes (apaga dados)
docker-compose down -v

# Reiniciar um serviço específico
docker-compose restart backend
```

#### Executar Comandos nos Containers

```bash
# Acessar shell do backend
docker-compose exec backend sh

# Executar migrações do Prisma
docker-compose exec backend npx prisma migrate deploy --schema=./backend/prisma/schema.prisma

# Gerar Prisma Client
docker-compose exec backend npx prisma generate --schema=./backend/prisma/schema.prisma

# Acessar MongoDB
docker-compose exec mongodb mongosh

# Acessar PostgreSQL
docker-compose exec postgres psql -U postgres -d medvet
```

#### Logs e Debugging

```bash
# Ver logs do backend
docker-compose logs -f backend

# Ver logs de todos os serviços
docker-compose logs -f

# Ver últimas 100 linhas
docker-compose logs --tail=100 backend

# Ver logs do MongoDB
docker-compose logs -f mongodb

# Ver logs do PostgreSQL
docker-compose logs -f postgres
```

### Volumes Docker

Os dados são persistidos em volumes nomeados:

- `mongodb_data` - Dados do MongoDB
- `postgres_data` - Dados do PostgreSQL

**Importante:** Os volumes persistem mesmo após parar os containers. Para remover completamente:

```bash
docker-compose down -v
```

### Rede Docker

Todos os serviços estão na mesma rede Docker (`loja-network`), permitindo comunicação interna entre containers usando os nomes dos serviços:

- `mongodb` - Hostname do MongoDB
- `postgres` - Hostname do PostgreSQL
- `backend` - Hostname do backend

### Healthchecks

Os serviços de banco de dados possuem healthchecks configurados:

- **MongoDB**: Verifica conexão a cada 10 segundos
- **PostgreSQL**: Verifica se está pronto a cada 10 segundos

O backend aguarda os bancos estarem saudáveis antes de iniciar.

### Scripts de Inicialização

O projeto inclui scripts auxiliares:

**Windows:**
```bash
docker-start.bat
```

**Linux/Mac:**
```bash
chmod +x docker-start.sh
./docker-start.sh
```

### Troubleshooting

#### Porta já em uso

Se as portas 3000, 27017 ou 5432 estiverem em uso, altere no `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Mude a porta externa
```

#### Erro de conexão com banco

1. Verifique se os containers estão rodando: `docker-compose ps`
2. Verifique os logs: `docker-compose logs mongodb postgres`
3. Aguarde os healthchecks passarem antes de iniciar o backend

#### Reconstruir tudo do zero

```bash
# Parar e remover tudo
docker-compose down -v

# Remover imagens antigas
docker rmi loja-backend loja-mongodb loja-postgres

# Reconstruir
docker-compose build --no-cache

# Iniciar
docker-compose up
```

#### Limpar sistema Docker

```bash
# Remover containers parados
docker container prune

# Remover volumes não utilizados
docker volume prune

# Remover imagens não utilizadas
docker image prune

# Limpeza completa (cuidado!)
docker system prune -a --volumes
```

### Desenvolvimento com Docker

O `docker-compose.yml` de desenvolvimento inclui:

- **Hot-reload**: Mudanças no código são refletidas automaticamente
- **Volumes montados**: Código local é sincronizado com o container
- **Nodemon**: Reinicia automaticamente o servidor

### Produção com Docker

O `docker-compose.prod.yml` de produção inclui:

- **Build otimizado**: Apenas dependências de produção
- **Sem hot-reload**: Performance otimizada
- **Migrações automáticas**: Prisma executa migrações na inicialização

---

## 📝 Licença

Este projeto é de uso livre para fins educacionais e pode ser adaptado conforme necessidade.

---

## 👨‍💻 Desenvolvido por

**Pedro Gomes de Almeida** e **Matheus de Castro Evangelista**

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório do projeto.

---

**Versão:** 1.0.0  
**Última atualização:** 2024
