import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else {
        alert(json.error || "Invalid credentials");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #00c6ff, #0fd850)",
        minHeight: "100vh",
      }}
      className="d-flex flex-column"
    >
      <Navbar />

      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card shadow-lg p-4"
          style={{ width: "380px", borderRadius: "15px" }}
        >
          <h3 className="text-center fw-bold text-success mb-4">
            Login to GoFood
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control form-control-lg"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100 py-2 mb-3">
              Login
            </button>

            <Link to="/signup" className="btn btn-outline-success w-100">
              New User? Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
