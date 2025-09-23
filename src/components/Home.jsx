import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import UserMenu from "./UserMenu"; // import UserMenu
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  const handleClick = (path) => {
    if (loggedIn) navigate(path);
    else navigate("/login");
  };

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo">Blood Banking System</div>
        <div className="nav-buttons">
          {loggedIn ? (
            <UserMenu />
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="nav-btn login-btn">Login</button>
              <button onClick={() => navigate("/register")} className="nav-btn register-btn">Register</button>
            </>
          )}
        </div>
      </nav>

      <header className="header">
        <h1>Blood Banking System</h1>
        <p className="subtitle">
          Our platform makes blood donation and requests simple, safe, and efficient
        </p>
      </header>

      <section className="cards-section">
        <div className="card" onClick={() => handleClick("/donar")}>
          <img src="/donation1.jpeg.jpg" alt="Register as Donor" className="card-icon" />
          <h2>Register as Donor</h2>
          <p>Create your profile and join our community of life-savers.</p>
        </div>

        <div className="card" onClick={() => handleClick("/request")}>
          <img src="/donation2.jpg" alt="Request Blood" className="card-icon" />
          <h2>Request Blood</h2>
          <p>Submit requests specifying blood type, quantity, and urgency.</p>
        </div>

        <div className="card">
          <img src="/donation3.jpg" alt="Safe & Secure" className="card-icon" />
          <h2>Safe & Secure</h2>
          <p>All your data is encrypted and protected.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
