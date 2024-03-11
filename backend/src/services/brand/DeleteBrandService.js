import prismaClient from "../../prisma/index.js";

class DeleteBrandService {
	async execute({ id, user_id }) {
		const user = await prismaClient.user.findUnique({
			where: {
				id: user_id,
				is_admin: true,
			},
		});

		if (!user) {
			throw new Error("Voce nao tem credencias para criar um produto!!!");
		}

		const brand = await prismaClient.brand.delete({
			where: {
				id: id,
			},
		});
		return brand;
	}
}

export { DeleteBrandService };
