const Jogo = require("../domain/Jogos");

class ControllerJogos {
  async getJogos(req, res) {
    try {
      const todosOsJogos = await Jogo.find();
      res.status(200).json(todosOsJogos);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro ao buscar os jogos.", erro: error.message });
    }
  }
  async addJogo(req, res) {
    try {
      const { nome, ano } = req.body;

      if (!nome || !ano) {
        return res
          .status(400)
          .json({ mensagem: 'Os campos "nome" e "ano" são obrigatórios.' });
      }

      const novoJogo = { nome, ano };
      const jogoAdicionado = await Jogo.create(novoJogo);

      res.status(201).json({
        mensagem: "Jogo adicionado com sucesso!",
        jogo: jogoAdicionado,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ mensagem: "Erro de validação.", erros: error.errors });
      }
      res
        .status(500)
        .json({ mensagem: "Erro ao adicionar o jogo.", erro: error.message });
    }
  }
}

module.exports = new ControllerJogos();
