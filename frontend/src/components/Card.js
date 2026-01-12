import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const options = props.item.options[0];   // FIXED
  const priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();

  const foodItem = props.item;

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => setQty(e.target.value);
  const handleOptions = (e) => setSize(e.target.value);

  const finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === foodItem._id && item.size === size);

    if (food) {
      await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty,
        size,
        img: foodItem.img,
      });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="h-100">
      <style>
        {`
          .food-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .food-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
          }
          
          .food-card-img {
            height: 200px;
            object-fit: cover;
            width: 100%;
            transition: transform 0.3s ease;
          }
          
          .food-card:hover .food-card-img {
            transform: scale(1.05);
          }
          
          .food-card-body {
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          }
          
          .food-card-title {
            font-size: 1.125rem;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 0.75rem;
          }
          
          .select-modern {
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            padding: 0.5rem;
            font-size: 0.875rem;
            transition: all 0.2s ease;
            background: white;
            color: #374151;
          }
          
          .select-modern:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          }
          
          .price-tag {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .add-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            border: none;
            color: white;
            font-weight: 600;
            padding: 0.5rem 1.5rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
          
          .add-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
          }
          
          .add-btn:active {
            transform: scale(0.98);
          }
        `}
      </style>

      <div className="food-card">
        <div style={{ overflow: "hidden" }}>
          <img
            src={foodItem.img}
            className="food-card-img"
            alt={foodItem.name}
          />
        </div>

        <div className="food-card-body">
          <h5 className="food-card-title">{foodItem.name}</h5>

          <div className="d-flex gap-2 mb-3">
            <select
              className="select-modern flex-fill"
              onClick={handleClick}
              onChange={handleQty}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <option key={i} value={i}>
                  Qty: {i}
                </option>
              ))}
            </select>

            <select
              className="select-modern flex-fill"
              ref={priceRef}
              onClick={handleClick}
              onChange={handleOptions}
            >
              {priceOptions.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="price-tag">₹{finalPrice}</span>

            <button
              className="add-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
