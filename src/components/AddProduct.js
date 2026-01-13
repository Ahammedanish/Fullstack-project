import { useState } from "react";
import "../styles/AddProduct.css";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price,
      image
    };

    console.log("Product Added:", newProduct);
    alert("Product added successfully!");
  };

  return (
    <div className="add-product">
      <h2>Add Rental Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        {/* Image Upload Space */}
        <label className="upload-box">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <span>Click to upload product image</span>
          )}
          <input type="file" accept="image/*" onChange={handleImage} hidden />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
