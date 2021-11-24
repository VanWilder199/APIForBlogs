import { Factory, Seeder } from "typeorm-seeding";
import {MessageBlog} from "../entity/Message.entity";

export default class CreateMessages implements Seeder {
    async run(factory: Factory): Promise<void> {
        await factory(MessageBlog)().createMany(30);
    }
}
