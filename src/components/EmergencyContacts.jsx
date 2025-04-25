import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Form, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", role: "" });

  const fetchContacts = async () => {
    const querySnapshot = await getDocs(collection(db, "emergencyContacts"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setContacts(data);
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.role) return toast.error("Fill all fields");
    await addDoc(collection(db, "emergencyContacts"), form);
    toast.success("Contact Added");
    setForm({ name: "", phone: "", role: "" });
    fetchContacts();
  };

  return (
    <>
      <h5>📞 Emergency Contact Management</h5>
      <Form onSubmit={handleSubmit} className="mb-3">
        <Form.Control className="mb-2" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
        <Form.Control className="mb-2" placeholder="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
        <Form.Control className="mb-2" placeholder="Role" name="role" value={form.role} onChange={handleChange} />
        <Button type="submit" variant="dark">Add Contact</Button>
      </Form>
      <Table striped bordered hover responsive>
        <thead><tr><th>Name</th><th>Phone</th><th>Role</th></tr></thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}><td>{c.name}</td><td>{c.phone}</td><td>{c.role}</td></tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default EmergencyContacts;
