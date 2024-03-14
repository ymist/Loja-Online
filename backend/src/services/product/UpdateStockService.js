import prismaClient from "../../prisma/index.js";

class UpdateStockService {
    async execute({stock, product_id, user_id}){
        const user = await prismaClient.user.findUnique({
			where: {
				id: user_id,
				is_admin: true,
			},
		});

		if (!user) {
			throw new Error("Voce nao tem credencias para atualizar o estoque!!!");
		}
        const product = await prismaClient.product.update({
            where:{
                id: product_id
            },
            data:{
                stock
            },
            select:{
                name:true,
                id: true,
                stock: true
            }
        })
        console.log(product)
        return product
    }
}

export {UpdateStockService}