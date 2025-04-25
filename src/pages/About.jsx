import React from "react";

const About = () => {
  return (
    <div className="container mt-5 pt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow rounded-4 p-4">
            <h1 className="mb-4 text-primary display-5 fw-bold">About Our Hostel Management System</h1>
            
            <p className="lead">
              Our Hostel Management System is a smart and intuitive web platform developed using <strong>React (Vite)</strong> and <strong>Firebase</strong>, built to streamline hostel operations for both students and administrators.
            </p>

            <h4 className="mt-4 text-secondary">🎯 Core Features</h4>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">✔️ Role-based Login for Admin and Students</li>
              <li className="list-group-item">✔️ Leave Request Management</li>
              <li className="list-group-item">✔️ Library Pass Issuance</li>
              <li className="list-group-item">✔️ Mess Menu Scheduling</li>
              <li className="list-group-item">✔️ Emergency Contact Access</li>
              <li className="list-group-item">✔️ Parcel & Complaint Handling System</li>
              <li className="list-group-item">✔️ Notice Board Updates</li>
            </ul>

            <h4 className="text-secondary">🛠️ Tech Stack</h4>
            <p><strong>Frontend:</strong> React (Vite), Bootstrap 5</p>
            <p><strong>Backend:</strong> Firebase Authentication & Firestore</p>

            <h4 className="text-secondary mt-4">📌 Project Purpose</h4>
            <p>
              The system empowers hostel administrators by digitizing day-to-day activities and provides students a convenient platform to raise requests and view updates in real-time.
            </p>

            <h4 className="text-secondary mt-4">🚀 Future Enhancements</h4>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item">🔔 Real-time Push Notifications</li>
              <li className="list-group-item">💬 Student Chat & Support System</li>
              <li className="list-group-item">💰 Online Fee Payment Module</li>
              <li className="list-group-item">🧾 Attendance & Daily Report Tracking</li>
            </ul>

            <p className="text-muted text-center mt-5">
              &copy; {new Date().getFullYear()} Hostel Management App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
