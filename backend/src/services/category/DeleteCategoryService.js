import prismaClient from "../../prisma/index.js";

class DeleteCategoryService {
	async execute({ category_id }) {
		const category = await prismaClient.category.delete({
			where: {
				id: category_id,
			},
		});

		return category;
	}
}

export { DeleteCategoryService };
