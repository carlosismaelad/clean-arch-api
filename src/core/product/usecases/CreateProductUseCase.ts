import { Product } from "core/product/entity/Product";
import IUseCase from "shared/abstractions/IUseCase";
import IProductProps from "shared/abstractions/IProductProps";
import { ProductService } from "../services/ProductService";
import { IProductRepository } from "shared/abstractions/IProductRepository";

export class CreateProductUseCase implements IUseCase<IProductProps, Product> {
  constructor(
    private repository: IProductRepository<Product>,
    private productService: ProductService,
  ) {}

  async execute(data: IProductProps): Promise<Product> {
    this.productService.validateProductFields(data);
    const product = new Product(data);
    const createdProduct = await this.repository.createItem(product);
    return createdProduct;
  }
}
