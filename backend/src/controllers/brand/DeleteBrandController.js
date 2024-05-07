import { DeleteBrandService } from "../../services/brand/DeleteBrandService.js";

class DeleteBrandController {
	async handle(req, res) {
		const { id, user_id } = req.body;

		const deleteBrand = new DeleteBrandService();

		const brand = await deleteBrand.execute({ id, user_id });

		return res.json(brand);
	}
}
export { DeleteBrandController };
