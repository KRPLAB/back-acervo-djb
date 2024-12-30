import { getListaLivros, getLivroPorID } from "../models/bookModels.ts";

export async function listarLivros(req: any, res: any) {
    const listaLivros = await getListaLivros();
    res.status(200).json(listaLivros);
}

export async function obterLivro(req: any, res: any) {
    const idLivro: string = req.params.id;
    const livro = await getLivroPorID(idLivro);
    res.status(200).json(livro);
}