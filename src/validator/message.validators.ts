import {
    ContainerTypes,
    ValidatedRequestSchema,
    createValidator,
} from "express-joi-validation";

export const messageValidator = createValidator();

export interface RequestMessageValidator extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        id:string,
        created_at: string,
        post_text: string,
        post_media: string,
        author: string
        isDeleted: boolean
    };
}