// components/CreatePoll.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const userRef = doc(db, 'users', auth.currentUser?.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().role === 'admin') {
        setIsAdmin(true);
      } else {
        navigate('/polls');
      }
    };
    checkAdmin();
  }, [navigate]);

  const handleCreate = async () => {
    const formattedOptions = options.map(opt => ({ text: opt, count: 0 }));
    await addDoc(collection(db, 'polls'), {
      question,
      options: formattedOptions,
      votedUsers: [],
      createdBy: auth.currentUser?.uid,
      timestamp: serverTimestamp()
    });
    setQuestion('');
    setOptions(['', '']);
    alert("Poll created successfully");
  };

  if (!isAdmin) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="container mt-4">
      <h4>Create Poll</h4>
      <input
        className="form-control mb-2"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter poll question"
      />
      {options.map((opt, i) => (
        <input
          key={i}
          className="form-control mb-2"
          value={opt}
          onChange={(e) => {
            const newOpts = [...options];
            newOpts[i] = e.target.value;
            setOptions(newOpts);
          }}
          placeholder={`Option ${i + 1}`}
        />
      ))}
      <button className="btn btn-primary" onClick={handleCreate}>Create Poll</button>
    </div>
  );
};

export default CreatePoll;
