import prismaClient from "../../prisma/index.js";

class ListAllCommentsService {
	async execute({ product_id }) {
		if (!product_id) {
			throw new Error("Produto não encontrado!");
		}

		const product = await prismaClient.product.findFirst({
			where: {
				id: product_id,
			},
		});

		if (!product) {
			throw new Error("Produto não encontrado!");
		}

		const comments = await prismaClient.comments.findMany({ where: { product_id: product_id } });

		return comments;
	}
}

export { ListAllCommentsService };
