import { ListBrandService } from "../../services/brand/ListBrandService.js";

class ListBrandController {
	async handle(req, res) {
		const listBrandService = new ListBrandService();

		const brand = await listBrandService.execute();

		return res.json(brand);
	}
}

export { ListBrandController };
