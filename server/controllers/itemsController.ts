import { Handler } from "express";
import db from "../model/model";

const addItemType: Handler = (req, res, next) => {
  const query =
    "INSERT INTO items COLUMNS (name, max_price, brand, notes, group_id) VALUE";
};

const getListItems: Handler = (req, res, next) => {
  const query = `
    SELECT i.quantity, i.notes, t.name, t.max_price, t.brand
    FROM items i
    INNER JOIN item_types t
    ON i.type_id = t._id
    WHERE i.list_id=$1
  `;
  const values = [req.query.listId];

  db.query(query, values);
};

// intialize controller object
const itemsController = {
  addItemType,
  getListItems,
};

export default itemsController;
