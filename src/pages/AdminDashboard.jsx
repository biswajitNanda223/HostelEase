import React, { useState } from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

// Import components
import PollManagement from "../components/PollManagement";
import MaintenanceTracker from "../components/MaintenanceTracker";
import AddStudent from "../components/AddStudent";
import LeaveRequests from "../components/LeaveRequests";
import LibraryPass from "../components/LibraryPass";
import PushNotice from "../components/PushNotice";
import MessMenu from "../components/MessMenu";
import EmergencyContacts from "../components/EmergencyContacts";
import ParcelManagement from "../components/ParcelManagement";
import ComplaintManagement from "../components/ComplaintManagement";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("addStudent");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const components = {
    addStudent: {
      title: "➕ Add Student",
      component: <AddStudent />
    },
    leaveRequests: {
      title: "📝 Leave Requests",
      component: <LeaveRequests />
    },
    libraryPass: {
      title: "📚 Library Pass",
      component: <LibraryPass />
    },
    noticeBoard: {
      title: "📢 Push Notices",
      component: <PushNotice />
    },
    messMenu: {
      title: "🍱 Mess Menu",
      component: <MessMenu />
    },
    emergency: {
      title: "📞 Emergency Contacts",
      component: <EmergencyContacts />
    },
    parcels: {
      title: "📦 Parcel Management",
      component: <ParcelManagement />
    },
    complaints: {
      title: "🛠 Complaint Management",
      component: <ComplaintManagement />
    },
    polls: {
      title: "📊 Poll Management",
      component: <PollManagement />
    },
    maintenance: {
      title: "🔧 Maintenance Tracker",
      component: <MaintenanceTracker />
    }
  };

  return (
    <div className={darkMode ? "dashboard dark-mode" : "dashboard"}>
      <Container fluid className="p-0 main-content">
        <Row className="g-0">
          <Col md={2} className="sidebar p-3">
            <h5 className="mb-4 text-center">Admin Panel</h5>
            <Nav className="flex-column">
              {Object.keys(components).map((key) => (
                <Nav.Link
                  key={key}
                  className={`nav-link-custom ${activeTab === key ? "active" : ""}`}
                  onClick={() => setActiveTab(key)}
                >
                  {components[key].title}
                </Nav.Link>
              ))}
              <Button variant="secondary" className="mt-3" onClick={toggleDarkMode}>
                {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
              </Button>
            </Nav>
          </Col>

          <Col md={10} className="content-area p-4 pb-5">
            <h3 className="mb-4">Welcome, Admin 🎓</h3>
            <div className="component-wrapper mb-5">
              {components[activeTab]?.component || <p>Component not found.</p>}
            </div>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

export default AdminDashboard;
