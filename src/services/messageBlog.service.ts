import {getRepository, Repository} from "typeorm";
import {v4 as uuidv4} from "uuid";
import {MAX_USERS_PER_PAGE} from "../app.constants";
import {IMessageBlogModel} from "../model/messageBlog.model";
import {MessageBlog} from "../data-access/entity/Message.entity";

export class PgMessageService {
    private messagesRep: Repository<MessageBlog>;

    async create(message: IMessageBlogModel): Promise<IMessageBlogModel> {
        this.messagesRep = getRepository(MessageBlog);

        const createMessage: IMessageBlogModel = {
            id: uuidv4(),
            ...message,
            isDeleted: false,
        };

        return this.messagesRep.save(createMessage);
    }

    async delete(id: string, author: string): Promise<boolean> {
        this.messagesRep = getRepository(MessageBlog);

        const message = await this.messagesRep.findOne({id});

        if (message.author !== author)  {
            return false
        }

        if (message) {
            message.isDeleted = true;
            await this.messagesRep.save(message);
            return true;
        } else {
            return false;
        }
    }

    async update(updateMessage: IMessageBlogModel, id: string, author: string): Promise<IMessageBlogModel | false> {
        this.messagesRep = getRepository(MessageBlog);

        const messageUpdate = await this.findById(id);

        if (messageUpdate.author !== author) {
            return false
        }

        if (messageUpdate) {
            await this.messagesRep.save(updateMessage);
            return updateMessage;
        }
        return messageUpdate;
    }

    async findById(id: string): Promise<IMessageBlogModel | undefined> {
        this.messagesRep = getRepository(MessageBlog);

        return await this.messagesRep.findOne({id});
    }

    async findByLimit(
        limit = MAX_USERS_PER_PAGE
    ): Promise<IMessageBlogModel[]> {
        this.messagesRep = getRepository(MessageBlog);

        const messages = await this.messagesRep.find({
            isDeleted: false,
        });
        if (messages.length > limit) {
            return messages.slice(0, limit);
        } else {
            return messages;
        }

    }
}
