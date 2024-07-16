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

		// Update average rating
		await this.updateProductRating(updatedComment.product_id);

		return updatedComment;
	}

	async updateProductRating(product_id) {
		const productComments = await prismaClient.comments.findMany({
			where: { product_id: product_id },
			select: { rating: true },
		});

		const averageRating = productComments.reduce((acc, comment) => acc + comment.rating, 0) / productComments.length;
		const roundedAverageRating = Math.round(averageRating * 100) / 100; // Round to two decimal places

		await prismaClient.product.update({
			where: { id: product_id },
			data: { media_rating: roundedAverageRating },
		});
	}
}

export { UpdateCommentService };
