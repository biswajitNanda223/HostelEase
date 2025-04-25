// components/MaintenanceTracker.jsx
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const MaintenanceTracker = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "maintenanceRequests"), (snapshot) => {
      const maintenanceData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(maintenanceData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h4>Maintenance Tracker</h4>
      {requests.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.issue}</td>
                <td>{request.status}</td>
                <td>{request.assignedTo}</td>
                <td>
                  <button className="btn btn-warning">Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No maintenance requests</p>
      )}
    </div>
  );
};

export default MaintenanceTracker;
