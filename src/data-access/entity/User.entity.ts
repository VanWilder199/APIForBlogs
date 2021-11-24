import {Entity, PrimaryColumn, Column} from "typeorm";
import { IUser } from "../../model/user";

@Entity({
  name: "users",
})
export class UserEntity implements IUser {
  @PrimaryColumn("uuid")
  id: string;

  @Column({
    unique: true
  })
  login: string;

  @Column()
  password: string;

  @Column()
  isDeleted: boolean;

}
