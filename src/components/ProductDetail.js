import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/listings.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLogin();
    window.addEventListener('authChange', checkLogin);
    return () => window.removeEventListener('authChange', checkLogin);
  }, []);

  const rentals = JSON.parse(localStorage.getItem("rentals")) || [];
  const product = rentals.find(item => item.id === parseInt(id));

  if (!product) {
    return <div className="page">Product not found</div>;
  }

  const handleBook = () => {
    if (!startDate || !endDate) {
      alert("Please select dates");
      return;
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login", { state: { from: `/product/${id}` } });
      return;
    }

    // Check if dates conflict with existing bookings
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const conflictingBooking = bookings.find(booking =>
      booking.productId === product.id &&
      ((new Date(startDate) >= new Date(booking.startDate) && new Date(startDate) <= new Date(booking.endDate)) ||
       (new Date(endDate) >= new Date(booking.startDate) && new Date(endDate) <= new Date(booking.endDate)))
    );

    if (conflictingBooking) {
      alert("Product is not available for these dates");
      return;
    }

    // Add booking
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { name: "Admin" };
    const newBooking = {
      id: Date.now(),
      productId: product.id,
      productTitle: product.title,
      startDate,
      endDate,
      bookedBy: currentUser.name,
      bookedDate: new Date().toLocaleDateString(),
    };

    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));

    alert("Booking successful!");
    navigate("/bookings");
  };

  return (
    <div className="product-detail">
      <button onClick={() => navigate("/rentals")} className="back-btn">← Back to Listings</button>
      <div className="detail-content">
        <img src={product.image} alt={product.title} className="detail-image" />
        <div className="detail-info">
          <h1>{product.title}</h1>
          <p className="detail-price">₹ {product.price} / day</p>
          <p className="detail-location">📍 {product.location}</p>
          <p className="detail-meta">Posted by {product.postedBy} on {product.postedDate}</p>
          {product.description && <p className="detail-description">{product.description}</p>}

          <div className="booking-section">
            <h3>Book this item</h3>
            {!isLoggedIn && <p style={{color: 'red'}}>Please login to book this product.</p>}
            <label>From:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>To:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button onClick={handleBook} className="book-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;