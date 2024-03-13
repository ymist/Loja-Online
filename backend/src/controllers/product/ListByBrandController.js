import { ListByBrandService } from "../../services/product/ListByBrandService.js";

class ListByBrandController {
	async handle(req, res) {
		const { brand_id } = req.params;

		const listByBrand = new ListByBrandService();
		const products = await listByBrand.execute(brand_id);

		return res.json(products);
	}
}

export { ListByBrandController };
