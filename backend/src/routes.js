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
	"/create-product",
	productUpload.array("files"),
	isAuthToken,
	new CreateProductController().handle,
);
routes.get("/products", new ListAllProductsController().handle);

routes.put(
	"/edit-product",
	productUpload.array("files"),
	isAuthToken,
	new EditProductController().handle,
);

routes.get(
	"/products/categories/:category_id",
	new ListByCategoryController().handle,
);
routes.get("/products/brands/:brand_id", new ListByBrandController().handle);

export { routes };
