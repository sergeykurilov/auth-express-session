import { UserRepository } from "../../repositories/user/user.repository";
import { User } from "@prisma/client";
import { hashPassword } from "../../utils/common/hashPassword";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository = new UserRepository();

  /**
   * @param {string} email - The user's email address.
   * @param {string} plainPassword - The user's password in plain text.
   * @returns {Promise<User>} Promise object representing the created user.
   */
  async registerUser(email: string, plainPassword: string): Promise<User> {
    const hashedPassword = await hashPassword(plainPassword);

    return this.userRepository.createUser(email, hashedPassword);
  }

  /**
   * @param {string} email - The user's email address.
   * @@param {string} plainPassword - The user's password in plain text.
   * @returns {Promise<User>}  if authentication is successful returns user object .
   * @throws {Error} If the user is not found or the password is incorrect.
   */
  async validateUser(email: string, plainPassword: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(plainPassword, user.password);

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return user;
  }

  /**
   * Retrieves all users from the repository.
   * @returns {Promise<User[]>} Promise object representing an array of users.
   */
  async findAllUsers() {
    const users = await this.userRepository.findAllUsers();
    return users.map((user) => {
      return {
        id: user.id,
        email: user.email,
      };
    });
  }
}
