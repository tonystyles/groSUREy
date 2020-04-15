import express from "express";
import listsController from "../controllers/listsController";

const itemsRouter = express.Router();

itemsRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default itemsRouter;
