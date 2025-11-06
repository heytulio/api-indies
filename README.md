# API REST de Jogos

Esta é uma API REST simples para gerenciar uma coleção de jogos indies, desenvolvida com Node.js e Express, API desenvolvida para a atividade de Gestão de Configuração II.

## Funcionalidades

- `GET /api/jogos`: Retorna uma lista com todos os jogos.

## Como Executar a API

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

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

- **GET - Obter todos os jogos:**
  ```bash
  curl http://localhost:8080/api/jogos
  ```
- **POST - Inserir um novo jogo:**
  ```bash
  curl -X POST http://localhost:8080/api/jogos \
  -H "Content-Type: application/json" \
  -d '{
        "nome": "Hollow Knight: Silksong",
        "ano": 2025
      }'
  ```

---

## Workflow de Desenvolvimento (Git)

Para este projeto, optei por utilizar o **GitHub Flow**.

### Por que o GitHub Flow?

O **GitHub Flow** é um workflow simples onde temos poucas branches para gerir e para um problema como uma criação de uma API pequena como essa é o workflow ideal para se utilizar, temos poucas branches a seguir e o metodo de implementação para atingir o CI é fácild e fazer. As principais razões para a escolha foram:

1.  **Simplicidade:** É um modelo muito mais simples que o GitFlow. A regra principal é que a branch `main` deve estar sempre em um estado "deployable" (pronta para ir para produção).
2.  **Clareza:** Toda nova feature, bugfix ou melhoria é desenvolvida em sua própria branch descritiva (como `feature-indies_post`), criada a partir da `main`. Isso mantém o trabalho isolado e fácil de rastrear.
3.  **Foco em Pull Requests (PRs):** O trabalho só é mesclado de volta na `main` através de um Pull Request. Isso incentiva a revisão de código (code review) e a discussão sobre as mudanças, garantindo a qualidade do código que entra na base principal.
4.  **Agilidade:** Permite que as features sejam integradas à `main` assim que estiverem prontas, sem a necessidade de esperar por uma "release" formal, o que acelera o ciclo de desenvolvimento.

Para este projeto, a branch `main` continha apenas o gitignore. E a cada nova funcionalidade (`GET /api/jogos`) e (`POST /api/jogos/add`) foi desenvolvida em uma branch `feature` e, após finalizada e testada, seria integrada à `main` via Pull Request.

```eof

```
