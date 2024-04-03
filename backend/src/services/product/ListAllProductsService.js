import prismaClient from "../../prisma/index.js";

class ListAllProductsService {
	async execute() {
		const products = await prismaClient.product.findMany({
			include: {
				brand: true,
				category: true,
			},
		});
		return products;
	}
}

export { ListAllProductsService };
