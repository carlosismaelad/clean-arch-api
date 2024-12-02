import { FastifyInstance } from "fastify";
import status from "../../../../application/controllers/v1/status/statusController"; // Ajuste o caminho conforme necessário

export default async function statusRoute(app: FastifyInstance) {
  app.get("/api/v1/status", async (request, reply) => {
    return status(request, reply);
  });
}
