# API REST de Jogos

Esta é uma API REST simples para gerenciar uma coleção de jogos indies, desenvolvida com Node.js e Express, API desenvolvida para a atividade de Gestão de Configuração II.

## Funcionalidades

* `GET /api/jogos`: Retorna uma lista com todos os jogos.

## Como Executar a API

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 14 ou superior)
* [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

### Passos para Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/heytulio/api-jogos.git
    cd api-jogos
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o .env baseado no exemplo:**
    ```bash
    cp .env.example .env
    ```

4.  **Inicie o servidor:**
    ```bash
    npm start
    ```

O servidor estará rodando em `http://localhost:8080` ou na `porta especificada no .env` .

### Testando os Endpoints

Você pode usar ferramentas como [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/) ou `curl` para testar.

* **GET - Obter todos os jogos:**
    ```bash
    curl http://localhost:8080/api/jogos
    ```