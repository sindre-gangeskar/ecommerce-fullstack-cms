import crypto from 'crypto';

import { UserLoginToken } from '@/models/user_login_tokens';
import { Op } from 'sequelize';
import { User } from '@/models/users';
import UserService from './UserService';
export default class LoginTokenService {
  static async createLoginToken(userId: number) {
    try {
      const expirationDate = new Date(Date.now() + (1000 * 60 * 15));
      const token = crypto.randomBytes(64).toString('hex');
      const path = crypto.randomBytes(64).toString('hex');

      const [ instance ] = await UserLoginToken.upsert({ userId, token: token, path: path, expiresAt: expirationDate })
      return instance;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getTokenByUserId(userId: number) {
    try {
      return await UserLoginToken.findOne({ where: { userId } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async verifyLoginTokenAndGetUser(path: string, token: string): Promise<User | null> {
    try {
      const loginToken = await UserLoginToken.findOne({ where: { [ Op.and ]: { token: token, path: path } } });
      if (!loginToken || (loginToken && new Date().getTime() > loginToken.expiresAt.getTime())) return null;

      return await UserService.getByUserId(loginToken.userId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async deleteByUserId(userId: number) {
    try {
      return await UserLoginToken.destroy({ where: { userId: userId } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
