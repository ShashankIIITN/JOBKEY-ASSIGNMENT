import { status } from "../constants/Other";
import { getUser } from "../services/Auth";

export const checkAuthToken = (req, res, next) => {
	const authorizationValue = req.headers["authorization"];
	req.user = null;

	if (!authorizationValue || !authorizationValue.startsWith("Bearer"))
		return next();

	const token = authorizationValue.split("Bearer ")[1];
	const user = getUser(token);
	req.user = user;

	return next();
};

export const restrictTo = (roles = []) => {
	return (req, res, next) => {
		if (!req.user)
			return res.json({
				message: "please login first",
				status: status.FAILURE,
			});

		if (!roles.includes(req.user.role))
			return res.json({ message: "Unauthorize", status: status.FAILURE });

		return next();
	};
};
