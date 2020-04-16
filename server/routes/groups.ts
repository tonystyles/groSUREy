import express from "express";

import loginController from "../controllers/loginController";
import groupsController from "../controllers/groupsController";

const groupsRouter = express.Router();

groupsRouter.get(
  "/",
  loginController.isLoggedIn,
  groupsController.getGroups,
  (req, res) => {
    res.json(res.locals);
  }
);

groupsRouter.post(
  "/create",
  loginController.isLoggedIn,
  groupsController.createGroup,
  groupsController.joinGroup,
  (req, res) => {
    res.json(res.locals);
  }
);

groupsRouter.post(
  "/join",
  loginController.isLoggedIn,
  groupsController.joinGroup,
  groupsController.getGroups,
  (req, res) => {
    res.json(res.locals);
  }
);

export default groupsRouter;
