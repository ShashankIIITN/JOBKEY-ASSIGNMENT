import { status } from "../constants/other.js";
import { queries } from "../constants/sql.js";
import { pool } from "../index.js";

export const createProduct = async (req, res) => {
	const { name, description, price } = req.body;
	const sellerId = req.user.id;

	try {
		const result = await pool.query(queries.createProduct, [
			name,
			description,
			price,
			sellerId,
		]);

		return res.json(result.rows[0]);
	} catch (error) {
		console.error("Error inserting product:", error);
		return res.json({
			message: "Error inserting product!",
			status: status.FAILURE,
		});
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const result = await pool.query(queries.getAllProducts);

		return res.json(result.rows);
	} catch (error) {
		console.error("Error inserting product:", error);
		return res.json({
			message: "Error inserting product!",
			status: status.FAILURE,
		});
	}
};

export const getSellerProducts = async (req, res) => {
	const sellerId = req.user.id;

	try {
		const result = await pool.query(queries.getSellerListedProducts, [
			sellerId,
		]);

		return res.json(result.rows);
	} catch (error) {
		console.error("Error inserting product:", error);
		return res.json({
			message: "Error inserting product!",
			status: status.FAILURE,
		});
	}
};

export const updateProduct = async (req, res) => {
	const { name, description, price } = req.body;
	const sellerId = req.user.id;
	const productId = req.params.id;
	try {
		const result = await pool.query(queries.updateProduct, [
			name,
			description,
			price,
			productId,
			sellerId,
		]);

		if (result.rows.length === 0) {
			console.log("Product not found or seller mismatch");
			return res.json({
				message: "Product not found or seller mismatch",
				status: status.FAILURE,
			});
		}

		return res.json(result.rows[0]);
	} catch (error) {
		console.error("Error updating product:", error);
	}
};

export const deleteProduct = async (req, res) => {
	const sellerId = req.user.id;
	const productId = req.params.id;

	console.log(productId);
	try {
		const result = await pool.query(queries.deleteProduct, [
			productId,
			sellerId,
		]);

		if (result.rows.length === 0) {
			console.log("Product not found or unauthorized deletion");
			return res.json({
				message: "Product Not Found!",
				status: status.FAILURE,
			});
		}

		return res.json(result.rows[0]);
	} catch (error) {
		console.error("Error deleting product:", error);
		res.json({ message: "Error deleting product", status: status.FAILURE });
	}
};
