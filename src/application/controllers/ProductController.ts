import { IProductProps, Product } from "core/product/entity/Product";
import { ProductRepositoryPostgres } from "../../externals/postgres/ProductRepositoryPostgres";
import { FastifyRequest } from "fastify";
import { CreateProductUseCase } from "core/product/usecases/CreateProductUseCase";

const productRepository = new ProductRepositoryPostgres();
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
