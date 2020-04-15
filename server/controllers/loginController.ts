import jwt from "jsonwebtoken";
import axios from "axios";
import { Handler } from "express";

// import secrets
import githubSecret from "../_secrets/githubSecret";
import jwtSecret from "../_secrets/jwtSecret";

// import access to databse
import db from "../model/model";

/**
 *  JWT LOGIN
 */
const loginUser: Handler = (req, res, next) => {
  try {
    // create payload
    const payload = { id: res.locals.userData.id };
    // create jwt token
    const token = jwt.sign(payload, jwtSecret.secret);
    res.cookie("jwt_token", token, { httpOnly: true });
    return next();
  } catch (err) {
    return next({
      log: `Error in middleware jwtsController.loginUser: ${err}`,
    });
  }
};

const isLoggedIn: Handler = (req, res, next) => {
  try {
    jwt.verify(
      req.cookies.jwt_token,
      jwtSecret.secret,
      (err: any, data: any) => {
        // if not logged in, immediately report to client
        if (err) return res.status(200).json({ isLoggedIn: false });
        res.locals = { isLoggedIn: true };
        return next();
      }
    );
  } catch (err) {
    return next({
      log: `Error in middleware jwtsController.isLoggedIn: ${err}`,
    });
  }
};

/**
 *  GITHUB OAUTH
 */
const githubToken: Handler = (req, res, next) => {
  axios
    .post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: githubSecret.clientId,
        client_secret: githubSecret.clientSecret,
        // temporary code from github based on user login
        code: req.query.code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((githubRes) => {
      res.locals.token = githubRes.data.access_token;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in middleware loginController.token: ${err}`,
      })
    );
};

// Uses token to retrieve information about current user
const githubUserData: Handler = (req, res, next) => {
  axios
    .get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: "token " + res.locals.token,
      },
    })
    .then(({ data: { name, avatar_url, email } }) => {
      res.locals.userData = { full_name: name, picture: avatar_url, email };
      return next();
    })
    .catch((err) => ({
      log: `Error in middleware loginController.userData axios to github: ${err}`,
    }));
};

const loginController = {
  loginUser,
  isLoggedIn,
  githubToken,
  githubUserData,
};

export default loginController;
