import { Role } from "models/roles";
import { User } from "models/users";

export default class UserService {
  static async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email: email }, include: { model: Role } });
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  static async getByUserId(userId: number): Promise<User | null> {
    try {
      return await User.findOne({ where: { id: userId }, include: { model: Role } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}