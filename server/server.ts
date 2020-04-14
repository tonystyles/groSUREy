import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';

// const express = require('express');


const PORT: number = 3001;
const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello');
});

app.listen(PORT, () => { console.log(`App listening on port ${PORT}`) });
