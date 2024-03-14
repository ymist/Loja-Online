import prismaClient from "../../prisma/index.js";

class ListAllProductsService {
	async execute() {
		const products = await prismaClient.product.findMany();
		return products;
	}
}

export { ListAllProductsService };
