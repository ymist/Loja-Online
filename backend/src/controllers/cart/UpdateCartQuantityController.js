import { UpdateCartQuantityService } from "../../services/cart/UpdateCartQuantityService.js";

class UpdateCartQuantityController {
    async handle(req, res) {
        const { cartItem_id, quantity } = req.body;

        const updateCartQuantityService = new UpdateCartQuantityService();
        const updatedCartItem = await updateCartQuantityService.execute({cartItem_id, quantity});

        return res.json(updatedCartItem);
    }
}

export { UpdateCartQuantityController };