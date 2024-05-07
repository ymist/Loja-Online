import { ListCategoryService } from "../../services/category/ListCategoryService.js";

class ListCategoryController {
	async handle(req, res) {
		const listCategoryService = new ListCategoryService();

		const category = await listCategoryService.execute();

		return res.json(category);
	}
}

export { ListCategoryController };
