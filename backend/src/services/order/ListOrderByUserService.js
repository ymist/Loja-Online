import prismaClient from "../../prisma/index.js";

export class ListOrderByUserService{
    async execute({user_id}){
        const orders = await prismaClient.order.findMany({
            where:{
                user_id: user_id
            }
        })

        return orders
    }
}