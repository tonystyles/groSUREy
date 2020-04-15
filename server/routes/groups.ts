import express from "express";

const groupsRouter = express.Router();

groupsRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default groupsRouter;
