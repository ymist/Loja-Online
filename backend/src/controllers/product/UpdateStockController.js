
import { UpdateStockService } from "../../services/product/UpdateStockService.js";

class UpdateStockController{
    async handle(req,res){
        const {stock, SKU} = req.body 
        const {product_id} = req.params
        console.log(product_id, stock)

        const updateStock = new UpdateStockService()

        const product = await updateStock.execute({product_id, stock, SKU})

        return res.json(product)
    }
}

export {UpdateStockController}