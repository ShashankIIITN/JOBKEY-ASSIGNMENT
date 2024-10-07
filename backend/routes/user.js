import express from "express";
import { userLogin, userSignUp } from "../controllers/user.js";

const UserRouter = express.Router();

UserRouter.post("/signup", userSignUp);
UserRouter.post("/login", userLogin);

export default UserRouter;