import { Request } from "express";

export function getToken(req: Request) {
  const token = req.headers.authorization?.split('Bearer ')[ 1 ] || null;
  return token;
}

export function signToken() {
  
}