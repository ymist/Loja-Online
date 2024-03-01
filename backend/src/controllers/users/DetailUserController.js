import { DetailUserService } from "../../services/users/DetailUserService.js";

class DetailUserController{
    async handle(req, res){
        const user_id = req.body.id

        const detailUserService = new DetailUserService()

        const user = await detailUserService.execute(user_id)

        return res.json(user.user)
    }
}

export {DetailUserController}