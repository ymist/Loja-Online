// controllers/order/ListOrdersController.js
import { ListAllOrdersService } from "../../services/order/ListAllOrdersService.js";

class ListAllOrdersController {
    async handle(req, res) {
        const listAllOrdersService = new ListAllOrdersService();
        const orders = await listAllOrdersService.execute();
        res.json(orders);
    }
}

export { ListAllOrdersController };
