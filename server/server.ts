import express from 'express'
import { Application } from 'express'

// Create a new express app instance
const app: Application = express();

app.get('/', function (req, res) {

  res.send('Hello World?');
});
app.listen(3001, function () {
  console.log('App is listening on port 3001!');
});
