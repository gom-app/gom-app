/**
 * Validates whether the email format is correct.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates whether the password meets the minimum length requirement.
 * @param {string} password 
 * @returns {boolean}
 */
export function isValidPassword(password) {
  if (!password || typeof password !== "string") return false;
  return password.length >= 6;
}

/**
 * Checks if two password strings match.
 * @param {string} password 
 * @param {string} confirmPassword 
 * @returns {boolean}
 */
export function doPasswordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}
