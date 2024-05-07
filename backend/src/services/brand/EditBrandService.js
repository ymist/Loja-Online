import prismaClient from "../../prisma/index.js";
class EditBrandService {
	async execute({ id, name, description, banner, user_id }) {
		const user = await prismaClient.user.findUnique({
			where: {
				id: user_id,
				is_admin: true,
			},
		});

		if (!user) {
			throw new Error("Voce nao tem credencias para criar um produto!!!");
		}

		const brand = await prismaClient.brand.findUnique({
			where: {
				id: id,
			},
		});

		if (!brand) {
			return { err: "Brand nao encontrado" };
		}

		const updbrand = await prismaClient.brand.update({
			where: {
				id: id,
			},
			data: {
				name: name || brand.name,
				description: description || brand.description,
				image_url: banner || brand.image_url,
			},
		});

		return updbrand;
	}
}

export { EditBrandService };
