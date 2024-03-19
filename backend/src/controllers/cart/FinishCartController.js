import { FinishCartService } from "../../services/cart/FinishCartService.js";

class FinishCartController {
    async handle(req, res) {
        const { user_id } = req.body;

        const finishCartService = new FinishCartService();
        const order = await finishCartService.execute(user_id);

        return res.json(order);
    }
}

export { FinishCartController };