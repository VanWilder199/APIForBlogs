import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";
import { IMessageBlogModel} from "../../model/messageBlog.model";

@Entity({
  name: "message_blog",
})
export class MessageBlog implements IMessageBlogModel {
  @PrimaryColumn("uuid", {
    update:false
  })
  id: string;

  @CreateDateColumn({
    update: false
  })
  created_at: Date;

  @Column( {
    nullable: true
  })
  post_text: string;

  @Column( {
    nullable: true
  })
  post_media: string;

  @Column({
    update: false
  })
  author: string;

  @Column()
  isDeleted: boolean;

}
