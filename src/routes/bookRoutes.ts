import express from "express";
import cors from "cors";
import multer from "multer";
import { listarLivros, obterLivro, atualizarCapa } from "../controllers/bookControlers.ts";

const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200
}

const upload = multer({
    dest: "./uploads"
});

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

    // Rota para upload de imagens de livro (assumindo uma única imagem chamada "imagem")
    app.put("/uploads/:id", upload.single("imagem"), atualizarCapa);
}