import { EditBrandService } from "../../services/brand/EditBrandService.js";

EditBrandService;

class EditBrandController {
	async handle(req, res) {
		const { id, name, description, user_id } = req.body;

		const editBrand = new EditBrandService();
		console.log(req);

		if (!req.file) {
			throw new Error("Error upload file");
		} else {
			const { originalname, filename: banner } = req.file;

			const brand = await editBrand.execute({
				id,
				description,
				banner,
				name,
				user_id,
			});
			return res.json(brand);
		}
	}
}

export { EditBrandController };
