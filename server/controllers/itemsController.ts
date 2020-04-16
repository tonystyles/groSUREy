import { Handler } from "express";
import db from "../model/model";

const getListItems: Handler = (req, res, next) => {
  const query = `
    SELECT *
    FROM items
    WHERE list_id = $1;
  `;

  const values = [req.query.listId];

  db.query(query, values)
    .then((items) => {
      res.locals.items = items.rows;
      return next();
    })
    .catch((e) => next(e));
};

const createListItem: Handler = (req, res, next) => {
  const item = req.body.item;

  const query = `
    INSERT INTO items
    (name, quantity, max_price, brand, notes, checked, list_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    item.name,
    item.quantity,
    item.maxPrice ? item.maxPrice : null,
    item.brand ? item.brand : null,
    item.notes ? item.notes : null,
    false,
    item.listId,
  ];

  db.query(query, values)
    .then((item) => {
      res.locals.item = item.rows[0];
      return next();
    })
    .catch((e) => next(e));
};

const updateListItem: Handler = (req, res, next) => {
  // only update the items that are included in the Item object of req body
  // create string of what columns to set
  // create array of values of items
  let set = "";
  const values = Object.keys(req.body.item).map((prop, i) => {
    if (prop === "maxPrice") set += `max_price=$${i + 1} `;
    else set += `${prop}=$${i + 1} `;
    return req.body.item[prop];
  });

  // add list id at the end of values
  values.push(req.body.itemId);

  const query = `
    UPDATE items
    SET ${set}
    WHERE _id = $${values.length}
    RETURNING *;
  `;

  db.query(query, values)
    .then((item) => {
      res.locals.item = item.rows[0];
      return next();
    })
    .catch((e) => next(e));
};

const deleteListItem: Handler = (req, res, next) => {
  const query = `
    DELETE FROM items
    WHERE _id = $1;
  `;

  const values = [req.body.itemId];

  db.query(query, values)
    .then((s) => next())
    .catch((e) => next(e));
};

const itemsController = {
  getListItems,
  createListItem,
  updateListItem,
  deleteListItem,
};

export default itemsController;
