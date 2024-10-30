import "dotenv/config";
import fastify from "fastify";

const server = fastify({ logger: true });

const app = async () => {
  server.get("/", async (request, response) => {
    return "API ok!";
  });
  try {
    server.listen({
      host: "0.0.0.0",
      port: process.env.PORT_SERVER ? Number(process.env.SERVER_PORT) : 5000,
    });
    console.log(
      `🟢 Server Fastify is running on Port ${process.env.SERVER_PORT}!`,
    );
  } catch (error) {
    console.log("Error server fastify: ", error);
  }
};

app();
