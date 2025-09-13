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
}

module.exports = new ControllerJogos();
