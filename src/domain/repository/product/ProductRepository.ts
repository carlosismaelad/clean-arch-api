import { getNewClient } from "../../../infra/database/connection";
import { IRepository } from "../IRepository";
import { Product } from "../../entities/Product";
import { BaseRepository } from "../BaseRepository";

export class ProductRepository
  extends BaseRepository<Product>
  implements IRepository<Product>
{
  async createItem(item: Product): Promise<Product> {
    //
    const client = await getNewClient();
    try {
      const query =
        "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *";
      const values = [item.name, item.description, item.price];
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      await client.end();
    }
  }

  async readAll(): Promise<Product[]> {
    const client = await getNewClient();
    try {
      const query = "SELECT * FROM products WHERE active = true";
      const result = await client.query(query);
      return result.rows; // Retorna todos os produtos
    } finally {
      await client.end();
    }
  }

  async readById(id?: string): Promise<Product> {
    const client = await getNewClient();
    try {
      if (!id) {
        throw new Error("ID deve ser fornecido para a leitura do item.");
      }
      const query = "SELECT * FROM products WHERE id = $1 AND active = true";
      const result = await client.query(query, [id]);
      if (result.rows.length === 0) {
        throw new Error("Produto não encontrado!");
      }
      return result.rows[0]; // Retorna o produto encontrado
    } finally {
      await client.end();
    }
  }

  async update(id: string, item: Product): Promise<Product | null> {
    const client = await getNewClient();
    try {
      const queryCheck =
        "SELECT * FROM products WHERE id = $1 AND active = true";
      const resultCheck = await client.query(queryCheck, [id]);

      if (resultCheck.rows.length === 0) {
        throw new Error("Produto não encontrado para atualização.");
      }

      // Atualizando o produto no banco de dados
      const queryUpdate = `
        UPDATE products
        SET name = $1, price = $2, description = $3
        WHERE id = $4
        RETURNING *`;
      const valuesUpdate = [item.name, item.description, item.price, id];
      const resultUpdate = await client.query(queryUpdate, valuesUpdate);

      return resultUpdate.rows[0]; // Retorna o produto atualizado
    } finally {
      await client.end(); // Fecha a conexão
    }
  }

  async softDelete(id: string): Promise<void> {
    const client = await getNewClient();
    try {
      const queryCheck =
        "SELECT * FROM products WHERE id = $1 AND active = true";
      const resultCheck = await client.query(queryCheck, [id]);

      if (resultCheck.rows.length === 0) {
        throw new Error("Produto não encontrado para deleção.");
      }

      // Apenas "desativa" o produto no banco de dados
      const queryUpdate = `
        UPDATE products
        SET active = false
        WHERE id = $1
        RETURNING *`;
      const valuesUpdate = [id];
      await client.query(queryUpdate, valuesUpdate);
    } finally {
      await client.end();
    }
  }
}
