import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddProduct.css";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login", { state: { from: "/add-product" } });
      return;
    }
  }, [navigate]);

  // convert image to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !location || !image) {
      alert("Please fill all fields and upload image");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("rentals")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || { name: "Admin" };

    const newRental = {
      id: Date.now(),
      title,
      price,
      description,
      location,
      image,
      postedBy: currentUser.name,
      postedDate: new Date().toLocaleDateString(),
    };

    localStorage.setItem(
      "rentals",
      JSON.stringify([...existing, newRental])
    );

    alert("Product added successfully!");
    navigate(`/product/${newRental.id}`);
  };

  return (
    <div className="add-product">
      <h2>Add Rental</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price per day"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* IMAGE PREVIEW */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
