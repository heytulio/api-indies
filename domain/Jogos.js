const mongoose = require("mongoose");

const JogoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "O nome do jogo é obrigatório."],
    trim: true,
  },
  ano: {
    type: Number,
    required: [true, "O ano de lançamento é obrigatório."],
    min: [1950, "O ano de lançamento parece ser muito antigo."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Jogo", JogoSchema);
