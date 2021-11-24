import {Request, Response} from "express";
import {StatusCodes} from "../common";
import {ValidatedRequest} from "express-joi-validation";
import {RequestSchema} from "../validator/users.validators";
import {MAX_USERS_PER_PAGE} from "../app.constants";
import timeLogger from "../decorators/timeLogger.decorator";
import ControllerLogger from "../decorators/controllerLogger.decorator";
import {PgMessageService} from "../services/messageBlog.service";
import {IMessageBlogModel} from "../model/messageBlog.model";

export class MessageController {
    constructor(private messageService: PgMessageService) {
    }

    @timeLogger
    @ControllerLogger
    async deleteData(req: Request, res: Response): Promise<void> {
            const {id} = req.params;
            const data = req.query;
            const strData = String(data.author);

            if (!id && !strData) {
                res.status(StatusCodes.BADREQUEST);
            }

            const isDeleted = await this.messageService.delete(id, strData);

            if (isDeleted) {
                res.status(StatusCodes.OK);
                res.send("Deleted");
            } else {
                res.status(StatusCodes.BADREQUEST);
                res.send('You cannot deleted');
            }
    }

    @timeLogger
    @ControllerLogger
    async getAll(req: Request, res: Response): Promise<void> {
            const data = req.query;
            const limitMessage = data.limit ? Number(data.limit) : MAX_USERS_PER_PAGE;

            const findMessage = await this.messageService.findByLimit(
                limitMessage
            );
            res.status(StatusCodes.OK);
            res.send(findMessage);
    }

    @timeLogger
    @ControllerLogger
    async create(
        req: ValidatedRequest<RequestSchema>,
        res: Response
    ): Promise<void> {
            const data = req.body as IMessageBlogModel;

            const messageEntity = await this.messageService.create(data);

            if (messageEntity) {
                res.status(StatusCodes.CREATED);
                res.send(messageEntity);
            } else {
                res.status(StatusCodes.BADREQUEST);
                res.send(messageEntity);
            }
    }

    @timeLogger
    @ControllerLogger
    async updateData(
        req: ValidatedRequest<RequestSchema>,
        res: Response
    ): Promise<void> {
            const body: IMessageBlogModel = req.body;
            const {id} = req.params;
            const data = req.query;
            const strData = String(data.author)

            const updatedMessage = await this.messageService.update(body, id, strData);
            if (!updatedMessage) {
                res.sendStatus(StatusCodes.BADREQUEST);
                res.send('Bad request or you cannot access');
            }
            res.sendStatus(StatusCodes.OK);
    }
}
