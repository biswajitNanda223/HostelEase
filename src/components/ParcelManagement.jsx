import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { Form, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const ParcelManagement = () => {
  const [form, setForm] = useState({ studentEmail: "", parcelFrom: "" });
  const [parcels, setParcels] = useState([]);

  const fetchParcels = async () => {
    const snapshot = await getDocs(collection(db, "parcels"));
    setParcels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchParcels(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "parcels"), {
      ...form,
      receivedDate: new Date().toISOString().split("T")[0],
      status: "Pending"
    });
    toast.success("Parcel Added");
    setForm({ studentEmail: "", parcelFrom: "" });
    fetchParcels();
  };

  const markCollected = async (id) => {
    await updateDoc(doc(db, "parcels", id), { status: "Collected" });
    toast.info("Marked as Collected");
    fetchParcels();
  };

  return (
    <>
      <h5>📦 Parcel Management</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Control className="mb-2" placeholder="Student Email" name="studentEmail" value={form.studentEmail} onChange={handleChange} />
        <Form.Control className="mb-2" placeholder="From (e.g. Amazon)" name="parcelFrom" value={form.parcelFrom} onChange={handleChange} />
        <Button type="submit" variant="secondary">Add Parcel</Button>
      </Form>

      <Table striped bordered hover responsive className="mt-3">
        <thead><tr><th>Email</th><th>From</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {parcels.map(p => (
            <tr key={p.id}>
              <td>{p.studentEmail}</td><td>{p.parcelFrom}</td><td>{p.receivedDate}</td><td>{p.status}</td>
              <td>
                {p.status === "Pending" && (
                  <Button size="sm" variant="success" onClick={() => markCollected(p.id)}>Mark Collected</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ParcelManagement;
