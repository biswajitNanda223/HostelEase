import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBrain, FaPhoneAlt } from 'react-icons/fa';

const MentalHealthPage = () => {
  const [resources, setResources] = useState([]);
  const [query, setQuery] = useState("student stress");
  const [loading, setLoading] = useState(true);

  // 🧠 Replace this with your actual NewsAPI key or custom backend if needed
  const NEWS_API_KEY = '7156beaab24a452296391cb91c161bf5';

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=6&apiKey=${NEWS_API_KEY}`
      );
      const data = await res.json();
      const articles = data.articles.map(article => ({
        title: article.title,
        desc: article.description,
        link: article.url
      }));
      setResources(articles);
    } catch (err) {
      console.error(err);
      setResources([
        {
          title: "Self-Care Tips for Hostel Students",
          desc: "Simple ways to manage stress, build routine and stay connected.",
          link: "#"
        },
        {
          title: "Signs You Should Talk to Someone",
          desc: "It’s okay to not be okay. Spot these early signs and seek help.",
          link: "#"
        },
        {
          title: "Online Counseling Platforms for Students",
          desc: "Affordable and accessible help at your fingertips.",
          link: "#"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [query]);

  // 🗓️ Daily Affirmations Array
  const affirmations = [
    "You are enough, just as you are.",
    "Take one step at a time. You’ve got this.",
    "Your mental health is just as important as your physical health.",
    "Believe in yourself. You're stronger than you think.",
    "It's okay to have bad days. They don't define you.",
    "Progress is progress, no matter how small."
  ];

  // Get today's affirmation (based on the date)
  const dailyAffirmation = affirmations[new Date().getDate() % affirmations.length];

  return (
    <motion.div className="container py-5"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-center mb-4 fw-bold"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🧠 Mental Health & Wellness
      </motion.h1>

      <p className="text-center mb-4">Because your well-being is your top priority.</p>

      {/* Daily Affirmation Section */}
      <div className="alert alert-info text-center mb-5">
        <h4>Today's Affirmation:</h4>
        <p><strong>{dailyAffirmation}</strong></p>
      </div>

      <div className="d-flex justify-content-center mb-5">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search support topics (e.g. anxiety, homesickness)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading mental health resources...</div>
      ) : (
        <div className="row">
          {resources.map((item, idx) => (
            <motion.div
              className="col-md-4 mb-4"
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="card h-100 border-0 shadow-lg">
                <div className="card-body">
                  <h5 className="card-title text-primary">{item.title}</h5>
                  <p className="card-text">{item.desc || "Click to read more..."}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-gradient btn-sm">
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Footer Info Cards */}
      <div className="row mt-5">
        <div className="col-md-4 text-center">
          <FaBrain size={40} className="text-success mb-2" />
          <h5 className="fw-bold">Mind Matters</h5>
          <p>Join wellness workshops and meditation classes hosted weekly.</p>
        </div>
        <div className="col-md-4 text-center">
          <FaHeart size={40} className="text-danger mb-2" />
          <h5 className="fw-bold">Emotional Support</h5>
          <p>Talk to a trained counselor privately, anytime.</p>
        </div>
        <div className="col-md-4 text-center">
          <FaPhoneAlt size={30} className="text-warning mb-2" />
          <h5 className="fw-bold">24x7 Helpline</h5>
          <p><strong>1800-123-HELP</strong> — Always here for you.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MentalHealthPage;
