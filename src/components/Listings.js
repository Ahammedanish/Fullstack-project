import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/listings.css";

function Listings() {
  const [rentals, setRentals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("rentals")) || [];
    setRentals(stored);
  }, []);

  // 🔴 DELETE FUNCTION
  const handleDelete = (id) => {
    const updated = rentals.filter((item) => item.id !== id);

    setRentals(updated);
    localStorage.setItem("rentals", JSON.stringify(updated));
  };

  const filtered = rentals.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="listings-page">
      <h1 className="listings-title">All Rentals</h1>

      <div className="listings-search">
        <input
          type="text"
          placeholder="Search rentals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="listings-grid">
        {filtered.map((item) => (
          <div key={item.id} className="rental-card-link">
            <Link to={`/product/${item.id}`}>
              <div className="rental-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rental-image"
                />
                <h3>{item.title}</h3>
                <p>₹ {item.price} / day</p>              <p className="rental-location">📍 {item.location}</p>
              <p className="rental-meta">Posted by {item.postedBy} on {item.postedDate}</p>                {item.description && <p className="rental-description">{item.description}</p>}
              </div>
            </Link>
            {/* DELETE BUTTON */}
            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
