import express from "express";
import { MongoClient } from "mongodb";
import "dotenv/config";

// Inicializa o servidor Express
const app = express();
const port = process.env.PORT || 3000;

// Servindo arquivos estáticos da pasta "uploads"
app.use(express.static("uploads"));

// Verficação se a chave do arquivo .env está definida
if (!process.env.MONGO_URI) {
    console.error("A variável de ambiente MONGO_URI não está definida.");
    process.exit(1);
}

const client = new MongoClient(process.env.MONGO_URI);

app.get("/livros", async (req, res) => {
    try {
        await client.connect();
        // Seleciona o banco de dados e a colecao
        const db = client.db("acervo-djb");
        const collection = db.collection("livros");
        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar livros");
    } finally {
        await client.close();
    }
});

app.get("/", (req, res) => {
    res.send("Olá, server rodando");
});

// Inicia o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
