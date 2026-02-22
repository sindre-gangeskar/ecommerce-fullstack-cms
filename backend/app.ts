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
app.use(function(req: Request, res: Response, next: NextFunction ) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  err.status === 404 ? res.status(err.status).json({ message: 'resource not found' }) : res.status(err.status).json({message: 'An unexpected error has occurred'});
});

export default app;
