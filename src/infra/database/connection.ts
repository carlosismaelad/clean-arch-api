import { Client, ClientConfig, QueryConfig, QueryResult } from "pg";

async function query(
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

async function getNewClient(): Promise<Client> {
  const clientConfig: ClientConfig = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  };
  const client = new Client(clientConfig);
  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};

function getSSLValues(): boolean | { ca: string } {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}
