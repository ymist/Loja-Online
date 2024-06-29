import { PrismaClient as OldPrismaClient } from "../../prisma/generated/old/index.js";
import { PrismaClient as NewPrismaClient } from "../../prisma/generated/new/index.js";

const prismaOld = new OldPrismaClient();
const prismaNew = new NewPrismaClient();
async function migrateData() {
	try {
		const users = await prismaOld.user.findMany();
		//for (const user of users) {
		//	await prismaNew.user.create({ data: user });
		//}

		// Migração de Addresses
		const addresses = await prismaOld.address.findMany();
		//for (const address of addresses) {
		//	await prismaNew.address.create({
		//		data: {
		//			...address,
		//			number: parseInt(address.number), // Converte para inteiro conforme necessário
		//		},
		//	});
		//}

		// Migração de Categories
		const categories = await prismaOld.category.findMany();
		//for (const category of categories) {
		//	await prismaNew.category.create({ data: category });
		//}

		// Migração de Brands
		const brands = await prismaOld.brand.findMany();
		//for (const brand of brands) {
		//await prismaNew.brand.create({ data: brand });
		//}

		// Migração de Products e ProductCategory
		const products = await prismaOld.product.findMany({ include: { category: true } });
		/*for (const product of products) {
			const { category, category_id, ...productData } = product;
			console.log(product.id, category_id);
			const newProduct = await prismaNew.product.create({
				data: {
					...productData,
					brand_id: product.brand_id,
				},
			});

			// Cria relacionamentos necessários, como ProductCategory
			await prismaNew.productCategory.create({
				data: {
					product_id: newProduct.id,
					category_id: product.category_id,
				},
			});
		}*/

		// Migração de Orders (incluindo cálculo do grand total)
		const orders = await prismaOld.order.findMany({ include: { orderItems: true } });

		for (const order of orders) {
			// Criar a ordem no novo banco de dados sem o campo orderItems
			const { address_id, orderItems, ...newOrder } = order;

			// Criar a ordem no novo banco de dados sem o campo orderItems
			await prismaNew.order.create({
				data: {
					...newOrder,
					grand_total: 0, // Inicialmente 0, será atualizado após o cálculo
					orderItems: undefined,
				},
			});

			// Calcular o grand_total usando os preços dos produtos do esquema antigo
			let grandTotal = 0;

			for (const item of orderItems) {
				// Obter o preço do produto no esquema antigo
				const product = await prismaOld.product.findUnique({
					where: { id: item.product_id },
				});

				if (product) {
					// Calcular o preço total deste item do pedido
					let price = Number(product.price);
					const itemTotal = price * item.quantity;

					// Criar o ProductOnOrder no novo banco de dados com o preço correto
					await prismaNew.productOnOrder.create({
						data: {
							...item,
							price: price,
						},
					});

					// Adicionar ao grand_total
					grandTotal += itemTotal;
				} else {
					console.warn(`Produto com id ${item.product_id} não encontrado no esquema antigo.`);
				}
			}

			// Atualizar a ordem no novo banco de dados com o grand_total calculado
			await prismaNew.order.update({
				where: { id: newOrder.id },
				data: { grand_total: grandTotal },
			});
		}

		console.log("Migração de Orders concluída com sucesso!");

		// Migração de Cart e CartItems
		const carts = await prismaOld.cart.findMany({ include: { cartItems: true } });
		for (const cart of carts) {
			const newCart = await prismaNew.cart.create({ data: { ...cart, cartItems: undefined } });

			for (const item of cart.cartItems) {
				await prismaNew.cartItem.create({
					data: { ...item, cart_id: newCart.id },
				});
			}
		}

		// Migração de Payments
		//const payments = await prismaOld.payment.findMany();
		//for (const payment of payments) {
		//	await prismaNew.payment.create({ data: payment });
		//}

		console.log("Migração concluída com sucesso!");
	} catch (error) {
		console.error("Erro durante a migração:", error);
	} finally {
		await prismaOld.$disconnect();
		await prismaNew.$disconnect();
	}
}

migrateData();
