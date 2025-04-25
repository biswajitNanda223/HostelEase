import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { Button, Form, InputGroup, Col, Row, Card, Container, Badge } from "react-bootstrap";
import { FaTrash, FaEdit, FaPlus, FaPoll } from "react-icons/fa";

const PollManagement = () => {
  const [polls, setPolls] = useState([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "", count: 0 }]);
  const [editingPollId, setEditingPollId] = useState(null);
  const [status, setStatus] = useState("active");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "polls"), (snapshot) => {
      const pollData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPolls(pollData);
    });
    return () => unsubscribe();
  }, []);

  const handlePollSubmit = async (e) => {
    e.preventDefault();

    const pollData = {
      question: pollQuestion,
      options: options.map((opt) => ({ text: opt.text, count: 0 })),
      status: status,
    };

    if (editingPollId) {
      const pollRef = doc(db, "polls", editingPollId);
      await updateDoc(pollRef, pollData);
      setEditingPollId(null);
    } else {
      await addDoc(collection(db, "polls"), pollData);
    }

    setPollQuestion("");
    setOptions([{ text: "", count: 0 }]);
    setStatus("active");
  };

  const handleDeletePoll = async (id) => {
    const pollRef = doc(db, "polls", id);
    await deleteDoc(pollRef);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, { text: "", count: 0 }]);
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm mb-4">
        <h4 className="text-success mb-4">
          <FaPoll className="me-2" />
          {editingPollId ? "Edit Poll" : "Create a New Poll"}
        </h4>

        <Form onSubmit={handlePollSubmit}>
          <Form.Group className="mb-3" controlId="pollQuestion">
            <Form.Label>Poll Question <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your poll question"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Label>Poll Options <span className="text-danger">*</span></Form.Label>
          {options.map((opt, index) => (
            <Row key={index} className="mb-2">
              <Col md={10}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={opt.text}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                  />
                </InputGroup>
              </Col>
              <Col md={2}>
                <Button
                  variant="outline-danger"
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 1}
                  className="w-100"
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          <Button variant="outline-secondary" onClick={addOption} className="mb-3">
            <FaPlus className="me-1" />
            Add Option
          </Button>

          <Form.Group className="mb-3" controlId="pollStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} required>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            {editingPollId ? "Update Poll" : "Create Poll"}
          </Button>
        </Form>
      </Card>

      <h5 className="text-dark mb-3">All Polls</h5>

      {polls.length > 0 ? (
        polls.map((poll) => (
          <Card key={poll.id} className="mb-4 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5>{poll.question}</h5>
              <Badge bg={poll.status === "active" ? "success" : "secondary"}>
                {poll.status.toUpperCase()}
              </Badge>
            </div>

            <div style={{ height: "300px", marginTop: "1rem" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={poll.options}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="text" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4caf50" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 d-flex gap-2">
              <Button variant="danger" onClick={() => handleDeletePoll(poll.id)}>
                <FaTrash className="me-1" /> Delete
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  setPollQuestion(poll.question);
                  setOptions(poll.options);
                  setStatus(poll.status);
                  setEditingPollId(poll.id);
                }}
              >
                <FaEdit className="me-1" /> Edit
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-muted">No polls available.</p>
      )}
    </Container>
  );
};

export default PollManagement;
