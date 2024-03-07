import prismaClient from "../../prisma/index.js";

class CreateBrandService {
	async execute({ name, description, banner, user_id }) {
		if (name === "" || description === "" || !banner || user_id === "") {
			throw new Error("Dados enviados Invalidos");
		}

		const user = await prismaClient.user.findUnique({
			where: {
				id: user_id,
				is_admin: true,
			},
		});

		if (!user) {
			throw new Error("Voce nao tem credencias para criar uma Marca!!!");
		}

		const brand = await prismaClient.brand.create({
			data: {
				name: name,
				description: description,
				image_url: banner,
			},
			select: {
				id: true,
				description: true,
				image_url: true,
				name: true,
			},
		});

		return brand;
	}
}

export { CreateBrandService };
