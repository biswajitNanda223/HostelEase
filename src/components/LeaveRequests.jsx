import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, "leave_requests"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRequests(data);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, "leave_requests", id), { status: newStatus });
    toast.success(`Status updated to ${newStatus}`);
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h5>🔁 Leave Requests</h5>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th><th>Reason</th><th>Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id}>
              <td>{req.name}</td>
              <td>{req.reason}</td>
              <td>from-({req.fromDate})-to-({req.toDate})</td>
              <td>{req.status}</td>
              <td>
                {req.status === "Pending" && (
                  <>
                    <Button size="sm" onClick={() => handleUpdateStatus(req.id, "Approved")} variant="success">Approve</Button>{' '}
                    <Button size="sm" onClick={() => handleUpdateStatus(req.id, "Rejected")} variant="danger">Reject</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LeaveRequests;
