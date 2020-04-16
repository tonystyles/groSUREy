import express from "express";

const listsRouter = express.Router();

// import controllers
import listsController from "../controllers/listsController";
import loginController from "../controllers/loginController";

listsRouter
  .route("/")
  .get(loginController.isLoggedIn, listsController.getLists, (req, res) =>
    res.json(res.locals)
  )
  .post(loginController.isLoggedIn, listsController.createList, (req, res) =>
    res.json(res.locals)
  )
  .put(loginController.isLoggedIn, listsController.updateList, (req, res) =>
    res.json(res.locals)
  )
  .delete(loginController.isLoggedIn, listsController.deleteList, (req, res) =>
    res.sendStatus(200)
  );

export default listsRouter;
