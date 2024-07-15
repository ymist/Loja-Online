import prismaClient from "../../prisma/index.js";

class UpdateCommentService {
	async execute({ id, title, rating, description, images }) {
		if (!id || !title || !rating || !description) {
			throw new Error("Todos os campos são obrigatórios");
		}

		const comment = await prismaClient.comments.findUnique({
			where: { id: id },
		});

		if (!comment) {
			throw new Error("Comentário não encontrado");
		}

		const updatedComment = await prismaClient.comments.update({
			where: { id: id },
			data: {
				title,
				rating,
				description,
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

		return updatedComment;
	}
}

export { UpdateCommentService };
