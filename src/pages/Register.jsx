import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Container, Form, Button } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    remember: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, role } = formData;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (role === "student") {
      const studentQuery = query(collection(db, "students"), where("email", "==", email));
      const studentSnapshot = await getDocs(studentQuery);

      if (studentSnapshot.empty) {
        toast.error("You're not registered in the system. Please contact the warden.");
        return;
      }
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        role,
      });

      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh" }}>
      <Card className="shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-3 text-success">Create Account</h3>
        <p className="text-center text-muted mb-4">Fill in the form below to register</p>

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your institutional email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="Create a strong password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Select Role <span className="text-danger">*</span></Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange} required>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRemember">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              name="remember"
              onChange={handleChange}
              checked={formData.remember}
              required
              feedback="You must agree before submitting."
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already have an account? <a href="/login">Login here</a>
          </small>
        </div>
      </Card>
    </Container>
  );
};

export default Register;
