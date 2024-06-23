import { Router } from "express";
import {  deleteUser, getAllUser, getUser, signin, signup, updateUser } from "../controller/user.controller.js";
export const userRouter = Router();
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.get("/:id", getUser)
userRouter.get("/", getAllUser)
userRouter.put("/:id",updateUser)
userRouter.delete("/:id",deleteUser)
