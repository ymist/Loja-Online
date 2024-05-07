// services/order/DetailOrderService.js
import prismaClient from "../../prisma/index.js";

class DetailOrderService {
    async execute({ order_id }) {
        const order = await prismaClient.order.findFirst({
            where: {
                id: order_id,
            },
            include: {
                orderItems: {
                    include: {
                        productsOnOrder: true,
                    },
                },
            },
        });

        if (!order) {
            throw new Error("Order not found");
        }

        return order;
    }
}

export { DetailOrderService };
