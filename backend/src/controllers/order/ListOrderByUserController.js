import { ListOrderByUserService } from "../../services/order/ListOrderByUserService.js";


export class ListOrderByUserController{
    async handle(req,res){
        const {user_id} = req.params

        const listOrderByUser = new ListOrderByUserService()

        const orders = await listOrderByUser.execute({user_id})

        return res.json(orders)
    }
}