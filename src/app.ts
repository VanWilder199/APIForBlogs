import express from "express";
import messageRouter from "./routes/message.router";
import cors from "cors";
import loggerMiddleware from "./middlewares/logger";
import errorInternalServer from "./middlewares/errorInternalServer";
import authRouter from "./routes/auth.routers";
import { authMiddleware } from "./middlewares/auth";
import newUserRouter from "./routes/newUser.router";
import * as swaggerDocument from './swagger/swagger.json';
import swaggerUi from 'swagger-ui-express';
export const app = express();



app.use(
  cors({
    methods: "GET, POST, PUT, DELETE",
    origin: "*",
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json());
app.use(loggerMiddleware);
app.use(newUserRouter)
app.use(authRouter);
app.use(authMiddleware);
app.use(messageRouter);
app.use(errorInternalServer);
