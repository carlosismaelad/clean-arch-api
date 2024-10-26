export interface IRepository<T> {
  createItem(item: T): Promise<T>;
  read(id?: string): Promise<T | T[]>;
  update(id: string, item: T): Promise<T | null>;
  softDelete(id: string): Promise<void>;
}
