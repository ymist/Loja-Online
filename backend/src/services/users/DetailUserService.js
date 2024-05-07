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
				Order: {
					where: {
						active: true,
						cancel: false,
					},
					include: {
						orderItems: true,
					},
				},
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
