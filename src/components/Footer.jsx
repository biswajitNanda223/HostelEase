import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark border-top">
      <div className="container py-3">
        <div className="row align-items-start text-center text-md-start">

          {/* Brand */}
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold mb-2">HostelEase</h5>
            <p className="small text-muted mb-0">
              Bridging the gap between students and campus resources.
            </p>
          </div>

          {/* Links */}
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase mb-2 small fw-semibold">Quick Links</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-12 col-md-4">
            <h6 className="text-uppercase mb-2 small fw-semibold">Connect</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <hr className="my-3" />

        <div className="text-center small text-muted">
          &copy; {new Date().getFullYear()} HostelEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
