import bcrypt from "bcrypt";

const PEPPER_STRING = process.env.PEPPER_STRING;
const SALT_ROUNDS = 12;

/**
 * // https://stackoverflow.com/questions/16891729/best-practices-salting-peppering-passwords
 * @param {string} plainPassword - Password in plain text.
 * @returns {Promise<string>} Hashed password.
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  if (!PEPPER_STRING) {
    throw new Error("Pepper string must be set as an environment variable");
  }

  const passwordWithPepper = plainPassword + PEPPER_STRING;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  return await bcrypt.hash(passwordWithPepper, salt);
}
