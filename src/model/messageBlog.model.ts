export interface IMessageBlogModel {
  id?: string;
  created_at?: Date;
  post_text?: string;
  post_media?: string;
  author: string;
  isDeleted?: boolean;
}

