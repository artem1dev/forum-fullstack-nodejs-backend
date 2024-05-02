import { Router } from "express";
import userRouter from "./user.router.js";
import postRouter from "./post.router.js";
import commentRouter from "./comment.router.js";

const v12Router = Router();

v12Router.use("/users", userRouter);
v12Router.use("/posts", postRouter);
v12Router.use("/comments", commentRouter);

export default v12Router;
