import Joi from "joi";

export const MessageSchema = Joi.object({
    id: Joi.string(),
    created_at: Joi.date(),
    post_text: Joi.string(),
    post_media: Joi.string(),
    author: Joi.string().required(),
    isDeleted: Joi.boolean(),
});
