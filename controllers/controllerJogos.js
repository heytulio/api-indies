const Jogo = require("../domain/Jogos");

class ControllerJogos {
  async getJogos(req, res) {
    try {
      const todosOsJogos = await Jogo.find().sort({ nome: 1 });
      res.status(200).json(todosOsJogos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar os jogos.", error: error.message });
    }
  }

  async addJogo(req, res) {
    try {
      const { nome, ano } = req.body;

      if (!nome) {
        return res
          .status(400)
          .json({ message: "O nome do jogo é obrigatório." });
      }

      if (!ano) {
        return res
          .status(400)
          .json({ message: "O ano de lançamento é obrigatório." });
      }

      const novoJogo = await Jogo.create({ nome, ano });

      // Retorna direto o objeto criado (o que os testes estão validando)
      res.status(201).json(novoJogo);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ message: "Erro de validação.", errors: error.errors });
      }

      res
        .status(500)
        .json({ message: "Erro ao adicionar o jogo.", error: error.message });
    }
  }
}

module.exports = new ControllerJogos();
