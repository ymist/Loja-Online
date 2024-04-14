import prismaClient from "../../prisma/index.js";

export class DetailProductService {
	async execute({ product_id }) {
		const product = await prismaClient.product.findFirst({
			where: {
				id: product_id,
			},
		});
		if (!product) {
			return { error: "Produto Nao Encontrado!" };
		}

		return product;
	}
}
