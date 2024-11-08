import { FastifyInstance } from "fastify";
import migrationRoutes from "./migrationRoutes";
import productRoutes from "./productRoutes";
import { rootRoute } from "./rootRoute";
import statusRoute from "./statusRoute";

export default async function registerRoutes(app: FastifyInstance) {
  await rootRoute(app); // retorna apenas "API ok!"
  await migrationRoutes(app);
  await statusRoute(app);
  await productRoutes(app);
}
