// controllers/order/GetOrderDetailsController.js
import { DetailOrderService } from "../../services/order/DetailOrderService.js";

class DetailOrderController {
    async handle(req, res) {
        const { orderId } = req.params;

        const detailOrderService = new DetailOrderService();
        const order = await detailOrderService.execute({ orderId });

        res.json(order);
    }
}

export { DetailOrderController };
