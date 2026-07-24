import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { app } from "./firebase";

// Initialize Firebase Auth using the exported app
const auth = getAuth(app);

/**
 * Translates Firebase Auth error codes to Indonesian messages.
 * @param {string} errorCode 
 * @returns {string}
 */
export function mapFirebaseError(errorCode) {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email sudah terdaftar";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email atau password salah";
    case "auth/weak-password":
      return "Password terlalu lemah, minimal 6 karakter";
    case "auth/invalid-email":
      return "Format email tidak valid";
    default:
      return "Terjadi kesalahan, silakan coba lagi";
  }
}

/**
 * Register a new user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: any, message?: string}>}
 */
export async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: mapFirebaseError(error.code) };
  }
}

/**
 * Log in an existing user with email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: any, message?: string}>}
 */
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: mapFirebaseError(error.code) };
  }
}

/**
 * Log out the currently authenticated user.
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, message: mapFirebaseError(error.code) };
  }
}

export { auth };
