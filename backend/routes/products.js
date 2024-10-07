import express from "express";
import { createProduct, deleteProduct, updateProduct } from "../controllers/product.js";

const ProductRouter = express.Router();

ProductRouter.post("/add", createProduct);
ProductRouter.post("/delete", deleteProduct);
ProductRouter.post("/update", updateProduct);

export default ProductRouter;
