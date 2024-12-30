import "dotenv/config";
import { ObjectId } from "mongodb";
import { conectarAoBanco } from "../config/dbconfig.ts";

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
    console.log(id);
    const livro = colecao.findOne({ _id: new ObjectId(id) });
    return livro;
}

initDatabase();