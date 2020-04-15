import express from "express";

const itemsRouter = express.Router();

itemsRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default itemsRouter;
