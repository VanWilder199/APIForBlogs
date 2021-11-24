import {Router} from "express";
import {MessageController} from "../controllers/messageController";
import {PgMessageService} from "../services/messageBlog.service";
import {messageValidator} from "../validator/message.validators";
import {MessageSchema} from "../validator/message.schema";

const messageRouter = Router();

const storageService = new PgMessageService();
const messageController = new MessageController(storageService);

messageRouter.get(
    "/messages",
    messageController.getAll.bind(messageController)
);

messageRouter.post(
    "/messages",
    messageValidator.body(MessageSchema),
    messageController.create.bind(messageController)
);

messageRouter.put(
    "/messages/:id",
    messageValidator.body(MessageSchema),
    messageController.updateData.bind(messageController)
);

messageRouter.delete(
    "/messages/:id",
    messageController.deleteData.bind(messageController)
);

export default messageRouter;
