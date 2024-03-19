import prismaClient from "../../prisma/index.js";

class AddToCartService {
    async execute({user_id, product_id, quantity}) {
        // Verificar se o usuário já possui um carrinho ativo
        let cart = await prismaClient.cart.findFirst({
            where: {
                user_id: user_id,
                active: true,
            },
        });

        // Se o usuário não possuir um carrinho ativo, criar um novo carrinho
        if (!cart) {
            cart = await prismaClient.cart.create({
                data: {
                    user_id: user_id,
                },
            });
        }

        const product = await prismaClient.product.findUnique({
            where:{
                id: product_id
            }
        })

        if(product.stock === 0 || product.stock < quantity){
            throw new Error("Não temos essa quantidade de itens disponíveis em estoque!")
        }

        // Adicionar o item ao carrinho
        const cartItem = await prismaClient.cartItem.create({
            data: {
                cart_id: cart.id,
                product_id: product_id,
                quantity: quantity,
            },
        });

        return cartItem;
    }
}

export { AddToCartService };