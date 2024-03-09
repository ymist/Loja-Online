import { CreateCategoryService } from "../../services/category/CreateCategoryService.js";

class CreateCategoryController {
	async handle(req, res) {
		const { name, id } = req.body;

		const createCategoryService = new CreateCategoryService();
		const category = await createCategoryService.execute(name, id);

		return res.json(category);
	}
}

export { CreateCategoryController };
