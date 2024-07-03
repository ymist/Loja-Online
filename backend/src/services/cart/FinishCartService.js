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

		const address = await prismaClient.address.findFirst({
			where: { id: address_id },
		});

		if (!address) {
			throw new Error("Address not found");
		}

		const newOrderItems = await Promise.all(
			cart.cartItems.map(async (cartItem) => {
				const product = await prismaClient.product.findFirst({
					where: {
						id: cartItem.product_id,
					},
				});

				return { ...cartItem, price: Number(product.price.replace(",", ".")) * cartItem.quantity };
			}),
		);

		const grandTotal = newOrderItems.reduce((total, item) => total + item.price, 0);

		console.log(newOrderItems);

		//Criar um novo registro de pedido
		const order = await prismaClient.order.create({
			data: {
				user_id: user_id,
				street: address.street,
				number: address.number,
				neighborhood: address.neighborhood,
				complement: address.complement,
				city: address.city,
				state: address.state,
				country: address.country,
				zipcode: address.zipcode,
				name: address.name,
				grand_total: grandTotal,
				orderItems: {
					createMany: {
						data: newOrderItems.map((cartItem) => ({
							product_id: cartItem.product_id,
							quantity: cartItem.quantity,
							price: cartItem.price,
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
