import { define } from "typeorm-seeding";
import { UserEntity } from "../entity/User.entity";
import * as faker from "faker";

define(UserEntity, () => {
  const user = new UserEntity();
  user.id = faker.random.uuid();
  user.login = 'adminTEST'
  user.password = 'A1234af4566AVbfgfg'
  user.isDeleted = false;
  return user;
});
