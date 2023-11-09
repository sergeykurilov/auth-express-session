import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

/**
 * // https://stackoverflow.com/questions/16891729/best-practices-salting-peppering-passwords
 * @param {string} plainPassword - Password in plain text.
 * @returns {Promise<string>} Hashed password.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  const passwordWithPepper = plainPassword;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  return await bcrypt.hash(passwordWithPepper, salt);
}
