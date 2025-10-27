import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, role, additionalData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role and additional data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      role: role,
      ...additionalData,
      createdAt: new Date(),
    });

    return userCredential;
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    // Check if it's admin logout
    if (currentUser && currentUser.email === 'jangidkind@gmail.com' && !currentUser.uid) {
      setCurrentUser(null);
      setUserRole(null);
      return Promise.resolve();
    }
    return signOut(auth);
  };

  const adminLogin = () => {
    setCurrentUser({ email: 'jangidkind@gmail.com' });
    setUserRole('admin');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role);
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
    adminLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
