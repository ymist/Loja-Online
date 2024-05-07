import prismaClient from "../../prisma/index.js";

class UpdateUserService{
    async execute(data){
        const user_id = data.id
        
        const user = await prismaClient.user.findUnique({
            where:{
                id: user_id
            }
        })

        if(!user){
            throw new Error("Usuário não encontrado!")
        }

        const updUser = await prismaClient.user.update({
            where:{
                id:user_id
            },
            data:{
                name: data.name || user.name,
                email: data.email || user.email,
                password: data.password || user.password
            }
        })

        return updUser
    }
}

export {UpdateUserService}