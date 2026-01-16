import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { name: "Admin" };
    const userBookings = allBookings.filter(booking => booking.bookedBy === currentUser.name);
    setBookings(userBookings);
  }, [navigate]);

  const cancelBooking = (bookingId) => {
    const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    alert("Booking cancelled successfully!");
  };

  return (
    <div className="page">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.productTitle}</h3>
              <p>From: {booking.startDate}</p>
              <p>To: {booking.endDate}</p>
              <p>Booked on: {booking.bookedDate}</p>
              <button onClick={() => cancelBooking(booking.id)} className="cancel-btn">Cancel Booking</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
