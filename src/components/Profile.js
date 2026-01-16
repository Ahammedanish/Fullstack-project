import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    } else {
      // For demo admin
      setUser({ name: "Admin", email: "admin@gmail.com" });
    }
  }, [navigate]);

  if (!user) {
    return <div className="page">Loading...</div>;
  }

  return (
    <div className="page">
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
