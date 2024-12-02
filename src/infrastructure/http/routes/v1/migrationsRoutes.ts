import { FastifyInstance } from "fastify";
import migrations from "../../../../application/controllers/v1/migrations/migrationsController"; // Ajuste o caminho conforme necessário

export default async function migrationsRoutes(app: FastifyInstance) {
  app.all("/api/v1/migrations", async (request, reply) => {
    return migrations(request, reply);
  });
}
