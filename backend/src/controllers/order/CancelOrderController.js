import { CancelOrderService } from "../../services/order/CancelOrderService.js";

class CancelOrderController {
    async handle(req, res) {
        const { order_id } = req.params;

        const cancelOrderService = new CancelOrderService();
        await cancelOrderService.execute(order_id);

        return res.status(204).send();
    }
}

export { CancelOrderController };
