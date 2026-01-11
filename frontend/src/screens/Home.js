import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setFoodItems(data[0]);     // food_items
      setFoodCat(data[1]);       // foodCategory
    } catch (error) {
      console.error("Failed to load food data", error);
    }
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />

      {/* ---------------- CAROUSEL ---------------- */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn text-white bg-danger" onClick={() => setSearch("")}>
                X
              </button>
            </div>
          </div>

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="food" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="food" />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="food" />
          </div>
        </div>
      </div>

      {/* ---------------- FOOD LIST ---------------- */}
      <div className="container">
        {foodCat.length !== 0 &&
          foodCat.map((cat) => (
            <div className="row mb-3" key={cat._id}>
              <div className="fs-3 m-3">{cat.CategoryName}</div>
              <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

              {foodItems
                .filter(
                  (item) =>
                    item.CategoryName === cat.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <div key={item._id} className="col-12 col-md-6 col-lg-3">
                    <Card item={item} />
                  </div>
                ))}
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
