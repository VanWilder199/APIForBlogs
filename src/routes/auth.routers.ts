import {Router} from "express";
import {authValidators} from "../validator/auth.validators";
import {AuthSchema} from "../validator/auth.schema";

import {AuthController} from "../controllers/auth.controller";
import {UserService} from "../services/user.service";
import {app} from "../app";

const authRouter = Router();

const userService = new UserService();
const authController = new AuthController(userService);

authRouter.post(
    "/login",
    authValidators.body(AuthSchema),
    authController.login.bind(authController)
);

export default authRouter;
