import prismaClient from "../../prisma/index.js";

export class DetailProductService {
	async execute({ id }) {
		const product = await prismaClient.product.findFirst({
			where: {
				id: id,
			},
			include: {
				brand: true,
				category: true,
			},
		});
		if (!product) {
			return { error: "Produto Nao Encontrado!" };
		}

		return product;
	}
}
