import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const LibraryPass = () => {
  const [data, setData] = useState({ name: "", email: "" });

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email) return toast.error("All fields required!");

    try {
      await addDoc(collection(db, "libraryPasses"), {
        ...data,
        issuedAt: new Date().toISOString().split("T")[0]
      });
      toast.success("Library Pass Issued!");
      setData({ name: "", email: "" });
    } catch (err) {
      toast.error("Error issuing pass!");
      console.error(err);
    }
  };

  return (
    <>
      <h5>📚 Issue Library Pass</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control placeholder="Student Name" name="name" value={data.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control type="email" placeholder="Student Email" name="email" value={data.email} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="info">Issue Pass</Button>
      </Form>
    </>
  );
};

export default LibraryPass;
