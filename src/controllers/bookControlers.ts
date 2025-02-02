import fs from "fs";
import { atualizaCapa, getListaLivros, getLivroPorID, removeLivroPorID, postaLivro, modificaLivro } from "../models/bookModels.ts";

export async function listarLivros(req: any, res: any) {
    const listaLivros = await getListaLivros();
    res.status(200).json(listaLivros);
}

export async function obterLivro(req: any, res: any) {
    const idLivro: string = req.params.id;
    const livro = await getLivroPorID(idLivro);
    res.status(200).json(livro);
}

export async function removerLivro(req: any, res: any) {
    const idLivro: string = req.params.id;
    const livro = await removeLivroPorID(idLivro);
    res.status(200).json(livro);
}

export async function adicionarLivro(req: any, res: any) {
    const bookData = req.body;
    const post = await postaLivro(bookData);
    res.status(200).json(post);
}

export async function atualizarCapa(req: any, res: any) {
    const id = req.params.id;

    // Obter a extensão original do arquivo
    const mimeType = req.file.mimetype;
    const extensao = mimeType.split("/")[1];

    const imagemAtualizada = `uploads/${id}.${extensao}`;
    const urlImagem = `http://localhost:3000/${id}.${extensao}`;

    try {
        // Renomear o arquivo mantendo a extensão original
        fs.renameSync(req.file.path, imagemAtualizada);

        const livro = {
            capa: urlImagem,
        };

        const livroAtualizado = await atualizaCapa(id, livro);
        res.status(200).json(livroAtualizado);
    } catch (erro: any) {
        console.error(erro.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
}

export async function atualizarLivro(req: any, res: any) {
    const idLivro: string = req.params.id;
    const dadosAtualizados = req.body;
    const put = await modificaLivro(idLivro, dadosAtualizados);
    res.status(200).json(put);
}