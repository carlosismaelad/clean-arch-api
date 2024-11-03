import { Product } from "core/product/entity/Product";
import IUseCase from "shared/abstractions/IUseCase";
import { IProductProps } from "shared/abstractions/IProductProps";
import { ProductService } from "../services/ProductService";

export class CreateProductUseCase implements IUseCase<IProductProps, Product> {
  constructor(private service: ProductService) {}

  async execute(data: IProductProps): Promise<Product> {
    const product = new Product(data);
    const createdProduct = await this.service.createProduct(product);
    return createdProduct;
  }
}
