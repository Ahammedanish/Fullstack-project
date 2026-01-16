import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser({ name: "Admin" });
      }
    }

    const handleAuthChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser({ name: "Admin" });
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setUser(null);
    window.dispatchEvent(new CustomEvent('authChange'));
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>RentalApp</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/rentals">Rentals</Link>
        <Link to="/add-product">Add Product</Link>
        {isLoggedIn && <Link to="/bookings">Bookings</Link>}
        {isLoggedIn && <Link to="/profile">Profile</Link>}
        {isLoggedIn ? (
          <>
            <span>Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
