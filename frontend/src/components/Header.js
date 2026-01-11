import React from "react";

const Header = () => {
  return (
    <div className="container-fluid p-0">
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{
          height: "60vh",
          background:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
          color: "white",
        }}
      >
        <div>
          <h1 className="display-4 fw-bold">Welcome to GoFood 🍔</h1>
          <p className="lead">
            Delicious food delivered to your doorstep
          </p>
          <p className="fs-5">
            Fast • Fresh • Affordable
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
