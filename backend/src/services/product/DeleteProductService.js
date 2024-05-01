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
		const imagesToRemove = oldProduct.banner;

		// imagesToRemove.forEach((image) => {
		// 	const imagePath = path.resolve("./tmp_products", image);
		// 	fs.unlinkSync(imagePath);
		// });

		const product = await prismaClient.product.delete({
			where: {
				id: product_id,
			},
		});

		return product;
	}
}
