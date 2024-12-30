import express from "express";
import cors from "cors";
import { listarLivros, obterLivro } from "../controllers/bookControlers.ts";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

export const bookRoutes = (app: any) => {
    // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());
    // Autoriza requisições feitas das diferentes origens (domínios) determinadas no objeto corsOptions.
    app.use(cors(corsOptions));

    app.get("/", (req: any, res: any): any => {
        res.send("Olá, server rodando");
    });

    // Rota para buscar todos os livros
    app.get("/livros", listarLivros);

    // Rota para obter um unico livro
    app.get("/livros/:id", obterLivro);
}