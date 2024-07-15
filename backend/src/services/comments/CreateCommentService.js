import prismaClient from "../../prisma/index.js";

class CreateCommentService {
	async execute({ title, rating, description, product_id, user_id, images }) {
		if (!title || !rating || !description || !product_id || !user_id) {
			throw new Error("Todos os campos são obrigatórios");
		}

		const product = await prismaClient.product.findUnique({
			where: { id: product_id },
		});

		if (!product) {
			throw new Error("Produto não encontrado");
		}

		const user = await prismaClient.user.findUnique({
			where: { id: user_id },
		});

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const comment = await prismaClient.comments.create({
			data: {
				title,
				rating,
				description,
				product_id,
				user_id,
				images,
			},
			select: {
				id: true,
				title: true,
				rating: true,
				description: true,
				images: true,
				product_id: true,
				user_id: true,
			},
		});

		return comment;
	}
}

export { CreateCommentService };
