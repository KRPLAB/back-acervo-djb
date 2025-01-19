import "dotenv/config";
import { ObjectId } from "mongodb";
import { conectarAoBanco } from "../config/dbconfig.ts";
import { Ibook } from "../types/bookInterface.ts";

// conecta ao banco de dados MongoDB
let client: any;

async function initDatabase() {
    // Verfica se a chave do arquivo .env está definida
    if (!process.env.MONGO_URI) {
        console.error("A variável de ambiente MONGO_URI não está definida.");
        process.exit(1);
    }

    client = await conectarAoBanco(process.env.MONGO_URI);
}

export async function getListaLivros() {
    // seleciona o banco de dados
    const database = client.db("acervo-djb");
    // seleciona a colecao
    const colecao = database.collection("livros");
    // busca e retorna todos os documentos da colecao como um array
    return colecao.find().toArray();
}

export async function getLivroPorID(id: string) {
    const database = client.db("acervo-djb");
    const colecao = database.collection("livros");
    const livro = colecao.findOne({ _id: new ObjectId(id) });
    return livro;
}

export async function atualizaCapa(id: string, livro: any) {
    const database = client.db("acervo-djb");
    const colecao = database.collection("livros");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: livro});
}

export async function removeLivroPorID(id: string) {
    const database = client.db("acervo-djb");
    const colecao = database.collection("livros");
    const objID = new ObjectId(id);
    return colecao.deleteOne({ _id: objID });
}

export async function postaLivro(bookData: Ibook) {
    const database = client.db("acervo-djb");
    const colecao = database.collection("livros");
    return colecao.insertOne(bookData);
}

export async function modificaLivro(id: string, bookData: Ibook) {
    const database = client.db("acervo-djb");
    const colecao = database.collection("livros");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: bookData});
}

initDatabase();