import { IProductProps, Product } from "domain/entities/Product";
import { ProductRepository } from "domain/repository/product/ProductRepository";
import { FastifyRequest } from "fastify";
import { CreateProductUseCase } from "usecases/product-usecases/CreateProductUseCase";

const productRepository = new ProductRepository();
const createProductUseCase = new CreateProductUseCase(productRepository);

async function handleCreateProduct(
  request: FastifyRequest<{ Body: IProductProps }>,
) {
  const productData: IProductProps = request.body;
  const product = new Product(productData);
  const createdProduct = await createProductUseCase.execute(product);
  return createdProduct;
}

export { handleCreateProduct };
