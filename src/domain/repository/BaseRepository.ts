import { IRepository } from "./IRepository";

export class BaseRepository<T extends { id: string }>
  implements IRepository<T>
{
  private db = new Map<string, T>();

  async createItem(item: T): Promise<T> {
    if (this.db.has(item.id)) {
      throw new Error("Item com o ID fornecido já existe!");
    }
    this.db.set(item.id, item);
    return item;
  }

  async readAll(): Promise<T[]> {
    return Array.from(this.db.values());
  }

  async readById(id?: string): Promise<T> {
    if (!id) {
      throw new Error("Id não informado!");
    }
    const item = this.db.get(id);
    if (!item) {
      throw new Error("Item não encontrado!");
    }
    return item;
  }

  async update(id: string, item: T): Promise<T | null> {
    if (!this.db.has(id)) {
      throw new Error("Não foi possível editar este item; Id não localizado.");
    }
    this.db.set(id, item);
    return item;
  }

  async softDelete(id: string): Promise<void> {
    if (!this.db.delete(id)) {
      throw new Error("Não foi possível excluir esse item; Id não localizado.");
    }
  }
}
