import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/multer.js";

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

const routes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

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

export { routes };
