import prismaClient from "../../prisma/index.js"


class ListBrandService {
	async execute() {
		const brand = await prismaClient.brand.findMany({
			select: {
				id: true,
				name: true,
                description: true,
                image_url: true
			},
		});

		return brand;
	}
}

export { ListBrandService };
