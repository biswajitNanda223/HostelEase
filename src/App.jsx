import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import AntiRagging from './pages/AntiRagging';
import MentalHealthPage from "./pages/MentalHealthPage";
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import About from "./pages/About";

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ragging" element={<AntiRagging />} />
        <Route path="/mentalhealth" element={<MentalHealthPage />} />
        <Route path="/createpoll" element={<CreatePoll />} />
        <Route path="/polls" element={<PollList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/student-dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
