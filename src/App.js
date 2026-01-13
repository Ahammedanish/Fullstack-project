import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Listings from "./components/Listings";
import AddProduct from "./components/AddProduct";
import MyBookings from "./components/MyBookings";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rentals" element={<Listings />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
