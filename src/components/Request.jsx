import React, { useState } from "react";
//import Request from "./Request";
import "./Request.css";



const Request = () => {
  const [requestData, setRequestData] = useState({
    name: "",
    bloodGroup: "",
    phone: "",
    email: "",
    location: "",
    reason: "",
  });

  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setRequestData({ ...requestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequests([...requests, requestData]);
    setRequestData({
      name: "",
      bloodGroup: "",
      phone: "",
      email: "",
      location: "",
      reason: "",
    });
    setShowModal(false);
    alert("Blood request submitted successfully!");
  };

  return (
    <div className="request-container">
      <button className="request-btn" onClick={() => setShowModal(true)}>
        Request Blood
      </button>

      <h2>Blood Requests</h2>
      <table className="request-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Location</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req, index) => (
              <tr key={index}>
                <td>{req.name}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.phone}</td>
                <td>{req.email}</td>
                <td>{req.location}</td>
                <td>{req.reason}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No requests submitted yet.</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Blood Request Form</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input type="text" name="name" value={requestData.name} onChange={handleChange} required />

              <label>Blood Group:</label>
              <select name="bloodGroup" value={requestData.bloodGroup} onChange={handleChange} required>
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>

              <label>Phone:</label>
              <input type="text" name="phone" value={requestData.phone} onChange={handleChange} required />

              <label>Email:</label>
              <input type="email" name="email" value={requestData.email} onChange={handleChange} required />

              <label>Location:</label>
              <input type="text" name="location" value={requestData.location} onChange={handleChange} required />

              <label>Reason for Request:</label>
              <textarea name="reason" value={requestData.reason} onChange={handleChange} required />

              <button type="submit">Submit Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
