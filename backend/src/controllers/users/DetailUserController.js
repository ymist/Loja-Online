import { DetailUserService } from "../../services/users/DetailUserService.js";

class DetailUserController {
	async handle(req, res) {
		const { user_id } = req.body;

		const detailUserService = new DetailUserService();
		console.log(user_id);
		const user = await detailUserService.execute(user_id);

		return res.json(user.user);
	}
}

export { DetailUserController };
