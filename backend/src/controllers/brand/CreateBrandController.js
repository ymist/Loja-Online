import { CreateBrandService } from "../../services/brand/CreateBrandService.js";

class CreateBrandController {
	async handle(req, res) {
		const { name, description, user_id } = req.body;
		const createBrandService = new CreateBrandService();

		if (!req.file) {
			throw new Error("Error upload file");
		} else {
			const { originalname, filename: banner } = req.file;

			const product = await createBrandService.execute({
				name,
				description,
				banner,
				user_id,
			});
			return res.json(product);
		}
	}
}

export { CreateBrandController };
