import { Pool, QueryResult } from "pg";

// url string to access database
import elephantSecret from "../_secrets";

const pool = new Pool({
  connectionString: elephantSecret.url,
});

interface Idb {
  query: (queryText: string, values: any) => Promise<any>;
}

const db: Idb = {
  query: (text, params) => {
    console.log("executing query", text);
    console.log("values: ", params, "\n\n");
    return (pool.query(text, params) as unknown) as Promise<any>;
  },
};

export default db;
