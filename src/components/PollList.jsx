// components/PollList.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'polls'), (snap) => {
      const allPolls = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPolls(allPolls);
    });
    return () => unsub();
  }, []);

  const handleVote = async (poll, index) => {
    if (poll.votedUsers.includes(auth.currentUser.uid)) return alert('You already voted!');
    const pollRef = doc(db, 'polls', poll.id);
    const updatedOptions = [...poll.options];
    updatedOptions[index].count += 1;
    const updatedVotedUsers = [...poll.votedUsers, auth.currentUser.uid];
    await updateDoc(pollRef, {
      options: updatedOptions,
      votedUsers: updatedVotedUsers
    });
  };

  return (
    <div className="container mt-4">
      <h4>Active Polls</h4>
      {polls.map((poll) => (
        <div key={poll.id} className="card mb-3 p-3">
          <h5>{poll.question}</h5>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={poll.options}>
                <XAxis dataKey="text" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {poll.options.map((opt, i) => (
            <button
              key={i}
              className="btn btn-outline-primary me-2 mb-2"
              onClick={() => handleVote(poll, i)}
              disabled={poll.votedUsers.includes(auth.currentUser.uid)}
            >
              {opt.text} ({opt.count})
            </button>
          ))}
          {poll.votedUsers.includes(auth.currentUser.uid) && (
            <p className="text-success mt-2">✅ You have already voted</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PollList;
