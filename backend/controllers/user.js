import { queries } from "../constants/sql.js";
import { pool } from "../index.js";
import bcrypt from "bcrypt";
import { getAuthToken } from "../services/Auth.js";
import { status, SALTROUNDS } from "../constants/Other.js";

export const userLogin = async (req, res) => {
	const { email, password } = req.body;

	console.log(req.body)

	try {
		const result = await pool.query(queries.getUser, [email]);

		if (result.rows.length == 0) {
			return res.json({
				message: "Invalid user or password!",
				status: status.FAILURE,
			});
		}

		const user = result.rows[0];

		const match = await bcrypt.compare(password, user.password_hash);

		if (match) {
			const AuthToken = getAuthToken(user);

			return res.json({
				message: "User logged in successfully!",
				status: status.SUCCESS,
				user: {
					name: user.username,
					email: user.email,
					role: user.role,
				},
				AuthToken,
			});
		} else {
			return res.json({
				message: "Invalid user or password!",
				status: status.FAILURE,
			});
		}
	} catch (err) {
		console.error("Error during authentication:", err.stack);
		return res.json({
			status: status.FAILURE,
			message: "Authentication error",
		});
	}
};

export const userSignUp = async (req, res) => {
	const { name, email, password, role } = req.body;

	if (!name || !email || !password) {
		return res.json({
			message: "Enter All Values!",
			status: status.FAILURE,
		});
	}

	try {
		const checkExistingUser = await pool.query(queries.getUser, [email]);

		if (checkExistingUser.rows.length > 0) {
			return res.json({
				message: "User Already exists!",
				status: status.ALREADY_EXISTS,
			});
		}

		const password_hash = await bcrypt.hash(password, SALTROUNDS);

		const result = await pool.query(queries.addUser, [
			name,
			email,
			password_hash,
			role,
		]);

		console.log(result);
		if (result.rows.length == 0) {
			return res.json({
				message: "Failed to create user!",
				status: status.FAILURE,
			});
		}

		const user = result.rows[0];

		const AuthToken = getAuthToken(user);

		return res.json({
			message: "User Created successfully!",
			status: status.SUCCESS,
			user: {
				name: user.username,
				email: user.email,
				role: user.role,
			},
			AuthToken,
		});
	} catch (err) {
		console.error("Error during Registration:", err.stack);
		return res.status(500).json({
			status: status.FAILURE,
			message: "Error during Registration!",
		});
	}
};
