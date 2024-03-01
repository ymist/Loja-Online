import { AuthUserService } from "../../services/users/AuthUserService.js";

class AuthUserController{
    async handle(req, res){
        const {email, password} = req.body

        const authUserService = new AuthUserService()

        const auth = await authUserService.execute({email: email,password:password})

        return res.json(auth)
    }
}

export {AuthUserController}