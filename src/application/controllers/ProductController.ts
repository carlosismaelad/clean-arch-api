import { FastifyRequest } from "fastify";
import IProductProps from "../../shared/abstractions/IProductProps";
import { CreateProductUseCase } from "core/product/usecases/CreateProductUseCase";

async function handleCreateProduct(
  request: FastifyRequest<{ Body: IProductProps }>,
  createdProductUseCase: CreateProductUseCase,
) {
  const productData: IProductProps = request.body;
  return createdProductUseCase.execute(productData);
}

export { handleCreateProduct };
