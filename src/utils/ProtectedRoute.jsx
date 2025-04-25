import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, role }) => {
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.warn("Please login first.");
        setLoading(false);
        return;
      }

      const userSnap = await getDoc(doc(db, "users", user.uid));
      const userRole = userSnap.data()?.role;

      if (userRole === role) {
        setIsAllowed(true);
      } else {
        toast.error("Unauthorized access.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [role]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!isAllowed) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
