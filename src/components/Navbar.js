import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>RentalApp</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/listings">Rentals</Link>
        <Link to="/add-product">Add Product</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
