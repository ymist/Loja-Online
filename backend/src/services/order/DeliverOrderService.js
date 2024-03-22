import prismaClient from "../../prisma/index.js";

class DeliverOrderService {
    async execute(order_id, delivery_date) {
        // Encontrar o pedido
        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id,
            },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        // Verificar se o pedido está cancelado
        if (order.cancel) {
            throw new Error("Cannot deliver a canceled order");
        }

        // Marcar o pedido como entregue e atualizar a data de entrega
        const orderDelivery = await prismaClient.order.update({
            where: {
                id: order_id,
                out_delivery: false
            },
            data: {
                out_delivery: true,
                delivery_date: new Date(delivery_date),
            },
        });

        return orderDelivery
    }
}

export { DeliverOrderService };
