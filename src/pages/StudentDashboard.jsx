import React, { useState, useEffect } from "react";
import {
  Container, Row, Col, Button, Card, Nav, Form,
} from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("messMenu");
  const [darkMode, setDarkMode] = useState(false);
  const [notices, setNotices] = useState([]);
  const [parcels, setParcels] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [libraryPasses, setLibraryPasses] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [complaint, setComplaint] = useState("");
  const [leaveRequest, setLeaveRequest] = useState({ reason: "", fromDate: "", toDate: "" });
  const [polls, setPolls] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState("");
  const [messMenus, setMessMenus] = useState([]);

  const navigate = useNavigate();

  const fetchFirestoreData = async (userEmail) => {
    const messMenuSnapshot = await getDocs(collection(db, "messMenu"));
    setMessMenus(messMenuSnapshot.docs.map(doc => doc.data()));

    const noticesSnapshot = await getDocs(collection(db, "notices"));
    setNotices(noticesSnapshot.docs.map(doc => doc.data()));


    const parcelsQuery = query(collection(db, "parcels"), where("studentEmail", "==", userEmail));
    const parcelsSnapshot = await getDocs(parcelsQuery);
    setParcels(parcelsSnapshot.docs.map(doc => doc.data()));




    const emergencySnapshot = await getDocs(collection(db, "emergencyContacts"));
    setEmergencyContacts(emergencySnapshot.docs.map(doc => doc.data()));

    const libraryQuery = query(collection(db, "libraryPasses"), where("email", "==", userEmail));
    const librarySnapshot = await getDocs(libraryQuery);
    setLibraryPasses(librarySnapshot.docs.map(doc => doc.data()));

    const studentQuery = query(collection(db, "students"), where("email", "==", userEmail));
    const studentSnapshot = await getDocs(studentQuery);
    if (!studentSnapshot.empty) {
      setStudentProfile({ id: studentSnapshot.docs[0].id, ...studentSnapshot.docs[0].data() });
    }

    const pollsSnapshot = await getDocs(collection(db, "polls"));
    setPolls(pollsSnapshot.docs.map(doc => doc.data()));

    const maintenanceQuery = query(collection(db, "maintenance_requests"), where("email", "==", userEmail));
    const maintenanceSnapshot = await getDocs(maintenanceQuery);
    setMaintenanceRequests(maintenanceSnapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchFirestoreData(user.email);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLeaveStatus = async () => {
      if (studentProfile?.id) {
        const leaveQuery = query(
          collection(db, "leave_requests"),
          where("studentId", "==", studentProfile.id)
        );
        const leaveSnapshot = await getDocs(leaveQuery);
        if (!leaveSnapshot.empty) {
          setLeaveStatus(leaveSnapshot.docs[0].data().status);
        }
      }
    };
    fetchLeaveStatus();
  }, [studentProfile]);

  const submitComplaint = async (e) => {
    e.preventDefault();
    if (complaint.trim()) {
      await addDoc(collection(db, "complaints"), {
        studentId: studentProfile?.id,
        name: studentProfile?.name,
        complaint,
        status: "Pending",
        timestamp: new Date(),
      });
      alert("Complaint submitted!");
      setComplaint("");
    }
  };

  const submitLeaveRequest = async (e) => {
    e.preventDefault();
    const { reason, fromDate, toDate } = leaveRequest;
    if (reason && fromDate && toDate) {
      await addDoc(collection(db, "leave_requests"), {
        studentId: studentProfile?.id,
        name: studentProfile?.name,
        reason,
        fromDate,
        toDate,
        status: "Pending",
        timestamp: new Date(),
      });
      setLeaveStatus("Your leave request has been submitted and is pending approval.");
      setLeaveRequest({ reason: "", fromDate: "", toDate: "" });
    }
  };

  return (
    <Container fluid className={`dashboard ${darkMode ? "dark-mode" : ""} p-0`}>
      <Row className="g-0">
        <Col md={2} className="sidebar p-3">
          <h5 className="mb-4 text-center">🎓 Student Panel</h5>
          <Nav className="flex-column">
            {[
              ["messMenu", "🍱 Mess Menu"],
              ["submitComplaint", "🛠 Submit Complaint"],
              ["requestLeave", "📝 Request Leave"],
              ["notices", "📢 Notices"],
              ["parcels", "📦 Parcels"],
              ["emergency", "📞 Emergency"],
              ["libraryPass", "📚 Library Pass"],
              ["polls", "📊 Poll Management"],
              ["maintenance", "🔧 Maintenance Tracker"]
            ].map(([tab, label]) => (
              <div
                key={tab}
                className={`nav-link-custom ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {label}
              </div>
            ))}
          </Nav>
          <Form.Check
            type="switch"
            id="dark-mode-toggle"
            label="🌙 Dark Mode"
            className="mt-4"
            onChange={() => setDarkMode(!darkMode)}
          />
        </Col>

        <Col md={10} className="p-4 content-area">
          <div className="mb-4">
            <h3>Welcome, {studentProfile ? studentProfile.name : "Student"} 🎒</h3>
          </div>

          {studentProfile && (
            <Card className="p-4 shadow-sm mb-4 profile-card">
              <h5 className="mb-3">👤 Student Profile</h5>
              <Row>
                <Col><strong>Name:</strong> {studentProfile.name}</Col>
                <Col><strong>Roll No:</strong> {studentProfile.roll}</Col>
              </Row>
              <Row className="mt-2">
                <Col><strong>Email:</strong> {studentProfile.email}</Col>
                <Col><strong>Course:</strong> {studentProfile.course}</Col>
              </Row>
              <Row className="mt-2">
                <Col><strong>Room No:</strong> {studentProfile.room}</Col>
              </Row>

              {leaveStatus && (
                <Row className="mt-4">
                  <Col>
                    <strong>Leave Status:</strong> {leaveStatus}
                  </Col>
                </Row>
              )}
            </Card>
          )}

{activeTab === "messMenu" && (
  <div className="mess-menu-container p-4 shadow-sm mb-4">
    <h5>🍱 Mess Menu</h5>
    {messMenus.length ? (
      <div className="mess-menu-grid">
        {messMenus.map((menu, index) => (
          <div key={index} className="menu-day">
            <h6 className="menu-day-title"><strong>{menu.day}</strong></h6>
            <div className="menu-item">
              <strong>🍽 Breakfast:</strong>
              <span>{menu.breakfast}</span>
            </div>
            <div className="menu-item">
              <strong>🥗 Lunch:</strong>
              <span>{menu.lunch}</span>
            </div>
            <div className="menu-item">
              <strong>🍛 Dinner:</strong>
              <span>{menu.dinner}</span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>No mess menu available.</p>
    )}
  </div>
)}





          {activeTab === "submitComplaint" && (
            <Card className="p-4 shadow-sm mb-4">
              <h5>🛠 Submit Complaint</h5>
              <Form onSubmit={submitComplaint}>
                <Form.Group>
                  <Form.Label>Complaint</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="Describe your issue..."
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">Submit</Button>
              </Form>
            </Card>
          )}

          {activeTab === "requestLeave" && (
            <Card className="p-4 shadow-sm mb-4">
              <h5>📝 Request Leave</h5>
              <Form onSubmit={submitLeaveRequest}>
                <Form.Group>
                  <Form.Label>Reason</Form.Label>
                  <Form.Control
                    type="text"
                    value={leaveRequest.reason}
                    onChange={(e) => setLeaveRequest({ ...leaveRequest, reason: e.target.value })}
                    placeholder="Reason for leave"
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label>From</Form.Label>
                      <Form.Control
                        type="date"
                        value={leaveRequest.fromDate}
                        onChange={(e) => setLeaveRequest({ ...leaveRequest, fromDate: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mt-2">
                      <Form.Label>To</Form.Label>
                      <Form.Control
                        type="date"
                        value={leaveRequest.toDate}
                        onChange={(e) => setLeaveRequest({ ...leaveRequest, toDate: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="success" type="submit" className="mt-3">Submit Leave</Button>
              </Form>
            </Card>
          )}

          {activeTab === "notices" && (
            <Card className="p-4 shadow-sm mb-4">
              <h5>📢 Notices</h5>
              {notices.length ? (
                <ul>{notices.map((notice, index) => <li key={index}>{notice.message}</li>)}</ul>
              ) : <p>No notices available.</p>}
            </Card>
          )}

          {activeTab === "parcels" && (
            <Card className="p-4 shadow-sm mb-4">
              <h5>📦 Parcel Notifications</h5>
              {parcels.length ? (
                // Filter parcels to show only those belonging to the current user
                <ul>
                  {parcels
                    .filter((parcel) => {
                      console.log("Checking parcel:", parcel);
                      console.log("Current student email:", studentProfile?.email);
                      return parcel.studentEmail === studentProfile?.email; // Filter parcels by current user's email
                    })
                    .map((parcel, index) => (
                      <li key={index}>
                        <strong>Parcel From:</strong> {parcel.parcelFrom} <br />
                        <strong>Received Date:</strong> {parcel.receivedDate} <br />
                        <strong>Status:</strong> {parcel.status}
                      </li>
                    ))}
                </ul>
              ) : (
                <p>No parcel notifications for you.</p>
              )}
            </Card>
          )}




          {activeTab === "emergency" && (
            <Card className="p-4 shadow-sm mb-4">
              <h5>📞 Emergency Contacts</h5>
              {emergencyContacts.length ? (
                <ul>
                  {emergencyContacts.map((contact, index) => (
                    <li key={index}>
                      {contact.name}: {contact.phone}:( {contact.role})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No emergency contacts available.</p>
              )}
            </Card>
          )}

          {activeTab === "libraryPass" && (
            <Card className="p-4 shadow-sm mb-4">
              <h5>📚 Library Passes</h5>
              {libraryPasses.length ? (
                <ul>
                  {libraryPasses.map((pass, index) => (
                    <li key={index}>
                      <strong>Email:</strong> {pass.email} <br />
                      <strong>Issued At:</strong> {pass.issuedAt} <br />
                      <strong>Valid Until:</strong> 8pm <br />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No library passes issued to you.</p>
              )}
            </Card>
          )}


        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
