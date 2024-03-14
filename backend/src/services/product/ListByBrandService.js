import prismaClient from "../../prisma/index.js";

class ListByBrandService {
	async execute(brand_id) {
		const products = await prismaClient.product.findMany({
			where: {
				brand_id: brand_id,
			},
		});
		return products;
	}
}

export { ListByBrandService };
