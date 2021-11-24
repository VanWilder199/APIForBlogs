import {UserService} from "../services/user.service";
import timeLogger from "../decorators/timeLogger.decorator";
import ControllerLogger from "../decorators/controllerLogger.decorator";
import {ValidatedRequest} from "express-joi-validation";
import {RequestAuthSchema} from "../validator/auth.validators";
import {Response} from "express";
import {StatusCodes} from "../common";
import jwt, {VerifyErrors} from "jsonwebtoken";
import {IUser} from "../model/user";
import * as crypto from "crypto";

export class newUserController {
    constructor(private userService: UserService) {
    }

    @timeLogger
    @ControllerLogger
    async enter(
        req: ValidatedRequest<RequestAuthSchema>,
        res: Response
    ): Promise<void> {
        const data = req.body as IUser;

        const isUniqueLogin = await this.userService.checkUnique(data.login);

        if (isUniqueLogin) {
            res.status(StatusCodes.BADREQUEST);
            res.send("UserEntity already exists");
        } else {
            const user: IUser = {
                login: data.login,
                password: data.password,
                isDeleted: false,
            };

            const userEntity = await this.userService.create(user);
            res.status(StatusCodes.CREATED);
            res.send(userEntity);
        }

    }
}
