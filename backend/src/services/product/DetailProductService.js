import prismaClient from "../../prisma/index.js";

export class DetailProductService {
	async execute({ id }) {
		// Passo 1: Buscar o produto com os comentários
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
				comments: true, // Incluir todos os comentários do produto
			},
		});

		if (!product) {
			return { error: "Produto Não Encontrado!" };
		}

		// Passo 2: Coletar todos os user_ids dos comentários do produto
		const userIds = product.comments.map((comment) => comment.user_id);

		// Passo 3: Buscar todos os usuários associados aos user_ids dos comentários
		const users = await prismaClient.user.findMany({
			where: {
				id: {
					in: userIds,
				},
			},
			select: {
				id: true,
				name: true,
			},
		});

		// Passo 4: Transformar os comentários para incluir o nome do usuário
		const transformedProduct = {
			...product,
			categories: product.categories.map((pc) => pc.category),
			comments: product.comments.map((comment) => ({
				...comment,
				user_name: users.find((user) => user.id === comment.user_id)?.name || "Usuário não encontrado", // Procura o nome do usuário pelo id do comentário
			})),
		};

		return transformedProduct;
	}
}
