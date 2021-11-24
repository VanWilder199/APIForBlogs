import timeLogger from "../decorators/timeLogger.decorator";
import ControllerLogger from "../decorators/controllerLogger.decorator";
import {Response} from "express";
import {StatusCodes} from "../common";
import {ValidatedRequest} from "express-joi-validation";
import {RequestAuthSchema} from "../validator/auth.validators";
import {UserService} from "../services/user.service";
import jwt, {VerifyErrors} from "jsonwebtoken";

export class AuthController {
    constructor(private userService: UserService) {
    }

    @timeLogger
    @ControllerLogger
    async login(
        req: ValidatedRequest<RequestAuthSchema>,
        res: Response
    ): Promise<void> {
        const {login, password} = req.body;

        const isUser = await this.userService.getUserByLogin(login, password);

        if (!isUser) {
            res.status(StatusCodes.BADREQUEST).send("Incorrect login or password");
        } else {
            jwt.sign(
                {login, password},
                process.env.SECRET_KEY,
                (err: VerifyErrors, token: string) => {
                    if (err) {
                        res.status(StatusCodes.FORBIDDENERROR)
                        res.send(err.message);
                    } else {
                        res.status(StatusCodes.OK)
                        res.send({token});
                    }
                },

                {algorithm: "RS256", expiresIn: "1h"}
            );
        }
    }
}
