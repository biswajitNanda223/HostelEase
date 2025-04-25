import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ComplaintManagement = () => {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    const complaintSnapshot = await getDocs(collection(db, "complaints"));
    const complaintDocs = complaintSnapshot.docs;

    // Fetch complaints with student info
    const enrichedComplaints = await Promise.all(
      complaintDocs.map(async (complaintDoc) => {
        const data = complaintDoc.data();
        const studentId = data.studentId;

        let studentData = { name: "N/A", roll: "N/A", email: "N/A" };
        if (studentId) {
          try {
            const studentRef = doc(db, "students", studentId);
            const studentSnap = await getDoc(studentRef);
            if (studentSnap.exists()) {
              studentData = studentSnap.data();
            }
          } catch (error) {
            console.error("Error fetching student:", error);
          }
        }

        return {
          id: complaintDoc.id,
          ...data,
          name: studentData.name,
          roll: studentData.roll,
          email: studentData.email,
        };
      })
    );

    setComplaints(enrichedComplaints);
  };

  const markResolved = async (id) => {
    await updateDoc(doc(db, "complaints", id), { status: "Resolved" });
    toast.success("Complaint marked as resolved");
    fetchComplaints();
  };

  useEffect(() => { fetchComplaints(); }, []);

  return (
    <>
      <h5>🛠️ Complaint Management</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.roll}</td>
              <td>{c.email}</td>
              <td>{c.complaint}</td>
              <td>{c.status}</td>
              <td>
                {c.status === "Pending" && (
                  <Button variant="success" size="sm" onClick={() => markResolved(c.id)}>
                    Mark Resolved
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ComplaintManagement;
