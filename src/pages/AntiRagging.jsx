// src/pages/AntiRagging.jsx
import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Spinner,
  Alert,
  Card,
} from 'react-bootstrap';

const AntiRagging = () => {
  const [complaint, setComplaint] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complaint.trim()) {
      toast.error('Please enter your complaint.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'raggingComplaints'), {
        complaint,
        timestamp: serverTimestamp(),
      });
      toast.success('Complaint submitted successfully.');
      setComplaint('');
    } catch (error) {
      toast.error('Error submitting complaint. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="shadow-sm p-4">
            <Card.Body>
              <h2 className="mb-3 text-danger">Anti-Ragging Policy</h2>
              <p className="text-muted">
                Ragging is a criminal offense under UGC regulations. Our institution adopts a strict zero-tolerance policy towards any act of ragging.
              </p>
              <a
                href="/pdfs/ugc-anti-ragging-guidelines.pdf"
                download
                className="btn btn-outline-primary mb-4"
              >
                Download UGC Anti-Ragging Guidelines
              </a>

              <hr />

              <h4 className="mb-3">Report Ragging Anonymously</h4>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel controlId="complaint" label="Your Complaint" className="mb-3">
                  <Form.Control
                    as="textarea"
                    style={{ height: '150px' }}
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    required
                  />
                </FloatingLabel>
                <Button variant="danger" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{' '}
                      Submitting...
                    </>
                  ) : (
                    'Submit Complaint'
                  )}
                </Button>
              </Form>

              <hr className="my-4" />

              <h5 className="mb-3">Helpline Contacts</h5>
              <Alert variant="light">
                <ul className="mb-0">
                  <li><strong>National Anti-Ragging Helpline:</strong> 1800-180-5522</li>
                  <li><strong>Email:</strong> helpline@antiragging.in</li>
                  <li><strong>Campus Security:</strong> +91-XXXXXXXXXX</li>
                </ul>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AntiRagging;
