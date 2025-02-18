/**
 * Generates a random string of the specified length using alphanumeric characters.
 * The string consists of digits (0-9), lowercase letters (a-z), and uppercase letters (A-Z).
 * 
 * @param {number} length - The length of the random string to generate.
 * @returns {string} - A randomly generated string of the specified length.
 */

export function generateRandomString(length: number): string {
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
