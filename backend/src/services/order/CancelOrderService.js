// services/order/CancelOrderService.js
import prismaClient from "../../prisma/index.js";

class CancelOrderService {
	async execute({ order_id }) {
		// Encontrar o pedido
		const order = await prismaClient.order.findFirst({
			where: {
				id: order_id,
			},
			include: {
				orderItems: {
					select: {
						quantity: true,
						product_id: true,
					},
				},
			},
		});

		if (!order) {
			throw new Error("Order not found");
		}

		// Marcar o pedido como cancelado
		await prismaClient.order.update({
			where: {
				id: order_id,
			},
			data: {
				cancel: true,
				active: false,
				delivered: false,
				out_delivery: false,
			},
		});

		// Atualizar o estoque dos produtos
		await Promise.all(
			order.orderItems.map(async (orderItem) => {
				await prismaClient.product.update({
					where: {
						id: orderItem.product_id,
					},
					data: {
						stock: {
							increment: orderItem.quantity,
						},
					},
				});
			}),
		);
	}
}

export { CancelOrderService };
