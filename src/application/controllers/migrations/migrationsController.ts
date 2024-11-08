import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import connection from "../../../infrastructure/database/connection";
import { FastifyReply, FastifyRequest } from "fastify";
import { MigrationDirection } from "node-pg-migrate/dist/types";

export default async function migrations(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return reply.status(405).send({
      error: `Method "${request.method}" not allowed!`,
    });
  }
  let dbClient;
  try {
    dbClient = await connection.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join(__dirname, "../../../infrastructure/migrations"),
      direction: "up" as MigrationDirection,
      migrationsTable: "pgmigrations",
    };
    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
      return reply.status(200).send(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });
      if (migratedMigrations.length > 0) {
        return reply.status(201).send(migratedMigrations);
      }
      return reply.status(200).send(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}
