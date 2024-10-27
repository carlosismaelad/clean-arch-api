import { Client, ClientConfig, QueryConfig, QueryResult } from "pg";
import "dotenv/config";

export async function query(
  queryObject: string | QueryConfig<any>,
): Promise<QueryResult<any>> {
  let client: Client | undefined;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client?.end();
  }
}

export async function getNewClient(): Promise<Client> {
  const clientConfig: ClientConfig = {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    database: process.env.PG_DB,
    password: process.env.PG_PASS,
    ssl: getSSLValues(),
  };
  const client = new Client(clientConfig);
  await client.connect();
  return client;
}

function getSSLValues(): boolean | { ca: string } {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
