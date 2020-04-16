import express from "express";

const userRouter = express.Router();

// import controllers
import loginController from "../controllers/loginController";
import userController from "../controllers/userController";

userRouter.get(
  "/",
  loginController.isLoggedIn,
  userController.getUserData,
  (req, res) => {
    res.json(res.locals);
  }
);

userRouter.post(
  "/login",
  loginController.verifyCredentials,
  loginController.loginUser,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

userRouter.post("/logout", loginController.logoutUser, (req, res) => {
  res.status(200).json(res.locals);
});

userRouter.post(
  "/signup",
  loginController.hashPassword,
  userController.createUser,
  loginController.loginUser,
  (req, res) => {
    res.status(200).json();
  }
);
export default userRouter;
