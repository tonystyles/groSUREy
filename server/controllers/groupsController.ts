import { Handler } from "express";
import db from "../model/model";

const createGroup: Handler = (req, res, next) => {
  const query = `
    INSERT INTO groups
    (groupname, alias)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [req.body.groupName, req.body.alias];

  db.query(query, values)
    .then((group) => {
      res.locals.group = group.rows[0];
      return next();
    })
    .catch((e) => next(e));
};

const joinGroup: Handler = (req, res, next) => {
  const query = `
    INSERT INTO user_groups
    (user_id, group_id)
    VALUES ($1, $2);
  `;
  // find the group id
  const groupId = res.locals.group ? res.locals.group._id : req.body.groupId;
  const values = [req.cookies.userId, groupId];

  db.query(query, values)
    .then((s) => next())
    .catch((e) => next(e));
};

const getGroups: Handler = (req, res, next) => {
  const query = `
    SELECT g._id, g.groupname, g.alias, g.picture
    FROM groups g
    INNER JOIN user_groups ug
    ON ug.group_id = g._id
    WHERE ug.user_id = $1;
  `;
  // find the group id
  const values = [req.cookies.userId];

  db.query(query, values)
    .then((groups) => {
      res.locals.groups = groups.rows;
      return next();
    })
    .catch((e) => next(e));
};

const groupsController = {
  createGroup,
  joinGroup,
  getGroups,
};

export default groupsController;
