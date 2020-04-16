import express from "express";

const itemsRouter = express.Router();

// import controllers
import itemsController from "../controllers/itemsController";
import loginController from "../controllers/loginController";

itemsRouter
  .route("/")
  .get(loginController.isLoggedIn, itemsController.getListItems, (req, res) =>
    res.json(res.locals)
  )
  .post(
    loginController.isLoggedIn,
    itemsController.createListItem,
    (req, res) => res.json(res.locals)
  )
  .put(loginController.isLoggedIn, itemsController.updateListItem, (req, res) =>
    res.json(res.locals)
  )
  .delete(
    loginController.isLoggedIn,
    itemsController.deleteListItem,
    (req, res) => res.sendStatus(200)
  );
export default itemsRouter;
