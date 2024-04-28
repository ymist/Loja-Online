import prismaClient from "../../prisma/index.js";

class UpdateCartQuantityService {
	async execute({ cartItem_id, quantity }) {
		// Encontrar o item no carrinho
		const cartItem = await prismaClient.cartItem.findFirst({
			where: {
				id: cartItem_id,
			},
		});

		if (!cartItem) {
			throw new Error("CartItem not found");
		}

		// Verificar o estoque do produto
		const product = await prismaClient.product.findUnique({
			where: {
				id: cartItem.product_id,
			},
		});

		if (!product) {
			throw new Error("Product not found");
		}

		if (quantity > product.stock) {
			throw new Error("Insufficient stock");
		}

		// Atualizar a quantidade do item no carrinho
		const updatedCartItem = await prismaClient.cartItem.update({
			where: {
				id: cartItem_id,
			},
			data: {
				quantity: quantity,
			},
		});

		return updatedCartItem;
	}
}

export { UpdateCartQuantityService };
