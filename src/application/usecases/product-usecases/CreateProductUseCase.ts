import { Product } from "domain/entities/Product";
import { ProductRepository } from "domain/repository/product/ProductRepository";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(product: Product): Promise<Product> {
    return await this.productRepository.createItem(product);
  }
}
