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
    <div style={{ background: "linear-gradient(to bottom, #f9fafb 0%, #e5e7eb 100%)", minHeight: "100vh" }}>
      <Navbar />

      <style>
        {`
          .search-box-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            width: 90%;
            max-width: 600px;
          }
          
          .search-input-modern {
            border-radius: 50px;
            padding: 14px 24px;
            border: none;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            font-size: 1rem;
          }
          
          .search-input-modern:focus {
            box-shadow: 0 10px 50px rgba(16, 185, 129, 0.3);
            outline: none;
          }
          
          .clear-btn {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          
          .clear-btn:hover {
            transform: scale(1.1);
          }
          
          .category-header {
            color: #1f2937;
            font-weight: 700;
            margin: 2rem 0 1rem 0;
            font-size: 1.75rem;
            position: relative;
            padding-left: 16px;
          }
          
          .category-header::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 5px;
            height: 30px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border-radius: 10px;
          }
          
          .gradient-divider {
            height: 3px;
            background: linear-gradient(90deg, #10b981 0%, #06b6d4 50%, transparent 100%);
            border: none;
            margin: 1rem 0 2rem 0;
            border-radius: 10px;
          }
          
          .carousel-item img {
            height: 450px;
            object-fit: cover;
          }
          
          @media (max-width: 768px) {
            .carousel-item img {
              height: 300px;
            }
            
            .category-header {
              font-size: 1.5rem;
            }
          }
        `}
      </style>

      {/* ---------------- CAROUSEL ---------------- */}
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id="carousel" style={{ position: "relative" }}>
          <div className="search-box-overlay">
            <div className="d-flex justify-content-center align-items-center">
              <input
                className="form-control search-input-modern me-2 flex-grow-1"
                type="search"
                placeholder="Search for delicious food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  className="btn btn-danger clear-btn"
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="carousel-item active">
            <img src="https://picsum.photos/1200/450?random=1" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="food" />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1200/450?random=2" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="food" />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1200/450?random=3" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="food" />
          </div>
        </div>
      </div>

      {/* ---------------- FOOD LIST ---------------- */}
      <div className="container py-4">
        {foodCat.length !== 0 &&
          foodCat.map((cat) => (
            <div className="mb-5" key={cat._id}>
              <h2 className="category-header">{cat.CategoryName}</h2>
              <hr className="gradient-divider" />

              <div className="row g-4">
                {foodItems
                  .filter(
                    (item) =>
                      item.CategoryName === cat.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item) => (
                    <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                      <Card item={item} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
