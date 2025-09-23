import React, { useContext } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const { setLoggedIn, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <FaUserCircle style={{ fontSize: 30, color: "#1976d2" }} title={user?.name} />
      <span style={{ fontWeight: 600, color: "#222" }}>{user?.name}</span>
      <FaSignOutAlt
        onClick={handleLogout}
        style={{ fontSize: 28, color: "#e63946", cursor: "pointer" }}
        title="Logout"
      />
    </div>
  );
};

export default UserMenu;
