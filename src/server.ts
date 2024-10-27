import { getNewClient } from "../src/infra/database/connection.js";
import "dotenv/config";

const server = "./infra/http/fastify";

async function startServer() {
  try {
    const client = await getNewClient();
    console.log("Servidor iniciando...");
  } catch (error) {
    console.log("Erro ao tentar conexão com o banco de dados: ", error);
    process.exit(1);
  }
  require(server);
}

startServer();
