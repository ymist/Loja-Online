import { CreateAddressService } from "../../services/address/CreateAddressService.js"


class CreateAddressController{
    async handle(req, res){
        const {user_id, street, neighborhood, number,city, state, complement, country, zipcode, name} = req.body

        if(user_id === "" || street === ""||number === "" || neighborhood ===""||city===""||state===""||name===""|| country === "", zipcode ===""){
            return {err: "Dados faltando!"}
        }
        console.log(user_id)

        const createAddressService = new CreateAddressService()

        const address = await createAddressService.execute({user_id, street, number,neighborhood, city, state, complement, country, zipcode, name})


        return res.json(address)

    }
}

export {CreateAddressController}