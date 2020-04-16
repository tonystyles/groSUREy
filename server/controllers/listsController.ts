import { Handler } from "express";

import db from "../model/model";

const getLists: Handler = (req, res, next) => {
  const query = `
    SELECT *
    FROM lists
    WHERE group_id = $1;
  `;

  const values = [req.query.groupId];

  db.query(query, values)
    .then((lists) => {
      res.locals.lists = lists.rows;
      return next();
    })
    .catch((e) => next(e));
};

const createList: Handler = (req, res, next) => {
  const query = `
    INSERT INTO lists
    (group_id, name)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [req.body.groupId, req.body.name];

  db.query(query, values)
    .then((list) => {
      res.locals.list = list.rows[0];
      return next();
    })
    .catch((e) => next(e));
};

const updateList: Handler = (req, res, next) => {
  const query = `
    UPDATE lists
    SET name = $1
    WHERE _id = $2
    RETURNING *;
  `;

  const values = [req.body.name, req.body.listId];

  db.query(query, values)
    .then((list) => {
      res.locals.list = list.rows[0];
      return next();
    })
    .catch((e) => next(e));
};

const deleteList: Handler = (req, res, next) => {
  const query = `
    DELETE FROM lists
    WHERE _id = $1;
  `;

  const values = [req.body.listId];

  db.query(query, values)
    .then((s) => next())
    .catch((e) => next(e));
};

const listsController = {
  getLists,
  createList,
  updateList,
  deleteList,
};

export default listsController;
