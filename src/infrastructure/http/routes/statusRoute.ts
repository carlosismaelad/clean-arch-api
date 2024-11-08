import { FastifyInstance } from "fastify";
import status from "../../../application/controllers/status/statusController"; // Ajuste o caminho conforme necessário

export default async function statusRoute(app: FastifyInstance) {
  app.get("/status", async (request, reply) => {
    return status(request, reply);
  });
}
