import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { Form, Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const MessMenu = () => {
  const [menus, setMenus] = useState([]);
  const [form, setForm] = useState({ day: "", breakfast: "", lunch: "", dinner: "" });

  const fetchMenus = async () => {
    const snapshot = await getDocs(collection(db, "messMenu"));
    setMenus(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchMenus(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existing = menus.find(menu => menu.day.toLowerCase() === form.day.toLowerCase());
    if (existing) {
      await updateDoc(doc(db, "messMenu", existing.id), form);
      toast.success("Menu Updated");
    } else {
      await addDoc(collection(db, "messMenu"), form);
      toast.success("Menu Added");
    }
    setForm({ day: "", breakfast: "", lunch: "", dinner: "" });
    fetchMenus();
  };

  return (
    <>
      <h5>🍽️ Mess Menu Management</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Control className="mb-2" placeholder="Day" name="day" value={form.day} onChange={handleChange} />
        <Form.Control className="mb-2" placeholder="Breakfast" name="breakfast" value={form.breakfast} onChange={handleChange} />
        <Form.Control className="mb-2" placeholder="Lunch" name="lunch" value={form.lunch} onChange={handleChange} />
        <Form.Control className="mb-2" placeholder="Dinner" name="dinner" value={form.dinner} onChange={handleChange} />
        <Button type="submit" variant="primary">Save Menu</Button>
      </Form>

      <Table striped bordered hover responsive className="mt-3">
        <thead><tr><th>Day</th><th>Breakfast</th><th>Lunch</th><th>Dinner</th></tr></thead>
        <tbody>
          {menus.map(menu => (
            <tr key={menu.id}>
              <td>{menu.day}</td><td>{menu.breakfast}</td><td>{menu.lunch}</td><td>{menu.dinner}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MessMenu;
