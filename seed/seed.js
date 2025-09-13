require("dotenv").config();
const mongoose = require("mongoose");
const Jogo = require("../domain/Jogos");

const jogosIndie = [
  { nome: "Stardew Valley", ano: 2016 },
  { nome: "Hollow Knight", ano: 2017 },
  { nome: "Celeste", ano: 2018 },
  { nome: "Undertale", ano: 2015 },
  { nome: "Hades", ano: 2020 },
  { nome: "Cuphead", ano: 2017 },
  { nome: "Shovel Knight", ano: 2014 },
  { nome: "Outer Wilds", ano: 2019 },
];

const MONGO_URI = process.env.MONGO_URI;

const seedDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado ao MongoDB para o seeding...");
    await Jogo.deleteMany({});
    console.log("Coleção de jogos limpa.");
    await Jogo.insertMany(jogosIndie);
    console.log("Banco de dados populado com sucesso com jogos indie!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    mongoose.connection.close();
    console.log("Conexão com o MongoDB fechada.");
  }
};

seedDB();
