import crypto from 'crypto';
import bcrypt from 'bcrypt';

import { UserLoginToken } from '@/models/user_login_tokens';
import { Op } from 'sequelize';
import { User } from '@/models/users';
import UserService from './UserService';
import { createAndThrowHttpError } from '@/helpers/utils';
export default class LoginTokenService {
  static async createLoginToken(userId: number) {
    try {
      const expirationDate = new Date(Date.now() + (1000 * 60 * 15));
      const token = crypto.randomBytes(64).toString('hex');
      const path = crypto.randomBytes(64).toString('hex');
      const hashedToken = await bcrypt.hash(token, 10);

      const [ instance ] = await UserLoginToken.upsert({ userId, token: hashedToken, path: path, expiresAt: expirationDate })
      return { instance, path, token };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getTokenByUserId(userId: number): Promise<UserLoginToken | null | undefined> {
    try {
      return await UserLoginToken.findOne({ where: { userId } });
    } catch (error) {
      createAndThrowHttpError({ message: "An error occurred while trying to retrieve login token", status: 500, state: "error", name: "TokenRetrieveError" })
    }
  }
  static async verifyLoginTokenAndGetUser(path: string, token: string): Promise<User | null | undefined> {
    try {
      const loginToken = await UserLoginToken.findOne({ where: { path } });
      if (!loginToken || (loginToken && new Date().getTime() > loginToken.expiresAt.getTime())) return null;

      const tokenValid = bcrypt.compareSync(token, loginToken.token);

      if (!tokenValid) return null;

      const user = await UserService.getByUserId(loginToken.userId);
      if (!user) return null;

      await this.deleteByUserId(user.id);
      return user;
    } catch (error) {
      createAndThrowHttpError({ message: "An error occurred while to trying verify token and retrieve user data", status: 500, state: "error", name: "TokenVerifyUserError" })
    }
  }
  static async deleteByUserId(userId: number): Promise<void> {
    try {
      await UserLoginToken.destroy({ where: { userId: userId } });
    } catch (error) {
      createAndThrowHttpError({ message: "An error occurred while trying to delete user token", status: 500, state: "error", name: "DeleteUserError" })
    }
  }
}
