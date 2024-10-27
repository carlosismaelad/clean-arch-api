import { getNewClient } from "../src/infra/database/connection.js";
import "dotenv/config";

const fastify = "./infra/http/ports/fastify";
const express = "./infra/http/ports/express";
const server = process.env.SERVER_TYPE === "fastify" ? fastify : express;

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
