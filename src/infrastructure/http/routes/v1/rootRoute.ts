import { FastifyInstance } from "fastify";

export async function rootRoute(app: FastifyInstance) {
  app.get("/", async () => {
    return { message: "API ok!" };
  });
}
