import { createContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import { API_BASE } from "../lib/api";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios.post(`${API_BASE}/users`, {
        name: user.displayName || "",
        email: user.email,
        photoURL: user.photoURL || "",
      }).catch(() => {});
    }
  }, [user?.email]);
  const register = async ({ name, photoURL, email, password }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name || photoURL) {
      await updateProfile(cred.user, {
        displayName: name || cred.user.displayName || "",
        photoURL: photoURL || cred.user.photoURL || "",
      });
    }
    return cred.user;
  };

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const value = useMemo(
    () => ({ user, loading, register, login, loginWithGoogle, logout, resetPassword }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


