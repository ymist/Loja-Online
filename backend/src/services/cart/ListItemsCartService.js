import prismaClient from "../../prisma/index.js";

class ListCartItemsService {
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
            return [];
        }

        return cart.cartItems;
    }
}

export { ListCartItemsService };