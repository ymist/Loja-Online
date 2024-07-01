import { ListByCategoryService } from "../../services/product/ListByCategoryService.js";

class ListByCategoryController {
	async handle(req, res) {
		const { categories } = req.params;

		const listByCategoryService = new ListByCategoryService();
		const products = await listByCategoryService.execute(category_id);

		return res.json(products);
	}
}

export { ListByCategoryController };
