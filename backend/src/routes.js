import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer.js";
import uploadProduct from "./config/multerProduct.js";

//middlewares
import { isAuthToken } from "./middleware/isAuthUser.js";

//CONTROLLERS
import { CreateUserController } from "./controllers/users/CreateUserController.js";
import { DetailUserController } from "./controllers/users/DetailUserController.js";
import { AuthUserController } from "./controllers/users/AuthUserController.js";
import { UpdateUserController } from "./controllers/users/UpdateUserController.js";
import { CreateAdminController } from "./controllers/users/CreateAdminController.js";

//category
import { CreateCategoryController } from "./controllers/category/CreateCategoryController.js";
import { ListCategoryController } from "./controllers/category/ListCategoryController.js";
import { DeleteCategoryController } from "./controllers/category/DeleteCategoryController.js";

//brands
import { CreateBrandController } from "./controllers/brand/CreateBrandController.js";
import { ListBrandController } from "./controllers/brand/ListBrandController.js";
import { EditBrandController } from "./controllers/brand/EditBrandController.js";
import { DeleteBrandController } from "./controllers/brand/DeleteBrandController.js";

//ADDRESS
import { CreateAddressController } from "./controllers/address/CreateAddressController.js";
import { ListAddressController } from "./controllers/address/ListAddressController.js";
import { EditAddressController } from "./controllers/address/EditAddressController.js";
import { DeleteAddressController } from "./controllers/address/DeleteAddressController.js";

//PRODUTOS
import { CreateProductController } from "./controllers/product/CreateProductController.js";
import { EditProductController } from "./controllers/product/EditProductController.js";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController.js";
import { ListByBrandController } from "./controllers/product/ListByBrandController.js";
import { ListAllProductsController } from "./controllers/product/ListAllProductsController.js";
import { UpdateStockController } from "./controllers/product/UpdateStockController.js";
import { DeleteProductController } from "./controllers/product/DeleteProductController.js";


// CART
import { AddToCartController } from "./controllers/cart/AddToCartController.js";
import { UpdateCartQuantityController } from "./controllers/cart/UpdateCartQuantityController.js";
import { DeleteCartItemController } from "./controllers/cart/RemoveItemController.js";
import { ListCartItemsController } from "./controllers/cart/ListCartItemsController.js";
import { FinishCartController } from "./controllers/cart/FinishCartController.js";

//ORDER
import { ListOrderByUserController } from "./controllers/order/ListOrderByUserController.js";
import { CancelOrderController } from "./controllers/order/CancelOrderController.js";
import { DeliverOrderController } from "./controllers/order/DeliverOrderController.js";
import { UpdateOrderDeliveredController } from "./controllers/order/DeliveredOrderController.js";
import { ListAllOrdersController } from "./controllers/order/ListAllOrdersController.js";
import { DetailOrderService } from "./services/order/DetailOrderService.js";
import { DetailOrderController } from "./controllers/order/DetailOrderController.js";

const routes = Router();
const upload = multer(uploadConfig.upload("./tmp"));
const productUpload = multer(uploadProduct.uploadProduct("./tmp_products"));

//USERS
routes.post("/signup", new CreateUserController().handle);
routes.post("/login", new AuthUserController().handle);
routes.post("/create-admin", new CreateAdminController().handle);
routes.get("/perfil", isAuthToken, new DetailUserController().handle);
routes.put("/user/:id", isAuthToken, new UpdateUserController().handle);
//category
routes.post(
	"/create-category",
	isAuthToken,
	new CreateCategoryController().handle,
);
routes.get("/categories", new ListCategoryController().handle);
routes.delete(
	"/delete-category",
	isAuthToken,
	new DeleteCategoryController().handle,
);
//brands
routes.post(
	"/create-brand",
	isAuthToken,
	upload.single("file"),
	new CreateBrandController().handle,
);
routes.get("/brands", new ListBrandController().handle);
routes.put(
	"/edit-brand",
	upload.single("file"),
	isAuthToken,
	new EditBrandController().handle,
);
routes.delete("/delete-brand", isAuthToken, new DeleteBrandController().handle);
//ADDRESS
routes.post(
	"/create-address",
	isAuthToken,
	new CreateAddressController().handle,
);
routes.get("/list-address", isAuthToken, new ListAddressController().handle);
routes.put("/edit-address", isAuthToken, new EditAddressController().handle);
routes.delete(
	"/delete-address",
	isAuthToken,
	new DeleteAddressController().handle,
);
//PRODUCTS
routes.post(
	"/admin/create-product",
	productUpload.array("files"),
	isAuthToken,
	new CreateProductController().handle,
);
routes.get("/products", new ListAllProductsController().handle);
routes.put(
	"/admin/edit-product/:product_id",
	productUpload.array("files"),
	isAuthToken,
	new EditProductController().handle,
);
routes.get(
	"/products/categories/:category_id",
	new ListByCategoryController().handle,
);
routes.get("/products/brands/:brand_id", new ListByBrandController().handle);
routes.put("/admin/products/stock/:product_id", isAuthToken, new UpdateStockController().handle )
routes.delete("/admin/products/delete/:product_id", isAuthToken, new DeleteProductController().handle)
// CART
routes.post("/add-to-cart", isAuthToken, new AddToCartController().handle)
routes.put("/update-quantity", isAuthToken, new UpdateCartQuantityController().handle)
routes.delete("/delete-cart-item", isAuthToken, new DeleteCartItemController().handle)
routes.get("/cart/:user_id", isAuthToken, new ListCartItemsController().handle)
routes.post("/finish-cart", isAuthToken, new FinishCartController().handle)
//ORDER
routes.get("/orders/:user_id", isAuthToken, new ListOrderByUserController().handle)
routes.put("/order/cancel-order/:order_id", isAuthToken, new CancelOrderController().handle)
routes.put("/order/out_delivered/:order_id", isAuthToken, new DeliverOrderController().handle)
routes.put("/order/delivered/:order_id", isAuthToken, new UpdateOrderDeliveredController().handle)
routes.get("/orders", isAuthToken, new ListAllOrdersController().handle)
routes.get("/order/:order_id", isAuthToken, new DetailOrderController().handle)
export { routes };
