import React from "react";

const Carousal = () => {
  return (
    <div className="position-relative">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >

        {/* Indicators */}
        <div className="carousel-indicators">
          <button data-bs-target="#carouselExampleControls" data-bs-slide-to="0" className="active"></button>
          <button data-bs-target="#carouselExampleControls" data-bs-slide-to="1"></button>
          <button data-bs-target="#carouselExampleControls" data-bs-slide-to="2"></button>
        </div>

        {/* Carousel inner */}
        <div className="carousel-inner">

          <div className="carousel-item active">
           <img
  src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
  className="d-block w-100"
  alt="burger"
  style={{
    height: "500px",
    objectFit: "cover",
    filter: "brightness(55%)"
  }}
/>

          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80"
              className="d-block w-100"
              alt="momos"
              style={{
    height: "500px",
    objectFit: "cover",
    filter: "brightness(55%)"
  }}
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80"
              className="d-block w-100"
              alt="chicken"
              style={{
    height: "500px",
    objectFit: "cover",
    filter: "brightness(55%)"
  }}
            />
          </div>

        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* SEARCH BAR OVER IMAGE */}
      <form
        className="d-flex position-absolute start-50 translate-middle-x"
        style={{ bottom: "40px", width: "70%", zIndex: 10 }}
      >
        <input
          className="form-control me-2 bg-dark text-light border-secondary"
          type="search"
          placeholder="Search"
        />
        <button className="btn btn-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Carousal;
