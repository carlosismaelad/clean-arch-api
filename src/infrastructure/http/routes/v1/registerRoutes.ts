import { FastifyInstance } from "fastify";
import productRoutes from "./productRoutes";
import { rootRoute } from "./rootRoute";
import statusRoute from "./statusRoute";
import migrationsRoutes from "./migrationsRoutes";

export default async function registerRoutes(app: FastifyInstance) {
  await rootRoute(app); // retorna apenas "API ok!"
  await migrationsRoutes(app);
  await statusRoute(app);
  await productRoutes(app);
}
