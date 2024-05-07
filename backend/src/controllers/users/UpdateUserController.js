import { UpdateUserService } from "../../services/users/UpdateUserService.js";

class UpdateUserController{
    async handle(req, res){
        const user = req.body

        const updateUserService = new UpdateUserService()

        const newUser = await updateUserService.execute(user)

        return res.json(newUser)
    }
}

export {UpdateUserController}