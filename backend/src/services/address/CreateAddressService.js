import prismaClient from "../../prisma/index.js";

class CreateAddressService{
    async execute({user_id, street, neighborhood, city, number,state, complement, country, zipcode, name}){   
        
        const user = await prismaClient.user.findUnique({
            where:{
                id: user_id
            }
        })

        if(!user){
            return {err: "Usuário não encontrado!"}
        }

        const addressUnique = await prismaClient.address.findFirst({
            where:{
                zipcode: zipcode,
                number: number
            }
        })

        if(addressUnique){
            return {err: "Este endereço já foi criado!"}
        }


        const address = await prismaClient.address.create({
            data:{
                user_id: user_id,
                name: name,
                number: number,
                street: street,
                state: state,
                zipcode: zipcode,
                country: country,
                city: city,
                neighborhood: neighborhood,
                complement: complement
            },
            select:{
                id: true,
                name: true,
                zipcode: true
            }
        })
        return address
        

    }
}

export {CreateAddressService}