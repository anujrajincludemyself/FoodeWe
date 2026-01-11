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
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg")', backgroundSize: "cover", height: "100vh" }}>
      <Navbar />

      <div className="container">
        <form className="w-50 m-auto mt-5 border bg-dark border-success rounded" onSubmit={handleSubmit}>
          <div className="m-3">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>

          <div className="m-3">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" value={credentials.email} onChange={onChange} />
          </div>

          <div className="m-3">
            <label className="form-label">Address</label>
<input
  className="form-control"
  value={address}
  onChange={(e) => {
    setAddress(e.target.value);
    setCredentials({ ...credentials, location: e.target.value });
  }}
/>
          </div>

          <div className="m-3">
            <button type="button" onClick={handleLocation} className="btn btn-success">
              Get Current Location
            </button>
          </div>

          <div className="m-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Signup</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </div>
  );
}
