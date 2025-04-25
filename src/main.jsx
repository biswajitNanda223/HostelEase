import React from 'react';  // Import React
import ReactDOM from 'react-dom/client';  // Import ReactDOM
import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap styles
import 'react-toastify/dist/ReactToastify.css';  // Toastify styles
import { BrowserRouter } from 'react-router-dom';  // Router
import { AuthProvider } from './context/AuthContext';  // AuthContext
import App from './App';  // Main App component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
