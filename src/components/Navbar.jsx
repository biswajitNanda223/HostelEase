import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg mb-4">
      <div className="container">
        <Link className="navbar-brand fs-2 fw-bold text-primary" to="/">HostelEase</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link px-4 py-2 text-dark fw-semibold" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-4 py-2 text-dark fw-semibold" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-4 py-2 text-dark fw-semibold" to="/ragging">Anti-Ragging</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-4 py-2 text-dark fw-semibold" to="/mentalhealth">Mental Health</Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-4 py-2 btn btn-outline-primary fw-semibold" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-4 py-2 btn btn-primary fw-semibold" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger px-4 py-2 ms-2 fw-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
