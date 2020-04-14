import express from "express";

const loginRouter = express.Router();

loginRouter.route("/").get((req, res) => {
  res.send("Hello World");
});

export default loginRouter;
