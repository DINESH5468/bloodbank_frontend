import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { AuthContext } from "./AuthContext"; // update the path

const Register = () => {
  const { setLoggedIn, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name && bloodType && email && password){
      setLoggedIn(true);
      setUser({ name }); // set real name
      alert("Registration Successful!");
      navigate("/donar");
    } else alert("Please fill in all fields");
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="text" placeholder="Blood Type" value={bloodType} onChange={e=>setBloodType(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
