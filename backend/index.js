import express from "express";
import bodyparser from "body-parser";
import { connectTopgDB } from "./connectToDB.js";
import dotenv from "dotenv";
import UserRouter from "./routes/user.js";
import ProductRoutes from "./routes/products.js";
import { checkAuthToken } from "./middlewares/Auth.js";
import OrderRouter from "./routes/order.js";

dotenv.config();

const PORT = process.env.PORT || "5000";
export const SECRET = process.env.JWT_SECRET_KEY;

const app = express();

export const pool = connectTopgDB();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/product", checkAuthToken, ProductRoutes);
app.use("/order", checkAuthToken, OrderRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
