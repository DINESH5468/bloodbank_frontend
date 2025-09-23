import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Donar.css";

const Donar = () => {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState("register"); // register → login → list
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    bloodGroup: "",
    username: "",
    password: "",
    email: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [donors, setDonors] = useState([]);

  // ✅ Redirect website user if not logged in
  useEffect(() => {
    if (!loggedIn) navigate("/login");
  }, [loggedIn, navigate]);

  // ------------------ Handlers ------------------
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  // Register donor
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Donor Registered! Please login as donor.");
        setStep("login");
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during registration.");
    }
  };

  // Donor login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/api/donors/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data) {
          alert("Donor Login Successful!");
          setStep("list");
          fetchDonors();
        } else {
          alert("Invalid donor credentials");
        }
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during login");
    }
  };

  // Fetch all donors
  const fetchDonors = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/donors");
      const data = await res.json();
      setDonors(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ------------------ Render ------------------
  if (step === "register") {
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleRegister}>
          <h2>Donor Registration</h2>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <select name="bloodGroup" onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
          </select>
          <input type="text" name="username" placeholder="Donor Username" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register as Donor</button>
        </form>
      </div>
    );
  }

  if (step === "login") {
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2>Donor Login</h2>
          <input type="text" name="username" placeholder="Username" onChange={handleLoginChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  if (step === "list") {
    return (
      <div className="donor-list">
        <h2>Donor List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Blood Group</th><th>Location</th><th>Phone</th><th>Email</th><th>Username</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td>{d.bloodGroup}</td>
                <td>{d.location}</td>
                <td>{d.phone}</td>
                <td>{d.email}</td>
                <td>{d.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

export default Donar;
