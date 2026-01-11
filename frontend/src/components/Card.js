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
<div className="col mb-4">
    <div
      className="card h-100 shadow-sm border-0"
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        transition: "0.3s",
        background: "#1e1e1e",
      }}
    >
      <img
        src={foodItem.img}
        className="card-img-top"
        alt="food"
        style={{
          height: "160px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-white">{foodItem.name}</h5>

        <div className="d-flex align-items-center justify-content-between mt-2">
          <select
            className="form-select form-select-sm w-50 me-2 bg-dark text-white border-success"
            onClick={handleClick}
            onChange={handleQty}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          <select
            className="form-select form-select-sm w-50 bg-dark text-white border-success"
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

        <div className="mt-3 d-flex justify-content-between align-items-center">
          <span className="fs-5 fw-bold text-success">₹{finalPrice}</span>

          <button
            className="btn btn-sm btn-success px-3"
            onClick={handleAddToCart}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
);

}
