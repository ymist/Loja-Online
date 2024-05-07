import prismaClient from "../../prisma/index.js";

class UpdateStockService {
    async execute({stock, SKU,}){
        const product = await prismaClient.product.update({
            where:{
                SKU: SKU
            },
            data:{
                stock
            },
            select:{
                id: true,
                name:true,
                SKU: true,
                stock: true
            }
        })
        console.log(product)
        return product
    }
}

export {UpdateStockService}