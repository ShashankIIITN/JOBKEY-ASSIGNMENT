import jwt from "jsonwebtoken";
import { SECRET } from "../index.js";

export const getAuthToken = (data) => {
	return jwt.sign(data, SECRET, { expiresIn: "2h" });
};

export const getUser = (token) => {
	return jwt.verify(data, SECRET);
};
