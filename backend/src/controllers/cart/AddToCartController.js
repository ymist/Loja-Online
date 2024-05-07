import { AddToCartService } from "../../services/cart/AddToCartService.js";

class AddToCartController {
	async handle(req, res) {
		const { user_id, product_id, quantity } = req.body;

		const addToCartService = new AddToCartService();
		const cartItem = await addToCartService.execute({
			user_id,
			product_id,
			quantity,
		});

		return res.json(cartItem);
	}
}

export { AddToCartController };
