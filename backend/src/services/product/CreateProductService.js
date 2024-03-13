import prismaClient from "../../prisma/index.js";

class CreateProductService {
	async execute({
		name,
		price,
		description,
		stock,
		banner,
		category_id,
		brand_id,
		user_id,
	}) {
		const user = await prismaClient.user.findUnique({
			where: {
				id: user_id,
				is_admin: true,
			},
		});

		if (!user) {
			throw new Error("Voce nao tem credencias para criar um produto!!!");
		}
		const product = await prismaClient.product.create({
			data: {
				name: name,
				price: price,
				description: description,
				stock: stock,
				banner: { set: banner },
				category_id: category_id,
				brand_id: brand_id,
			},
			select: {
				id: true,
				name: true,
				price: true,
				description: true,
				banner: true,
				stock: true,
				brand_id: true,
				category_id: true,
			},
		});

		return product;
	}
}

export { CreateProductService };
