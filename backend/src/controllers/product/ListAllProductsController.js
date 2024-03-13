import { ListAllProductsService } from "../../services/product/ListAllProductsService.js";

class ListAllProductsController {
	async handle(req, res) {
		const listProducts = new ListAllProductsService();

		const category = await listProducts.execute();

		return res.json(category);
	}
}

export { ListAllProductsController };
