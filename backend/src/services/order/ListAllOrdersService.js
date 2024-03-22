import prismaClient from "../../prisma/index.js";

class ListAllOrdersService {
    async execute() {
        const orders = await prismaClient.order.findMany();
        return orders;
    }
}

export { ListAllOrdersService };
