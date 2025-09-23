import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Donar from "./components/Donar";
import Request from "./components/Request";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthContext } from "./components/AuthContext";

const App = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected Routes */}
      <Route path="/donar" element={loggedIn ? <Donar /> : <Navigate to="/login" />} />
      <Route path="/request" element={loggedIn ? <Request /> : <Navigate to="/login" />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
