import { status } from "../constants/Other.js";
import { queries } from "../constants/sql.js";
import { pool } from "../index.js";

export const placeOrder = async (req, res) => {
	const { productId, quantity } = req.body;
	const buyerId = req.user.id;
	try {
		const result = await pool.query(queries.placeOrder, [
			productId,
			buyerId,
			parseInt(quantity),
		]);

		return res.json(result.rows[0]);
	} catch (error) {
		console.error("Error creating order:", error);
	}
};

export const findOrderById = async (req, res) => {
	const orderId = req.params.id;

    console.log(orderId)
	try {
		const result = await pool.query(queries.findOrderByID, [orderId]);

		if (result.rows.length === 0) {
			console.log("Order not found");
			return res.json({ message: "Order not Found", status: status.NOT_FOUND });
		}

		return res.json(result.rows[0]);
	} catch (error) {
		console.error("Error fetching order:", error);
		res.json({
			message: "Failed to fetch the order",
			status: status.NOT_FOUND,
		});
	}
};

export const getAllMyOrders = async (req, res) => {
	const buyerId = req.user.id;
	try {
		const result = await pool.query(queries.getAllBuyerOrders, [buyerId]);

		if (result.rows.length === 0) {
			return res.json({
				message: "Please Order Something First ",
				status: status.NOT_FOUND,
			});
		}

		return res.json(result.rows);
	} catch (error) {
		console.error("Error fetching order:", error);
		res.json({
			message: "Failed to fetch the order",
			status: status.FAILURE,
		});
	}
};

export const getSellerListings = async (req, res) => {
	const sellerId = req.user.id;
	try {
		const result = await pool.query(queries.getSellerListedProducts, [buyerId]);

		if (result.rows.length === 0) {
			return res.json({
				message: "Please Order Something First ",
				status: status.NOT_FOUND,
			});
		}

		return res.json(result.rows);
	} catch (error) {
		console.error("Error fetching order:", error);
		res.json({
			message: "Failed to fetch the order",
			status: status.FAILURE,
		});
	}
};

export const cancelOrder = async (req, res) => {
	const orderId = req.params.id;
	const buyerId = req.user.id;

	console.log(orderId, buyerId);
	try {
		const result = await pool.query(queries.cancelOrder, [orderId, buyerId]);

		if (result.rows.length === 0) {
			return res.json({
				message: "Order Not Found or Unauthorized",
				status: status.FAILURE,
			});
		}

		return res.json(result.rows[0]);
	} catch (error) {
		console.error("Error deleting order:", error);
		res.json({ message: "error deleting", status: status.FAILURE });
	}
};
