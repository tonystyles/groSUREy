import express from "express";
import loginController from "../controllers/loginController";

const loginRouter = express.Router();

loginRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default loginRouter;
