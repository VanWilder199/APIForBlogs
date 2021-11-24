import { define } from "typeorm-seeding";
import * as faker from "faker";
import {MessageBlog} from "../entity/Message.entity";

define(MessageBlog, () => {
  const message = new MessageBlog();

  message.id = faker.random.uuid();
  message.post_text = faker.random.words(20);
  message.post_media = faker.internet.url();
  message.author = faker.name.firstName();
  message.isDeleted = false;

  return message;
});
