import jwt from "jsonwebtoken";
import { SECRET } from "../index.js";

export const getAuthToken = (data) => {
	return jwt.sign(data, SECRET);
};

export const getUser = (token) => {
	return jwt.verify(token, SECRET);
};
