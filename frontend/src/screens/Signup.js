import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleLocation = async () => {
    try {
      const position = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej)
      );

      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      const response = await fetch("http://localhost:5000/api/auth/getlocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latlong: { lat, long } }),
      });

      const data = await response.json();
      setAddress(data.location);
      setCredentials({ ...credentials, location: data.location });
    } catch (error) {
      alert("Please allow location access");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/login");
    } else {
      alert(json.error || "Signup failed");
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
            background: white;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .btn-outline-custom:hover {
            background: #10b981;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          }
          
          .btn-location {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            border: none;
            color: white;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .btn-location:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
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
          
          .form-divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 1.5rem 0;
          }
          
          .form-divider::before,
          .form-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid #e5e7eb;
          }
          
          .form-divider span {
            padding: 0 1rem;
            color: #6b7280;
            font-size: 0.875rem;
            font-weight: 500;
          }
        `}
      </style>

      <Navbar />

      <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3 py-4">
        <div
          className="glass-card animate-slide-in p-4 p-md-5"
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "24px",
          }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2" style={{ color: "#1f2937", fontSize: "2rem" }}>
              Create Account
            </h2>
            <p className="text-muted mb-0">Join GoFood today</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#374151" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280"
                  }}
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                <input
                  className="form-control form-control-lg"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  placeholder="Enter your full name"
                  required
                  style={{ paddingLeft: "45px", borderRadius: "12px" }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#374151" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
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

            {/* Address Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#374151" }}>
                Delivery Address
              </label>
              <div style={{ position: "relative" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-geo-alt"
                  viewBox="0 0 16 16"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6b7280"
                  }}
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
                <input
                  className="form-control form-control-lg"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setCredentials({ ...credentials, location: e.target.value });
                  }}
                  placeholder="Enter your address"
                  required
                  style={{ paddingLeft: "45px", borderRadius: "12px" }}
                />
              </div>
            </div>

            {/* Location Button */}
            <div className="mb-3">
              <button
                type="button"
                onClick={handleLocation}
                className="btn btn-location w-100 py-2"
                style={{ borderRadius: "12px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-crosshair me-2"
                  viewBox="0 0 16 16"
                  style={{ marginBottom: "2px" }}
                >
                  <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                </svg>
                Use Current Location
              </button>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#374151" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
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
                  placeholder="Create a password"
                  required
                  style={{ paddingLeft: "45px", borderRadius: "12px" }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary-custom btn-lg w-100 py-3 mb-3"
              style={{ borderRadius: "12px" }}
            >
              Create Account
            </button>

            {/* Login Link */}
            <Link
              to="/login"
              className="btn btn-outline-custom btn-lg w-100 py-3"
              style={{ borderRadius: "12px" }}
            >
              Already have an account? Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
