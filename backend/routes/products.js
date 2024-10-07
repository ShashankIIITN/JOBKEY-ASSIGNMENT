import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getSellerProducts,
	updateProduct,
} from "../controllers/product.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", createProduct);
ProductRouter.delete("/delete/:id", deleteProduct);
ProductRouter.patch("/update/:id", updateProduct);
ProductRouter.get("/all", getAllProducts);
ProductRouter.get("/my", getSellerProducts);

export default ProductRouter;
