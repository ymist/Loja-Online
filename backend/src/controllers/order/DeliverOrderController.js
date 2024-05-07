import { DeliverOrderService } from "../../services/order/DeliverOrderService.js";

class DeliverOrderController {
    async handle(req, res) {
        const {delivery_date } = req.body;
        const {order_id} = req.params
        const deliverOrderService = new DeliverOrderService();
        const order = await deliverOrderService.execute(order_id, delivery_date);

        return res.json(order);
    }
}

export { DeliverOrderController };
