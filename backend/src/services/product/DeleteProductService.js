import prismaClient from "../../prisma/index.js";
import path from "path";
import fs from "fs";

export class DeleteProductService {
	async execute({ product_id }) {
		const oldProduct = await prismaClient.product.findFirst({
			where: {
				id: product_id,
			},
			select: {
				banner: true,
			},
		});

		if (!oldProduct) {
			throw new Error("Produto não encontrado!");
		}

		const imagesToRemove = oldProduct.banner;

		// Remove imagens do sistema de arquivos
		imagesToRemove.forEach((image) => {
			const imagePath = path.resolve("./tmp_products", image);
			if (fs.existsSync(imagePath)) {
				fs.unlinkSync(imagePath);
			}
		});

		// Deleta vínculos na tabela intermediária ProductCategory
		await prismaClient.productCategory.deleteMany({
			where: {
				product_id: product_id,
			},
		});

		// Deleta o produto
		const product = await prismaClient.product.delete({
			where: {
				id: product_id,
			},
		});

		return product;
	}
}
