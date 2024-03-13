import { CreateProductService } from "../../services/product/CreateProductService.js";

class CreateProductController {
	async handle(req, res) {
		const {
			name,
			price,
			description,
			stock,
			category_id,
			brand_id,
			user_id,
		} = req.body;

		const createProduct = new CreateProductService();
		if (!req.files || req.files.length === 0) {
			throw new Error("Nenhum arquivo foi enviado");
		} else {
			const banner = req.files.map((file) => file.filename);
			const product = await createProduct.execute({
				name,
				price,
				description,
				stock,
				category_id,
				brand_id,
				user_id,
				banner,
			});

			return res.json(product);
		}
	}
}

export { CreateProductController };
