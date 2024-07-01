import prismaClient from "../../prisma/index.js";
import fs from "fs";
import path from "path";

class EditProductService {
	async execute({
		name,
		price,
		description,
		stock,
		banner,
		categories, // Array of category IDs
		brand_id,
		product_id,
		SKU,
	}) {
		const existingProductWithSameSKU = await prismaClient.product.findFirst({
			where: {
				NOT: {
					id: product_id, // Excluir o próprio produto da verificação
				},
				SKU: SKU,
			},
		});

		if (existingProductWithSameSKU) {
			throw new Error("SKU já está cadastrado no sistema!");
		}

		const oldProduct = await prismaClient.product.findUnique({
			where: { id: product_id },
			select: { banner: true, categories: true },
		});

		// Remove as imagens da pasta tmp_products que não estão presentes no conjunto de imagens enviadas
		const imagesToRemove = oldProduct?.banner.filter((image) => !banner.includes(image));
		imagesToRemove.forEach((image) => {
			const imagePath = path.resolve("./tmp_products", image);
			fs.unlinkSync(imagePath);
		});

		// Atualiza o produto
		const updatedProduct = await prismaClient.product.update({
			where: { id: product_id },
			data: {
				name,
				price,
				description,
				stock,
				banner: { set: banner },
				brand_id,
				SKU,
			},
			select: {
				id: true,
				name: true,
				description: true,
				banner: true,
				stock: true,
				brand_id: true,
				SKU: true,
			},
		});

		// Busca categorias atuais do produto
		const currentProductCategories = await prismaClient.productCategory.findMany({
			where: { product_id: product_id },
			select: { category_id: true },
		});

		const currentCategoryIds = currentProductCategories.map((pc) => pc.category_id);

		// Categorias a serem removidas
		const categoriesToRemove = currentCategoryIds.filter((category_id) => !categories.includes(category_id));

		// Categorias a serem adicionadas
		const categoriesToAdd = categories.filter((category_id) => !currentCategoryIds.includes(category_id));

		// Remove as categorias que não estão mais presentes
		if (categoriesToRemove.length > 0) {
			await prismaClient.productCategory.deleteMany({
				where: {
					product_id: product_id,
					category_id: { in: categoriesToRemove },
				},
			});
		}

		// Adiciona novas categorias
		if (categoriesToAdd.length > 0) {
			await prismaClient.productCategory.createMany({
				data: categoriesToAdd.map((category_id) => ({
					product_id: product_id,
					category_id: category_id,
				})),
			});
		}

		return updatedProduct;
	}
}

export { EditProductService };
