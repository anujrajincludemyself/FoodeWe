import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://foodewe-1.onrender.com/api/auth/login", {
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
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
      className="d-flex flex-column"
    >
      {/* Animated background elements */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
          
          .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          }
          
          .form-control:focus {
            border-color: #10b981;
            box-shadow: 0 0 0 0.25rem rgba(16, 185, 129, 0.25);
          }
          
          .btn-primary-custom {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border: none;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
          }
          
          .btn-primary-custom:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
          }
          
          .btn-outline-custom {
            border: 2px solid #10b981;
            color: #10b981;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .btn-outline-custom:hover {
            background: #10b981;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          }
          
          .input-icon {
            position: relative;
          }
          
          .input-icon i {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
          }
          
          .input-icon input {
            padding-left: 40px;
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-slide-in {
            animation: slideInUp 0.6s ease-out;
          }
        `}
      </style>

      <Navbar />

      <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3">
        <div
          className="glass-card animate-slide-in p-4 p-md-5"
          style={{
            width: "100%",
            maxWidth: "440px",
            borderRadius: "24px",
          }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{ color: "#1f2937", fontSize: "2rem" }}>
              Welcome Back
            </h2>
            <p className="text-muted mb-0">Login to continue to GoFood</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#374151" }}>
                Email Address
              </label>
              <div className="input-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280"
                  }}
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  required
                  style={{ paddingLeft: "45px", borderRadius: "12px" }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#374151" }}>
                Password
              </label>
              <div className="input-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-lock"
                  viewBox="0 0 16 16"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280"
                  }}
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
                </svg>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  required
                  style={{ paddingLeft: "45px", borderRadius: "12px" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary-custom btn-lg w-100 py-3 mb-3"
              style={{ borderRadius: "12px" }}
            >
              Login
            </button>

            <Link
              to="/signup"
              className="btn btn-outline-custom btn-lg w-100 py-3"
              style={{ borderRadius: "12px" }}
            >
              New User? Create Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
