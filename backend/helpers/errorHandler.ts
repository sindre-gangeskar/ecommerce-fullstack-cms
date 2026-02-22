import { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: HttpError, req: Request, res: Response, next: NextFunction) {
  if (err.status == 404)
    return res.status(err.status).json({ message: 'resource not found' });

  return res.status(err.status).json({ message: err.message });
}