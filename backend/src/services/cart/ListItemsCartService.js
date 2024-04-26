import prismaClient from "../../prisma/index.js";

class ListCartItemsService {
	async execute(user_id) {
		// Encontrar o carrinho ativo do usuário
		console.log(user_id);
		const cart = await prismaClient.cart.findFirst({
			where: {
				user_id: user_id,
			},
		});
		console.log(cart);

		if (!cart) {
			return [];
		}

		return cart.cartItems;
	}
}

export { ListCartItemsService };
