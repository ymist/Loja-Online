import { DeleteProductService } from "../../services/product/DeleteProductService.js";

export class DeleteProductController{
    async handle(req,res){
        const {product_id} = req.params

        const deleteProduct = new DeleteProductService()

        const product = await deleteProduct.execute({product_id})

        return res.json(product)
    }
}