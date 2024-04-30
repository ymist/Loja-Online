import prismaClient from "../../prisma/index.js";

class DetailUserService {
	async execute(user_id) {
		const user = await prismaClient.user.findFirst({
			where: {
				id: user_id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				orders: true,
				address: true,
				cart: {
					where: {
						active: true,
					},
					include: {
						cartItems: true,
					},
				},
			},
		});
		return { user };
	}
}
export { DetailUserService };
