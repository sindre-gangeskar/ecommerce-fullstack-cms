import { parseSequelizeError } from "@/lib/dbValidation";
import { Role } from "models/roles";
import { User } from "models/users";

export default class UserService {
  static async getByEmail(email: string): Promise<User | null | undefined> {
    try {
      return await User.findOne({ where: { email: email }, include: { model: Role } });
    } catch (error) {
      parseSequelizeError(error, 'read');
    }
  }
  static async getByUserId(userId: number): Promise<User | null | undefined> {
    try {
      return await User.findOne({ where: { id: userId }, include: { model: Role } });
    } catch (error) {
      parseSequelizeError(error, 'read');
    }
  }
  static async create(email: string): Promise<User | null | undefined> {
    try {
      return await User.create({ email })
    } catch (error) {
      parseSequelizeError(error, 'create');
    }
  }
  static async deleteById(id: number): Promise<void> {
    try {
      await User.destroy({ where: { id } });
    } catch (error) {
      parseSequelizeError(error, 'delete')
    }
  }
}