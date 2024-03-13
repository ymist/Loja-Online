import { EditProductService } from "../../services/product/EditProductService.js";

class EditProductController {
	async handle(req, res) {
		const {
			name,
			price,
			description,
			stock,
			category_id,
			brand_id,
			product_id,
		} = req.body;

		const editProduct = new EditProductService();
		if (!req.files) {
			// Se não houver arquivos, apenas atualiza as informações do produto
			const updatedProduct = await editProduct.execute({
				name,
				price,
				description,
				stock,
				category_id,
				brand_id,
				product_id,
			});
			return res.json(updatedProduct);
		} else {
			// Se houver arquivos, também atualiza as imagens do produto
			const banner = req.files.map((file) => file.filename);
			const updatedProduct = await editProduct.execute({
				name,
				price,
				description,
				stock,
				category_id,
				brand_id,
				product_id,
				banner,
			});
			return res.json(updatedProduct);
		}
	}
}

export { EditProductController };
