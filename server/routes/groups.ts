import express from "express";
import groupsController from "../controllers/groupsController";

const groupsRouter = express.Router();

groupsRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default groupsRouter;
