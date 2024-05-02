import { Router } from "express";
import userRouter from "./user.router.js";
import postRouter from "./post.router.js";
import commentRouter from "./comment.router.js";

const v11Router = Router();

v11Router.use("/users", userRouter);
v11Router.use("/posts", postRouter);
v11Router.use("/comments", commentRouter);

export default v11Router;
