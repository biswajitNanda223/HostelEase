import React, { useState } from "react";
import { db } from "../firebase/config";
import { FaPhone, FaEnvelope, FaLocationArrow } from "react-icons/fa";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Contact.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        suggestion,
        timestamp: serverTimestamp(),
      });
      setLoading(false);
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setSuggestion("");
    } catch (error) {
      setLoading(false);
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div className="contact-page">
    <div className="container mt-5 mb-5">
      <motion.h2
        className="text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📞 Contact Us
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="row g-3 contact-form bg-white shadow-sm p-4 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="col-md-6">
          <label htmlFor="name" className="form-label fw-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control custom-input"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label fw-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control custom-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="message" className="form-label fw-medium">
            Your Message
          </label>
          <textarea
            id="message"
            className="form-control custom-input"
            rows="4"
            placeholder="What would you like to say?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="col-12">
          <label htmlFor="suggestion" className="form-label fw-medium">
            Suggestions / Improvements
          </label>
          <textarea
            id="suggestion"
            className="form-control custom-input"
            rows="3"
            placeholder="We appreciate your ideas!"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          ></textarea>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-4" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </motion.form>

      {/* Contact Info */}
      <div className="row text-center mt-5">
        <div className="col-md-4 mb-4">
          <FaPhone size={28} className="mb-2 text-primary" />
          <h6 className="fw-semibold">Call Us</h6>
          <p className="text-muted">+1 800 123 4567</p>
        </div>
        <div className="col-md-4 mb-4">
          <FaEnvelope size={28} className="mb-2 text-primary" />
          <h6 className="fw-semibold">Email Us</h6>
          <p className="text-muted">contact@campusconnect.com</p>
        </div>
        <div className="col-md-4 mb-4">
          <FaLocationArrow size={28} className="mb-2 text-primary" />
          <h6 className="fw-semibold">Visit Us</h6>
          <p className="text-muted">123 Campus Street, College Town, CT 12345</p>
        </div>
      </div>

      {/* Suggestions Footer */}
      <div className="mt-4 text-center">
        <h5>Have ideas to make us better?</h5>
        <p className="text-muted">We value your feedback and are always looking to improve CampusConnect.</p>
      </div>
    </div>
    </div>
  );
};

export default Contact;
