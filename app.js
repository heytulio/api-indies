require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mainRouter = require("./routes/router");

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB com sucesso!"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use(express.json());

app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
