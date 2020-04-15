import express from "express";
import path from "path";

const app = express();
const isDev = process.env.NODE_ENV === "development";
const PORT = isDev ? 3001 : 3000;

// IMPORT ROUTERS
import loginRouter from "./routes/login";
import groupsRouter from "./routes/groups";
import listsRouter from "./routes/lists";
import itemsRouter from "./routes/items";

/**
 * PARSE THE BODY OF REQUEST
 */
app.use(express.json());

/**
 * HANDLE REQUESTS FOR STATIC FILES
 */
app.use("/static", express.static(path.resolve(__dirname, "../build/static")));

/**
 * ROUTE TRAFFIC
 */
app.use("/login", loginRouter);
app.use("/groups", groupsRouter);
app.use("/lists", listsRouter);
app.use("/items", itemsRouter);

// serve html when in production
if (!isDev) {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
  });
}

// handler for bad routes
app.use((req, res) => {
  res.sendStatus(404);
});

// error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(`Server error: ${err}`);
    res.status(400).json(`Server error. See server log for details.`);
  }
);

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}...`);
});
