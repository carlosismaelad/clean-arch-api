import "dotenv/config";
import fastify from "fastify";
import registerRoutes from "../routes/v1/registerRoutes";

const server = fastify({ logger: true });

export async function app() {
  await server.register(registerRoutes, { prefix: "api/v1" });

  try {
    const port = process.env.SERVER_PORT
      ? Number(process.env.SERVER_PORT)
      : 5000; // Corrigir a variável de ambiente
    await server.listen({ host: "0.0.0.0", port });
    console.log(`🟢 Server Fastify is running on Port ${port}!`);
  } catch (error) {
    console.log("🔴 Error server fastify: ", error);
  }
}

app();
