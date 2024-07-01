import prismaClient from "../../prisma/index.js";

class CreateProductService {
	async execute({ name, price, description, stock, banner, categories, sku, brand_id }) {
		const findProduct = await prismaClient.product.findFirst({
			where: {
				SKU: sku,
			},
		});

		if (findProduct) {
			return { error: "Ja existe um produto com esse SKU!" };
		}

		const product = await prismaClient.product.create({
			data: {
				name: name,
				SKU: sku,
				price: price,
				description: description,
				stock: stock,
				banner: { set: banner },
				brand_id: brand_id,
				categories,
			},
			select: {
				id: true,
			},
		});
		// Criar as associações ProductCategory
		const productCategories = categories.map((category) => ({
			product_id: product.id,
			category_id: category.id,
		}));

		await prismaClient.productCategory.createMany({
			data: productCategories,
		});

		const productWithCategories = await prismaClient.product.findUnique({
			where: { id: product.id },
			select: {
				id: true,
				name: true,
				SKU: true,
				price: true,
				description: true,
				banner: true,
				stock: true,
				brand_id: true,
				categories: true,
			},
		});

		console.log(productWithCategories);

		return productWithCategories;
	}
}

export { CreateProductService };
