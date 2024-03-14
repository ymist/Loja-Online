import { DeleteCategoryService } from "../../services/category/DeleteCategoryService.js";

class DeleteCategoryController {
	async handle(req, res) {
		const category_id = req.body.category_id;

		const deleteCategory = new DeleteCategoryService();

		const category = await deleteCategory.execute({ category_id });

		return res.json(category);
	}
}

export { DeleteCategoryController };
