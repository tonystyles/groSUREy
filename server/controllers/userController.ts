import { Handler } from "express";

// import access to databse
import db from "../model/model";

// CREATE A USER WHEN SIGNING UP
const createUser: Handler = (req, res, next) => {
  const query = `
    INSERT INTO users
    (username, password, full_name, alias, email)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING _id;
  `;
  const values = [
    req.body.username.toLowerCase(),
    req.body.password,
    req.body.fullName,
    req.body.alias || null,
    req.body.email,
  ];

  db.query(query, values)
    .then((user) => {
      res.locals.userId = user.rows[0]._id;
      return next();
    })
    .catch((e) => next(e));
};

const userController = {
  createUser,
};

export default userController;
