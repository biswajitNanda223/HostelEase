import React, { useState } from "react";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";

const PushNotice = () => {
  const [notice, setNotice] = useState({ title: "", message: "" });

  const handleChange = (e) => setNotice({ ...notice, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!notice.title || !notice.message) return toast.error("Fill all fields!");

    try {
      await addDoc(collection(db, "notices"), {
        ...notice,
        date: new Date().toISOString().split("T")[0]
      });
      toast.success("Notice Pushed!");
      setNotice({ title: "", message: "" });
    } catch (err) {
      toast.error("Failed to push notice!");
    }
  };

  return (
    <>
      <h5>📢 Push Notice</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Control placeholder="Title" name="title" value={notice.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control as="textarea" placeholder="Message" rows={3} name="message" value={notice.message} onChange={handleChange} />
        </Form.Group>
        <Button type="submit" variant="warning">Push Notice</Button>
      </Form>
    </>
  );
};

export default PushNotice;
