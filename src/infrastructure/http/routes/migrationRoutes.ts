import { FastifyInstance } from "fastify";
import migrations from "../../../application/controllers/migrations/migrationsController"; // Ajuste o caminho conforme necessário

export default async function migrationRoutes(app: FastifyInstance) {
  app.get("/migrations", async (request, reply) => {
    return migrations(request, reply);
  });

  app.post("/migrations", async (request, reply) => {
    return migrations(request, reply);
  });
}
