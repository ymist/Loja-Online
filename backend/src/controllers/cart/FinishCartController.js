import { FinishCartService } from "../../services/cart/FinishCartService.js";

class FinishCartController {
	async handle(req, res) {
		const { user_id, address_id } = req.body;
		console.log(address_id);
		const finishCartService = new FinishCartService();
		const order = await finishCartService.execute({ user_id, address_id });

		return res.json(order);
	}
}

export { FinishCartController };
