import { UpdateOrderDeliveredService } from "../../services/order/DeliveredOrderService.js";

class UpdateOrderDeliveredController {
    async handle(req, res) {
        const { order_id } = req.params;

        const updateOrderDeliveredService = new UpdateOrderDeliveredService();
        const order = await updateOrderDeliveredService.execute(order_id);

        return res.json(order);
    }
}

export { UpdateOrderDeliveredController };
