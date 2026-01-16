import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleExplore = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/rentals");   // ONLY rentals
  };

  const handleLogin = () => {
    navigate("/login");
    setShowPopup(false);
  };

  const handleSignup = () => {
    navigate("/register");
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1>Welcome to RentalApp</h1>
        <p>Rent Smart. Live Better.</p>

        <button
          type="button"
          className="explore-btn"
          onClick={handleExplore}
        >
          Explore Now
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Join RentalApp</h2>
            <p>Sign up or log in to start renting!</p>
            <div className="popup-buttons">
              <button onClick={handleLogin}>Login</button>
              <button onClick={handleSignup}>Sign Up</button>
            </div>
            <button className="close-btn" onClick={closePopup}>×</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
