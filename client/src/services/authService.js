import { auth } from '../firebase'; 
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);  // calls the callback whenever the user's auth state changes
};
