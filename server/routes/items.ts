import express from "express";
import itemsController from "../controllers/itemsController";

const itemsRouter = express.Router();

itemsRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default itemsRouter;
