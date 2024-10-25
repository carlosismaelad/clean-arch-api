import "dotenv/config";
import fastify from "fastify";

const server = fastify({ logger: true });

const app = async () => {
  try {
    server.listen({
      host: "0.0.0.0",
      port: process.env.PORT_SERVER ? Number(process.env.SERVER_PORT) : 5000,
    });
    console.log(`🟢 Server Fastify is running on Port ${5000}!`);
  } catch (error) {
    console.log("Error server fastify: ", error);
  }
};

app();
