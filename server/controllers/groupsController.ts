import { Handler } from "express";
import db from "../model/model";

type GroupsController = {
  createGroup: Handler;
  joinGroup: Handler;
  getGroups: Handler;
};

const createGroup: Handler = (req, res, next) => {
  const query = `
    INSERT INTO groups
    (groupname, alias)
    VALUES ($1, $2)
    RETURNING _id;
  `;
  const values = [req.body.groupName, req.body.alias];

  db.query(query, values)
    .then((group) => {
      res.locals.group.id = group._id;
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
  const groupId = res.locals.group.id ? res.locals.group.id : req.body.groupId;
  const values = [req.body.userId, groupId];

  db.query(query, values)
    .then((s) => next())
    .catch((e) => next(e));
};

const getGroups: Handler = (req, res, next) => {
  const query = `
    SELECT g._id, g.groupname, g.alias, g.picture
    FROM groups g
    INNER JOIN user_groups ug
    ON ug.group_id = g._id;
    WHERE ug.user_id = $1;
  `;
  // find the group id
  const values = [req.body.userId];

  db.query(query, values)
    .then((s) => next())
    .catch((e) => next(e));
};

const groupsController: GroupsController = {
  createGroup,
  joinGroup,
  getGroups,
};

export default groupsController;
