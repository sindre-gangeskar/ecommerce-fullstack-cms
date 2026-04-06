import { CustomHttpError } from "@/types/definitions";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: CustomHttpError, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err.status === 404)
    return res.status(err.status).json({ message: err.message || 'resource not found', state: err.state || "error", status: err.status } satisfies CustomHttpError);

  return res.status(err.status || 500).json({
    message: err.message || "An internal server error has occurred",
    state: err.state ?? "error",
    status: err.status ?? 500,
    name: err.name ?? "InternalServerError",
    ...(err.data ? { data: err.data } : null)
  } satisfies CustomHttpError);
}