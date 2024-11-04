export interface IProductRepository<T> {
  createItem(item: T): Promise<T>;
  readAll(): Promise<T[]>;
  readById(id?: string): Promise<T>;
  update(id: string, item: T): Promise<T | null>;
  deactivate(id: string): Promise<void>;
}
