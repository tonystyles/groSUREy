import express from "express";
import path from "path";

const app = express();

const isDev = process.env.NODE_ENV === "development";

const PORT = isDev ? 3001 : 3000;

/**
 * PARSE THE BODY OF REQUEST
 */
app.use(express.json());

/**
 * HANDLE REQUESTS FOR STATIC FILES
 */
app.use("/static", express.static(path.resolve(__dirname, "../build/static")));

if (!isDev) {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}...`);
});
