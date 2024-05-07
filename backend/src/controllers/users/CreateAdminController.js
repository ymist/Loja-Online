import { CreateAdminService } from "../../services/users/CreateAdminService.js";

class CreateAdminController {
	async handle(req, res) {
		const { name, email, password } = req.body;

		const createUserService = new CreateAdminService();

		const user = await createUserService.execute({
			name,
			email,
			password,
		});

		return res.json(user);
	}
}

export { CreateAdminController };
