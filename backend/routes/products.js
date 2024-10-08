import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getSellerProducts,
	updateProduct,
} from "../controllers/product.js";
import { restrictTo } from "../middlewares/Auth.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", restrictTo(["seller"]), createProduct);
ProductRouter.delete("/delete/:id", restrictTo(["seller"]), deleteProduct);
ProductRouter.patch("/update/:id", restrictTo(["seller"]), updateProduct);
ProductRouter.get("/all", getAllProducts);
ProductRouter.get("/my", getSellerProducts);

export default ProductRouter;
