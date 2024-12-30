import express,{ Express } from "express";
import { bookRoutes } from "./routes/bookRoutes.ts";

// Inicializa o servidor Express
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Servindo arquivos estáticos da pasta "uploads"
app.use(express.static("uploads"));

bookRoutes(app);

// Inicia o servidor na porta 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
