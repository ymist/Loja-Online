import prismaClient from "../../prisma/index.js";

class FinishCartService {
	async execute({ user_id, address_id }) {
		// Encontrar o carrinho ativo do usuário
		console.log(address_id);
		const cart = await prismaClient.cart.findFirst({
			where: {
				user_id: user_id,
				active: true,
			},
			include: {
				cartItems: {
					include: {
						product: true,
					},
				},
			},
		});

		if (!cart) {
			throw new Error("Cart not found");
		}

		// Criar um novo registro de pedido
		const order = await prismaClient.order.create({
			data: {
				user_id: user_id,
				address_id: address_id,
				orderItems: {
					createMany: {
						data: cart.cartItems.map((cartItem) => ({
							product_id: cartItem.product_id,
							quantity: cartItem.quantity,
						})),
					},
				},
			},
		});

		for (const cartItem of cart.cartItems) {
			await prismaClient.product.update({
				where: {
					id: cartItem.product_id,
				},
				data: {
					stock: {
						decrement: cartItem.quantity,
					},
				},
			});
		}

		// Marcar o carrinho como inativo
		await prismaClient.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				active: false,
			},
		});

		return order;
	}
}

export { FinishCartService };
