import express from "express";

// Inicializa o servidor Express
const app = express();
const port = process.env.PORT || 3000;

// Servindo arquivos estáticos da pasta "uploads"
app.use(express.static("uploads"));

app.get("/", (req, res) => {
    res.send("Olá, server rodando");
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
