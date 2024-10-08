import express from "express";
import {
	cancelOrder,
	findOrderById,
	getAllMyOrders,
	getAllSellerOrders,
	placeOrder,
} from "../controllers/order.js";
import { restrictTo } from "../middlewares/Auth.js";

const OrderRouter = express.Router();

OrderRouter.post("/place", placeOrder);
OrderRouter.delete("/cancel/:id", cancelOrder);
OrderRouter.get("/my", getAllMyOrders);
OrderRouter.get("/my/List",restrictTo(["seller"]), getAllSellerOrders);
OrderRouter.get("/:id", findOrderById);

export default OrderRouter;
