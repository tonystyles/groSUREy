import { Handler } from "express";

// bcrypt
const SALT_WORK_FACTOR = 10;
import bcrypt from "bcryptjs";

// import access to databse
import db from "../model/model";
import { resolve } from "dns";

// HASH THE USERS PASSWORD WITH BCRYPT
const hashPassword: Handler = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    req.body.password = hash;
    return next();
  });
};

// VERIFY A USER'S CREDENTIALS
const verifyCredentials: Handler = (req, res, next) => {
  const query = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;
  const values = [req.body.username.toLowerCase()];

  db.query(query, values)
    .then((user) => {
      // if user is found
      if (user.rows.length) {
        bcrypt.compare(
          req.body.password,
          user.rows[0].password,
          (err, success) => {
            res.locals.verifed = true;
            res.locals.userId = user.rows[0]._id;
            return next();
          }
        );
      } else {
        // user is not found
        res.locals.verified = false;
        return res.json({ verified: false });
      }
    })
    .catch((e) => next(e));
};

// START SESSION
const loginUser: Handler = (req, res, next) => {
  const query = `
    INSERT INTO sessions
    (user_id)
    VALUES ($1)
    RETURNING _id;
  `;
  const values = [res.locals.userId];

  db.query(query, values)
    .then((session) => {
      res.locals.isLoggedIn = true;
      res.cookie("ssid", session.rows[0]._id, { httpOnly: true });
      res.cookie("userId", res.locals.userId, { httpOnly: true });
      return next();
    })
    .catch((e) => next(e));
};

// VERIFY USER IS IN SESSION
const isLoggedIn: Handler = (req, res, next) => {
  const query = `
    SELECT *
    FROM sessions
    WHERE _id = $1
    AND user_id = $2;
  `;

  const values = [req.cookies.ssid, req.cookies.userId];
  console.log(values);

  db.query(query, values)
    .then((session) => {
      // if user is found
      if (session.rows.length) {
        res.locals.isLoggedIn = true;
        return next();
      } else {
        // user is not found
        res.json({ isLoggedIn: false });
      }
    })
    .catch((e) => next(e));
};

const logoutUser: Handler = (req, res, next) => {
  const query = `
    DELETE FROM sessions
    WHERE _id = $1
    AND user_id = $2;
  `;

  const values = [req.cookies.ssid, req.cookies.userId];

  db.query(query, values)
    .then((success) => {
      res.locals.isLoggedIn = false;
      res.clearCookie("ssid");
      res.clearCookie("userId");
      return next();
    })
    .catch((e) => next(e));

};

const loginController = {
  hashPassword,
  verifyCredentials,
  loginUser,
  isLoggedIn,
  logoutUser,
};

export default loginController;
