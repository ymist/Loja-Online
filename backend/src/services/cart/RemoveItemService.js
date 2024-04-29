import prismaClient from "../../prisma/index.js";

class DeleteCartItemService {
	async execute(cartItem_id) {
		// Encontrar o item no carrinho
		const cartItem = await prismaClient.cartItem.findFirst({
			where: {
				id: cartItem_id,
			},
		});

		if (!cartItem) {
			throw new Error("CartItem not found");
		}

		// Excluir o item do carrinho
		await prismaClient.cartItem.delete({
			where: {
				id: cartItem_id,
			},
		});

		// Verificar se o carrinho está vazio
		const cartItemsCount = await prismaClient.cartItem.count({
			where: {
				cart_id: cartItem.cart_id,
			},
		});

		// Se o carrinho estiver vazio, marcar como inativo
		if (cartItemsCount === 0) {
			await prismaClient.cart.update({
				where: {
					id: cartItem.cart_id,
				},
				data: {
					active: false,
				},
			});
		}
	}
}

export { DeleteCartItemService };
