import { Pool, QueryResult } from "pg";

// url string to access database
import elephantSecret from "../_secrets";

const pool = new Pool({
  connectionString: elephantSecret.url,
});

type Callback = {
  (err: Error, result: QueryResult<any>): void;
};

interface Idb {
  query: (queryText: string, values: any, callback: Callback) => void;
}

const db: Idb = {
  query: (text, params, callback) => {
    console.log("executing query", text);
    return pool.query(text, params, callback);
  },
};

export default db;
