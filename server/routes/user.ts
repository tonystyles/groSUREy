import express from "express";
import userController from "../controllers/userController";

const userRouter = express.Router();

// import controllers
import loginController from "../controllers/loginController";
import userContorller from "../controllers/userController";

userRouter.post(
  "/login",
  loginController.verifyCredentials,
  loginController.loginUser,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

userRouter.post("/logout", loginController.logoutUser, (req, res) => {
  res.sendStatus(200);
});

userRouter.post(
  "/signup",
  loginController.hashPassword,
  userContorller.createUser,
  loginController.loginUser,
  (req, res) => {
    res.status(200).json();
  }
);
export default userRouter;
