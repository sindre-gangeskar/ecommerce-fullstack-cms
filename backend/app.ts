import * as dotenv from 'dotenv';
dotenv.config();
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { fileURLToPath } from 'url'
import sequelize from 'models/index';
import errorHandler from 'middleware/errorHandler';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import indexRouter from "@/routes/index";
import brandsRouter from '@/routes/brands';
import authRouter from '@/routes/auth';
import productsRouter from '@/routes/products';
var app = express();

sequelize.sync({ force: false });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/brands', brandsRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);

app.use(errorHandler);
export default app;
