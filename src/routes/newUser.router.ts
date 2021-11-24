import {Router} from "express";
import {UserService} from "../services/user.service";
import {authValidators} from "../validator/auth.validators";
import {AuthSchema} from "../validator/auth.schema";
import {newUserController} from "../controllers/newUser.controller";


const newUserRouter = Router();

const userService = new UserService();
const userController = new newUserController(userService);

newUserRouter.post(
    "/enter",
    authValidators.body(AuthSchema),
    userController.enter.bind(userController)
);

export default newUserRouter;