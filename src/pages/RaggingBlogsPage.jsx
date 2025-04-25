import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RaggingBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentKeyword, setCurrentKeyword] = useState('');

  const NEWS_API_KEY = '3fbde3899b2547069cbe699dfdb41b19';

  const keywords = [
    "college ragging",
    "anti ragging",
    "ragging incidents",
    "ragging in India",
    "ragging awareness",
    "ragging news",
    "ragging punishment",
    "ragging cases",
    "ragging laws"
  ];

  const truncateText = (text, maxLength = 250) => {
    if (!text) return 'No description available.';
    return text.length > maxLength ? text.substring(0, maxLength).trim() + '...' : text;
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setBlogs([]);

      const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
      setCurrentKeyword(randomKeyword);

      const timestamp = new Date().getTime();
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${randomKeyword}&language=en&sortBy=publishedAt&pageSize=6&apiKey=${NEWS_API_KEY}&_=${timestamp}`
      );
      const data = await res.json();

      const fetchedBlogs = data.articles.map((article) => ({
        title: article.title,
        desc: truncateText(article.description),
        fullDesc: article.description || 'No description available.',
        author: article.author || 'Unknown',
        link: article.url,
        image: article.urlToImage || 'https://via.placeholder.com/600x300?text=No+Image'
      }));

      setBlogs(fetchedBlogs);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-center mb-2 fw-bold"
        style={{
          background: 'linear-gradient(to right, #dc3545, #ff6f61)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem'
        }}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🚫 Ragging Awareness Blogs
      </motion.h1>

      <p className="text-center text-muted mb-3 fs-5">
        Empowering students through awareness, real-life experiences, and the latest news.
      </p>

      <p className="text-center text-secondary mb-4">
        <em>Current keyword: <strong>{currentKeyword}</strong></em>
      </p>

      {/* 🔄 Refresh Button */}
      <div className="text-center mb-5">
        <button
          onClick={fetchBlogs}
          className="btn btn-outline-danger fw-semibold rounded-pill px-4"
        >
          🔄 Refresh News
        </button>
      </div>

      {loading ? (
        <div className="text-center fs-5 fw-semibold text-secondary">Loading blogs...</div>
      ) : (
        <div className="row">
          {blogs.map((blog, idx) => (
            <motion.div
              className="col-md-4 mb-4"
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
            >
              <div className="card h-100 shadow-sm border-0 rounded-4 bg-light overflow-hidden">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt="News"
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column px-4 py-4">
                  <h5 className="card-title fw-semibold text-dark mb-2">{blog.title}</h5>
                  <p className="text-secondary mt-3">
                    <small>By: <strong>{blog.author}</strong></small>
                  </p>
                  <a
                    href={blog.link}
                    className="btn btn-danger btn-sm rounded-pill fw-medium mt-auto align-self-start px-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Blog
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RaggingBlogsPage;
