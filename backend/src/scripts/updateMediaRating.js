import prismaClient from "../prisma/index.js";

const updateAverageRatings = async () => {
	try {
		// Buscar todos os produtos
		const products = await prismaClient.product.findMany({
			select: {
				id: true,
			},
		});

		for (let product of products) {
			// Buscar todos os comentários para cada produto
			const comments = await prismaClient.comments.findMany({
				where: {
					product_id: product.id,
				},
				select: {
					rating: true,
				},
			});

			// Calcular a média dos ratings
			const totalRatings = comments.reduce((acc, comment) => acc + comment.rating, 0);
			const averageRating = comments.length > 0 ? (totalRatings / comments.length).toFixed(2) : "0.00";

			// Converter a média para número de ponto flutuante
			const averageRatingFloat = parseFloat(averageRating);

			// Atualizar a média de ratings no produto
			await prismaClient.product.update({
				where: {
					id: product.id,
				},
				data: {
					media_rating: averageRatingFloat,
				},
			});

			console.log(`Produto ID ${product.id} atualizado com média de rating ${averageRatingFloat}`);
		}
	} catch (error) {
		console.error("Erro ao atualizar médias de ratings:", error);
	}
};

updateAverageRatings();
