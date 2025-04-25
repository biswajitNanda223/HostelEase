import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { db } from "../firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    roll: "",
    email: "",
    phone: "",
    course: "",
    address: "",
    room: "",
  });

  const [studentsList, setStudentsList] = useState([]);

  // Fetch students from Firestore
  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudentsList(studentsArray);
    } catch (error) {
      toast.error("Error fetching student data!");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !student.name ||
      !student.roll ||
      !student.email ||
      !student.phone ||
      !student.course ||
      !student.address ||
      !student.room
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "students"), student);
      toast.success("Student added successfully!");
      setStudent({
        name: "",
        roll: "",
        email: "",
        phone: "",
        course: "",
        address: "",
        room: "",
      });
      fetchStudents(); // Refresh the student list
    } catch (error) {
      toast.error("Error adding student!");
      console.error(error);
    }
  };

  return (
    <div>
      {/* Student Form */}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col><Form.Control placeholder="Name" name="name" value={student.name} onChange={handleChange} /></Col>
          <Col><Form.Control placeholder="Roll Number" name="roll" value={student.roll} onChange={handleChange} /></Col>
        </Row>
        <Row className="mb-3">
          <Col><Form.Control type="email" placeholder="Email" name="email" value={student.email} onChange={handleChange} /></Col>
          <Col><Form.Control placeholder="Phone" name="phone" value={student.phone} onChange={handleChange} /></Col>
        </Row>
        <Row className="mb-3">
          <Col><Form.Control placeholder="Course" name="course" value={student.course} onChange={handleChange} /></Col>
          <Col><Form.Control placeholder="Room No." name="room" value={student.room} onChange={handleChange} /></Col>
        </Row>
        <Row className="mb-3">
          <Col><Form.Control as="textarea" rows={2} placeholder="Address" name="address" value={student.address} onChange={handleChange} /></Col>
        </Row>
        <Button type="submit" variant="primary" className="w-100">Add Student</Button>
      </Form>

      {/* Student List Section */}
      <div className="mt-5">
        <h3>Student List</h3>
        {studentsList.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Room No.</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {studentsList.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>{student.room}</td>
                  <td>{student.address}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
