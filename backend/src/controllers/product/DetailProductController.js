import { DetailProductService } from "../../services/product/DetailProductService";

export class DetailProductController {
	async handle(req, res) {
		const { id } = req.params;

		const detailProduct = new DetailProductService();

		const product = await detailProduct.execute({ id });

		return product;
	}
}
