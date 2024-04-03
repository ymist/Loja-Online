import prismaClient from "../../prisma/index.js";

class CreateProductService {
	async execute({
		name,
		price,
		description,
		stock,
		banner,
		category_id,
		sku,
		brand_id,
	}) {
		const findProduct = await prismaClient.product.findFirst({
			where: {
				SKU: sku,
			},
		});

		if (findProduct) {
			throw new Error("Já existe esse produto cadastrado com esse SKU!");
		}

		const product = await prismaClient.product.create({
			data: {
				name: name,
				SKU: sku,
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
				SKU: true,
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
