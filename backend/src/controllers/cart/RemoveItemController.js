import { DeleteCartItemService } from "../../services/cart/RemoveItemService.js";

class DeleteCartItemController {
	async handle(req, res) {
		const { cartItem_id } = req.params;

		const deleteCartItemService = new DeleteCartItemService();
		const cartItem = await deleteCartItemService.execute(cartItem_id);

		return res.json(cartItem);
	}
}

export { DeleteCartItemController };
