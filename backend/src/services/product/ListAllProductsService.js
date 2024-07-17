import prismaClient from "../../prisma/index.js";

class ListAllProductsService {
	async execute() {
		const products = await prismaClient.product.findMany({
			include: {
				brand: true,
				categories: {
					include: {
						category: true,
					},
				},
				comments: true,
			},
		});
		// Transformar os dados para incluir apenas a categoria e não a tabela intermediária
		const transformedProducts = products.map((product) => ({
			...product,
			categories: product.categories.map((pc) => pc.category),
		}));

		return transformedProducts;
	}
}

export { ListAllProductsService };
