import prismaClient from "../../prisma/index.js";

class CreateCategoryService {
	async execute(name, id) {
		if (name === "") {
			throw new Error("Nome Invalido");
		}

		const user = await prismaClient.user.findUnique({
			where: {
				id: id,
				is_admin: true,
			},
		});

		if (!user) {
			throw new Error("Voce nao tem credencias para criar um produto!!!");
		}

		const category = await prismaClient.category.create({
			data: {
				name: name,
			},
			select: {
				id: true,
				name: true,
			},
		});

		return category;
	}
}

export { CreateCategoryService };
