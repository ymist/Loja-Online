import prismaClient from "../../prisma";

class ListAddressService{
    async execute({user_id}){
        console.log(user_id)
        
        const address = await prismaClient.address.findMany({
            where:{
                user_id: user_id
            },
        })
        console.log(address)

        return address
    }
}

export {ListAddressService}