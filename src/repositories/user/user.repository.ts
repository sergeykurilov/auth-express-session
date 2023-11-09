import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  /**
   * @param {string} email - The user's email address.
   * @param {string} password - The hashed password of the user.
   * @returns {Promise<User>} the object of the created user.
   */
  async createUser(email: string, password: string): Promise<User> {
    return prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  /**
   * @param {string} email - The email address to search for the user.
   * @returns {Promise<User | null>} user object or null if the user is not found.
   */
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<User[]>} A promise that resolves to an array of user objects.
   */
  async findAllUsers() {
    return prisma.user.findMany();
  }
}
