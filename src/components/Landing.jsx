import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RaggingBlogsPage from '../pages/RaggingBlogsPage';
import { useAuth } from '../context/AuthContext';

const services = [
  { icon: "bi-people-fill", title: "Student Management", desc: "Centralized database for managing student details and records." },
  { icon: "bi-calendar-check-fill", title: "Leave Approvals", desc: "Easy request & approval process for student leaves." },
  { icon: "bi-journal-bookmark-fill", title: "Library Pass Issuance", desc: "Track and approve passes digitally." },
  { icon: "bi-megaphone-fill", title: "Notice Updates", desc: "Admins can broadcast notices instantly." },
  { icon: "bi-box-seam", title: "Parcel Tracking", desc: "Track parcels and inform students instantly." },
  { icon: "bi-exclamation-triangle-fill", title: "Complaint Management", desc: "Smart portal for raising, tracking & resolving complaints." },
];
const Landing = () => {
  const { isLoggedIn, role } = useAuth(); // Accessing 'role' from AuthContext
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    if (role === 'student') {
      navigate('/student-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="text-center text-white bg-dark py-5"
        style={{ background: 'url("/images/hostel-bg.jpg") center/cover no-repeat' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.h1
            className="display-4 fw-bold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            🏨 Welcome to HostelEase
          </motion.h1>
          <motion.p
            className="lead mt-3"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Efficient. Smart. Connected. Manage hostel life like never before.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            {/* Conditionally render login and register buttons based on isLoggedIn */}
            {!isLoggedIn && (
              <>
                <Link to="/login" className="btn btn-primary btn-lg m-2">Login</Link>
                <Link to="/register" className="btn btn-outline-light btn-lg m-2">Register</Link>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={handleDashboardRedirect}
                className="btn btn-secondary btn-lg m-2"
              >
                Go to Dashboard
              </button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}


      <section className="services-section py-5 bg-light text-center">
        <div className="container">
          <motion.h2
            className="mb-5 fw-bold text-primary"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🚀 Our Smart Services
          </motion.h2>

          <div className="row">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="col-md-4 mb-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="card service-card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="icon-wrapper mb-3 mx-auto">
                      <i className={`bi ${service.icon} text-primary`}></i>
                    </div>
                    <h5 className="fw-semibold">{service.title}</h5>
                    <p className="text-muted">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Ragging Blog Section */}
      <RaggingBlogsPage />

      {/* College Tie-ups */}
      <motion.section className="py-5 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="container">
          <motion.h2 className="mb-4" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            Our Trusted College Partners
          </motion.h2>
          <p>We’re proud to serve institutions across India.</p>
          <div className="d-flex justify-content-center flex-wrap mt-4">
            {["IIT Delhi", "NIT Rourkela", "SOA University", "KIIT University", "VIT", "SRM University"].map((college, idx) => (
              <div key={idx} className="m-3">
                <span className="badge bg-secondary fs-6 p-3">{college}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Cloud Pricing */}
      <motion.section className="py-5 bg-light text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="container">
          <motion.h2 className="mb-4" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            Cloud Storage Plans
          </motion.h2>
          <p className="mb-4">Choose a plan that fits your institution’s needs</p>
          <div className="row">
            {[{ plan: "Basic", price: "₹999/month", storage: "5GB", features: "For small hostels with limited data." },
            { plan: "Standard", price: "₹1,999/month", storage: "15GB", features: "Ideal for mid-sized campuses." },
            { plan: "Premium", price: "₹3,999/month", storage: "50GB", features: "Best for large institutions with multi-hostel setup." }
            ].map((pkg, idx) => (
              <motion.div key={idx} className="col-md-4 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: idx * 0.3 }}>
                <div className="card h-100 shadow-sm border-primary">
                  <div className="card-body">
                    <h5 className="card-title">{pkg.plan}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{pkg.price}</h6>
                    <p>{pkg.features}</p>
                    <p className="fw-bold">Storage: {pkg.storage}</p>
                    <button className="btn btn-outline-primary">Get Started</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Subscription */}
      <motion.section className="py-5 bg-dark text-white text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="container">
          <motion.h2 className="mb-4" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            Stay Updated
          </motion.h2>
          <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
          <div className="d-flex justify-content-center">
            <input type="email" className="form-control w-50" placeholder="Enter your email" />
            <button className="btn btn-primary ms-2">Subscribe</button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Landing;
