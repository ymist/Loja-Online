import { UpdateCartQuantityService } from "../../services/cart/UpdateCartQuantityService.js";

class UpdateCartQuantityController {
	async handle(req, res) {
		console.log(req.body);
		const { cartItem_id, quantity } = req.body;
		console.log(cartItem_id, quantity);

		const updateCartQuantityService = new UpdateCartQuantityService();
		const updatedCartItem = await updateCartQuantityService.execute({
			cartItem_id,
			quantity,
		});

		return res.json(updatedCartItem);
	}
}

export { UpdateCartQuantityController };
