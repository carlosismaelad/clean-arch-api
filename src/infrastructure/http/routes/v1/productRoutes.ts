import { handleCreateProduct } from "../../../../application/controllers/v1/product/ProductController";
import { ProductService } from "core/product/services/ProductService";
import { CreateProductUseCase } from "core/product/usecases/CreateProductUseCase";
import { ProductRepositoryPostgres } from "externals/postgres/ProductRepositoryPostgres";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import IProductProps from "shared/abstractions/IProductProps";

export default async function productRoutes(app: FastifyInstance) {
  const productRepository = new ProductRepositoryPostgres();
  const productService = new ProductService(productRepository);
  const createProductUseCase = new CreateProductUseCase(
    productRepository,
    productService,
  );

  app.post(
    "/api/v1/products",
    async (
      request: FastifyRequest<{ Body: IProductProps }>,
      reply: FastifyReply,
    ) => {
      const response = await handleCreateProduct(request, createProductUseCase);
      reply.send(response);
    },
  );
}
