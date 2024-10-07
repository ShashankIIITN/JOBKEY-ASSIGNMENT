import jwt from "jsonwebtoken";
import { SECRET } from "../index.js";

export const getAuthToken = (data) => {
	return jwt.sign(data, SECRET, { expiresIn: "2h" });
};

export const checkAuthToken = (req, res, next) => {
	//to be completed
	return jwt.sign(data, SECRET, { expiresIn: "2h" });
};