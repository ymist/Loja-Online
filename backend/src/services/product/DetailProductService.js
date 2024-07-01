import prismaClient from "../../prisma/index.js";

export class DetailProductService {
	async execute({ id }) {
		const product = await prismaClient.product.findFirst({
			where: {
				id: id,
			},
			include: {
				brand: true,
				categories: {
					include: {
						category: true,
					},
				},
			},
		});

		if (!product) {
			return { error: "Produto Nao Encontrado!" };
		}

		// Transformar os dados para incluir apenas a categoria e não a tabela intermediária
		const transformedProduct = {
			...product,
			categories: product.categories.map((pc) => pc.category),
		};

		return transformedProduct;
	}
}
