import { UserJWTPayload } from "@/types/definitions";
import { Request } from "express";
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from "./envVariables";

export function getToken(req: Request) {
  const token = req.headers.authorization?.split('Bearer ')[ 1 ] || null;
  return token;
}

export function signToken(payload: UserJWTPayload) {
  return jwt.sign(payload, jwtSecret, { algorithm: 'HS256', expiresIn: '1h' });
}