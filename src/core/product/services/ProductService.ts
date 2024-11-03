import { Product } from "core/product/entity/Product";
import { IProductRepository } from "shared/abstractions/IProductRepository";
import { IProductProps } from "shared/abstractions/IProductProps";
import formatsToBrazilianLocalDate from "../../../utils/formatsToBrazilianLocalDateTime";

export class ProductService {
  constructor(private repository: IProductRepository<Product>) {}

  validateProductFields(data: IProductProps): void {
    if (!data.name) {
      throw new Error("Nome do produto é obrigatório.");
    }
    if (!data.description) {
      throw new Error("Descrição do produto é obrigatória.");
    }
    if (data.price === undefined || data.price < 0) {
      throw new Error("Preço do produto deve ser maior ou igual a zero.");
    }
  }

  async createProduct(data: IProductProps): Promise<Product> {
    this.validateProductFields(data);

    const product = new Product(data);
    product.createdAt = formatsToBrazilianLocalDate();

    return await this.repository.createItem(product);
  }

  async updateProduct(product: Product, data: IProductProps): Promise<Product> {
    this.validateProductFields(data);

    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.updatedAt = formatsToBrazilianLocalDate();

    await this.repository.update(product._id, product);

    return product;
  }

  activateProduct(product: Product): void {
    if (product.active) {
      throw new Error("O produto já está ativo.");
    }

    product.activate();
    product.updatedAt = formatsToBrazilianLocalDate();
  }

  async deactivateProduct(id: string, product: Product): Promise<void> {
    if (!product.active) {
      throw new Error("O produto já está desativado.");
    }

    product.deactivate();
    product.updatedAt = formatsToBrazilianLocalDate();

    await this.repository.deactivate(id);
  }
}
