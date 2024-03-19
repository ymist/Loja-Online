import prismaClient from "../../prisma/index.js";

class FinishCartService {
    async execute(user_id) {
        // Encontrar o carrinho ativo do usuário
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