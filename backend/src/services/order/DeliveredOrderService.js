import prismaClient from "../../prisma/index.js";

class UpdateOrderDeliveredService {
    async execute(order_id) {
        // Encontrar o pedido
        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id,
            },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        // Atualizar o status para entregue, o status para ativo e a data de entrega
        const orderDelivered = await prismaClient.order.update({
            where: {
                id: order_id,
            },
            data: {
                delivered: true,
                active: false,
                out_delivery:false,
                delivered_date: new Date(), // Define a data de entrega como a data atual
            },
        });

        return orderDelivered
    }
}

export { UpdateOrderDeliveredService };
