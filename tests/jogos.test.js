const request = require("supertest");
const app = require("../app");
const Jogo = require("../domain/Jogos");

describe("API de Jogos", () => {
  describe("GET /jogos/", () => {
    it("deve retornar uma lista vazia quando não há jogos no banco", async () => {
      const response = await request(app).get("/api/jogos/");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it("deve retornar uma lista de todos os jogos", async () => {
      await Jogo.create([
        { nome: "The Legend of Zelda", ano: 1986 },
        { nome: "Super Mario Bros", ano: 1985 },
      ]);

      const response = await request(app).get("/api/jogos/");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);

      const nomes = response.body.map((jogo) => jogo.nome);
      expect(nomes).toContain("The Legend of Zelda");
      expect(nomes).toContain("Super Mario Bros");

      const anos = response.body.map((jogo) => jogo.ano);
      expect(anos).toContain(1985);
    });
  });

  describe("POST /jogos/add", () => {
    it("deve criar um novo jogo com sucesso", async () => {
      const novoJogo = {
        nome: "Chrono Trigger",
        ano: 1995,
      };

      const response = await request(app).post("/api/jogos/add").send(novoJogo);

      expect(response.status).toBe(201);
      expect(response.body.nome).toBe("Chrono Trigger");
      expect(response.body).toHaveProperty("_id");

      const jogoNoBanco = await Jogo.findById(response.body._id);
      expect(jogoNoBanco.nome).toBe("Chrono Trigger");
    });

    it("deve retornar erro 400 ao tentar criar um jogo sem o campo nome", async () => {
      const jogoInvalido = {
        ano: 2023,
      };

      const response = await request(app)
        .post("/api/jogos/add")
        .send(jogoInvalido);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("O nome do jogo é obrigatório.");
    });

    it("deve retornar erro 400 ao tentar criar um jogo sem o campo ano", async () => {
      const jogoInvalido = {
        nome: "Jogo sem ano",
      };

      const response = await request(app)
        .post("/api/jogos/add")
        .send(jogoInvalido);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        "O ano de lançamento é obrigatório."
      );
    });
  });
});
