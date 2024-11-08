import { getNewClient } from "./infrastructure/database/connection.js";
import { app } from "./infrastructure/http/fastify/index.js";

async function startServer() {
  try {
    const client = await getNewClient();
    console.log("🟢 Servidor iniciado!");
  } catch (error) {
    console.log("🔴 Erro ao tentar conexão com o banco de dados: ", error);
    process.exit(1);
  }
  await app;
}

startServer();
