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
		category_id,
		brand_id,
		product_id,
		SKU
	}) {

		const existingProductWithSameSKU = await prismaClient.product.findFirst({
            where: {
                NOT: {
                    id: product_id // Excluir o próprio produto da verificação
                },
                SKU: SKU
            }
        });

        if (existingProductWithSameSKU) {
            throw new Error('SKU já está cadastrado no sistema!');
        }

		const oldProduct = await prismaClient.product.findUnique({
			where: { id: product_id },
			select: { banner: true },
		});

		// Remove as imagens da pasta tmp_products que não estão presentes no conjunto de imagens enviadas
		const imagesToRemove = oldProduct?.banner.filter(
			(image) => !banner.includes(image),
		);
		imagesToRemove.forEach((image) => {
			const imagePath = path.resolve("./tmp_products", image);
			fs.unlinkSync(imagePath);
		});

		const updatedProduct = await prismaClient.product.update({
			where: { id: product_id },
			data: {
				name,
				price,
				description,
				stock,
				banner: { set: banner },
				category_id,
				brand_id,
				SKU
			},
			select: {
				id: true,
				name: true,
				description: true,
				banner: true,
				stock: true,
				brand_id: true,
				category_id: true,
				SKU: true
			},
		});
		return updatedProduct;
	}
}

export { EditProductService };
