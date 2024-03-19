import { ListCartItemsService } from "../../services/cart/ListItemsCartService.js";


class ListCartItemsController {
    async handle(req, res) {
        const { user_id } = req.params;

        const listCartItemsService = new ListCartItemsService();
        const cartItems = await listCartItemsService.execute(user_id);

        return res.json(cartItems);
    }
}

export { ListCartItemsController };