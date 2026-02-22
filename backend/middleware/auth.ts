import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from "helpers/envVariables";
import { getToken } from "helpers/jwt";
import { UserAttributes } from "models/users";
import UserService from "services/UserService";

interface AuthRequest extends Request {
  user: string | jwt.JwtPayload;
}

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ message: 'Login required' });

    const verified = jwt.verify(token, jwtSecret);
    (req as AuthRequest).user = verified;
    next();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    type UserSubset = Pick<UserAttributes, "email" | "roleId">
    const user = (req as AuthRequest).user as UserSubset;
    const userData = await UserService.getByEmail(user.email);
    
    if (userData?.role && userData?.role.name !== "admin")
      return res.status(401).json({ message: 'Admin privileges required' });

    next();
  } catch (error) {
    console.error(error);
    throw error;
  }
}