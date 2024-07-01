import prismaClient from "../../prisma/index.js";

class ListByCategoryService {
	async execute(categories) {
		const categoryIds = categories.map((category) => category.id);

		const products = await prismaClient.product.findMany({
			where: {
				categories: {
					some: {
						category_id: {
							in: categoryIds,
						},
					},
				},
			},
			include: {
				categories: {
					include: {
						category: true,
					},
				},
			},
		});

		// Transformar a resposta para que a lista de categorias seja retornada diretamente
		const transformedProducts = products.map((product) => ({
			...product,
			categories: product.categories.map((pc) => pc.category),
		}));

		return transformedProducts;
	}
}

export { ListByCategoryService };
