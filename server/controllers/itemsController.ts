import { Handler } from "express";
import db from "../model/model";

type ItemsController = {
  addItemType: Handler;
  getListItems: Handler;
};

const addItemType: Handler = (req, res, next) => {
  const query =
    "INSERT INTO items COLUMNS (name, max_price, brand, notes, group_id) VALUE";
};

const getListItems: Handler = (req, res, next) => {
  const query = `SELECT * FROM items WHERE list_id=$1`;
  const values = [req.query.listId];

  db.query(query, values, () => {});
};

const itemsController: ItemsController = {
  addItemType,
  getListItems,
};

export default itemsController;
