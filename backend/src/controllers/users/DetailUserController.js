import { DetailUserService } from "../../services/users/DetailUserService.js";

class DetailUserController {
	async handle(req, res) {
		const user_id = req.user_id;
		console.log(user_id);

		const detailUserService = new DetailUserService();
		const user = await detailUserService.execute(user_id);

		return res.json(user.user);
	}
}

export { DetailUserController };
