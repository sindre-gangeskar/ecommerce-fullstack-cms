import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'
import sequelize from 'models';
import errorHandler from 'middleware/errorHandler';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import brandsRouter from './routes/brands';
var app = express();

sequelize.sync({ force: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brands', brandsRouter);

// catch 404 and forward to error handler
app.use(function(_req: Request, _res: Response, next: NextFunction ) {
  next(createError(404));
});

app.use(errorHandler);
export default app;
