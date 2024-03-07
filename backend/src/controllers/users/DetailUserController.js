import { DetailUserService } from "../../services/users/DetailUserService.js";

class DetailUserController {
	async handle(req, res) {
		const { id } = req.body;

		const detailUserService = new DetailUserService();
		console.log(id);
		const user = await detailUserService.execute(id);

		return res.json(user.user);
	}
}

export { DetailUserController };
