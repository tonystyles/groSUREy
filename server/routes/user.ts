import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default userRouter;
