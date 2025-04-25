// context/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase/config'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ClipLoader } from 'react-spinners'; // Importing the spinner component

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(''); // role: admin, student
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Fetch the role from Firestore based on user's UID
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRole(docSnap.data().role); // Set role from Firestore
        } else {
          setRole('student'); // Default role
        }
      } else {
        setIsLoggedIn(false);
        setRole('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (role) => {
    setIsLoggedIn(true);
    setRole(role);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('role', role); // Save role to localStorage
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setRole('');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
      })
      .catch((error) => console.error('Error signing out: ', error));
  };

  if (loading) {
    return (
      <div className="spinner-container" style={spinnerContainerStyle}>
        <ClipLoader color="#36D7B7" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Styles for the spinner container (optional, you can customize this)
const spinnerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};
