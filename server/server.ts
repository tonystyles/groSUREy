import express from "express";
import path from "path";

// initalize app
const app = express();

// check if envorniment is development
const isDev = process.env.NODE_ENV === "development";

//set the port
const PORT = isDev ? 3001 : 3000;

/**
 * PARSE THE BODY OF REQUEST
 */
app.use(express.json());

/**
 * HANDLE REQUESTS FOR STATIC FILES
 */
app.use("/static", express.static(path.resolve(__dirname, "../build/static")));

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
