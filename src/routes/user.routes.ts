import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";
import { validateUserPayload } from "../middleware/user-validation";

const userRouter = Router();

userRouter.post("/create-user", validateUserPayload, createUser);
userRouter.post("/login-user", loginUser);

export default userRouter;
