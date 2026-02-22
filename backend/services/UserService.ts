import { createAndThrowError } from "helpers/utils";
import { Role } from "models/roles";
import { User } from "models/users";

export default class UserService {
  static async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email }, include: { model: Role } });
      
      if (!user)
        createAndThrowError("Failed to find user with provided email", 404, "UserNotFoundError");

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}