# API REST de Jogos Indies

[![Docker Hub](https://img.shields.io/docker/pulls/troot0/api-indies?logo=docker)](https://hub.docker.com/r/troot0/api-indies)
[![CI/CD](https://github.com/heytulio/api-indies/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/heytulio/api-indies/actions)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-7.0-green?logo=mongodb)](https://www.mongodb.com/)

API REST para gerenciamento de jogos indies desenvolvida com Node.js, Express e MongoDB. Criada para a disciplina de Gestão de Configuração II.

**🐳 Imagem Docker:** [hub.docker.com/r/troot0/api-indies](https://hub.docker.com/r/troot0/api-indies)

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Rotas da API](#-rotas-da-api)
- [Como Executar](#-como-executar)
  - [Com Docker (Recomendado)](#com-docker-recomendado)
  - [Sem Docker (Local)](#sem-docker-local)
- [Testando os Endpoints](#-testando-os-endpoints)
- [Workflow de Desenvolvimento](#-workflow-de-desenvolvimento-git)
- [CI/CD](#-cicd)
- [Tecnologias](#-tecnologias)

---

## ✨ Funcionalidades

- ✅ Listagem de jogos indies
- ✅ Cadastro de novos jogos
- ✅ Persistência com MongoDB
- ✅ Containerização com Docker
- ✅ CI/CD com GitHub Actions
- ✅ Imagem publicada no Docker Hub

---

## 🛣️ Rotas da API

### Base URL

```
http://localhost:8080/api
```

### Endpoints

| Método | Rota                | Descrição                          | Body                                                       |
| ------ | ------------------- | ---------------------------------- | ---------------------------------------------------------- |
| `GET`  | `/api/jogos`        | Retorna todos os jogos cadastrados | -                                                          |
| `POST` | `/api/jogos/add`    | Adiciona um novo jogo              | `{ "nome": "string", "ano": number, "criador": "string" }` |
| `POST` | `/api/jogos/delete` | Deleta um jogo                     | `{ "id: "string" }`                                        |

### Exemplos de Resposta

**GET /api/jogos**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "nome": "Celeste",
    "ano": 2018,
    "criador": "Maddy Makes Games",
    "dataCriacao": "2025-12-03T00:00:00.000Z"
  },
  {
    "_id": "507f191e810c19729de860ea",
    "nome": "Hollow Knight",
    "ano": 2017,
    "criador": "Team Cherry",
    "dataCriacao": "2025-12-03T00:00:00.000Z"
  }
]
```

**POST /api/jogos/add**

```json
{
  "_id": "507f191e810c19729de860eb",
  "nome": "Stardew Valley",
  "ano": 2016,
  "criador": "ConcernedApe",
  "dataCriacao": "2025-12-03T00:00:00.000Z"
}
```

**POST /api/jogos/delete**

```json
{
  "_id": "507f191e810c19729de860eb"
}
```

---

## 🚀 Como Executar

### Com Docker (Recomendado)

#### Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/heytulio/api-indies.git
   cd api-indies
   ```

2. **Configure as variáveis de ambiente:**

   ```bash
   cp .env.example .env
   ```

3. **Inicie os containers:**

   ```bash
   docker-compose up -d
   ```

4. **Verifique os logs:**

   ```bash
   docker-compose logs -f app
   ```

5. **Acesse a API:**
   ```
   http://localhost:8080/api/jogos
   ```

#### Comandos Úteis

```bash
# Parar containers
docker-compose down

# Reconstruir imagens
docker-compose up --build

# Ver status dos containers
docker-compose ps

# Acessar logs do MongoDB
docker-compose logs -f mongodb

# Limpar volumes (CUIDADO: apaga dados)
docker-compose down -v
```

### Sem Docker (Local)

#### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) instalado e rodando
- npm (vem com Node.js)

#### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/heytulio/api-indies.git
   cd api-indies
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o .env:**

   ```bash
   cp .env.example .env
   # Edite .env e configure DATABASE_URL=mongodb://localhost:27017/api-indies
   ```

4. **Inicie o MongoDB:**

   ```bash
   mongod
   ```

5. **Inicie o servidor:**
   ```bash
   npm start
   ```

O servidor estará rodando em `http://localhost:8080`.

---

## 🧪 Testando os Endpoints

Você pode usar [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou `curl`:

### GET - Listar todos os jogos

```bash
curl http://localhost:8080/api/jogos
```

### POST - Adicionar um novo jogo

```bash
curl -X POST http://localhost:8080/api/jogos/add \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Hollow Knight: Silksong",
    "ano": 2025,
    "criador": "Team Cherry"
  }'
```

---

## 🔄 Workflow de Desenvolvimento (Git)

Este projeto utiliza o **GitHub Flow** como estratégia de versionamento.

### Por que o GitHub Flow?

O GitHub Flow é ideal para projetos pequenos e ágeis como esta API. As principais razões:

1. **Simplicidade:** Branch `main` sempre deployable (pronta para produção)
2. **Clareza:** Cada feature/bugfix em branch descritiva (`feature-nome`, `fix-nome`)
3. **Foco em Pull Requests:** Code review obrigatório antes do merge
4. **Agilidade:** Features integradas rapidamente sem esperar releases formais

### Fluxo de Trabalho

```
main (protegida)
  │
  ├── feature-get-jogos → PR → merge
  │
  ├── feature-post-jogos → PR → merge
  │
  └── feature... → PR → merge
```

1. Criar branch a partir de `main`
2. Desenvolver e testar localmente
3. Abrir Pull Request
4. Code review e aprovação
5. Merge para `main`
6. CI/CD automaticamente faz build e deploy

---

## 🤖 CI/CD

Pipeline automatizado com **GitHub Actions** executando:

### Jobs do Pipeline

1. **Linter** - ESLint e Prettier
2. **Tests** - Testes unitários e cobertura
3. **Build Image** - Construção da imagem Docker
4. **Publish** - Publicação no Docker Hub (apenas em push para `main`)
5. **Deploy** - Verificação da imagem publicada

### Badges de Status

[![CI/CD](https://github.com/heytulio/api-indies/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/heytulio/api-indies/actions)

O workflow roda automaticamente a cada push e pull request.

---

## 🛠️ Tecnologias

| Tecnologia                                         | Versão | Descrição                  |
| -------------------------------------------------- | ------ | -------------------------- |
| [Node.js](https://nodejs.org/)                     | 18+    | Runtime JavaScript         |
| [Express](https://expressjs.com/)                  | 4.x    | Framework web              |
| [MongoDB](https://www.mongodb.com/)                | 6.0    | Banco de dados NoSQL       |
| [Mongoose](https://mongoosejs.com/)                | 7.x    | ODM para MongoDB           |
| [Docker](https://www.docker.com/)                  | -      | Containerização            |
| [Docker Compose](https://docs.docker.com/compose/) | -      | Orquestração de containers |

### Estrutura do Projeto

```
api-indies/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline CI/CD
├── server.js                   # Aplicação principal
├── Dockerfile                  # Build da imagem
├── docker-compose.yml          # Orquestração
├── package.json                # Dependências
├── .env.example                # Template de variáveis
├── .gitignore
└── README.md
```

---

## 📦 Usando a Imagem Docker

Você pode usar a imagem publicada diretamente do Docker Hub:

```bash
docker pull heytulio/api-indies:latest

docker run -p 8080:8080 \
  -e DATABASE_URL=mongodb://host.docker.internal:27017/api-indies \
  heytulio/api-indies:latest
```

Ou no `docker-compose.yml`:

```yaml
services:
  app:
    image: heytulio/api-indies:latest
    ports:
      - '8080:8080'
    environment:
      DATABASE_URL: mongodb://mongodb:27017/api-indies
```
