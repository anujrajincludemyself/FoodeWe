import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      const data = await res.json();

      if (data.orderData && data.orderData.order_data) {
        setOrderData(data.orderData.order_data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container">
        {orderData.length === 0 && <h4 className="mt-5 text-center">No Orders Found</h4>}

        {orderData
          .slice(0)
          .reverse()
          .map((order, index) => (
            <div key={index}>
              {/* Order Date */}
              <div className="m-auto mt-5">
                <h5>{order[0].Order_date}</h5>
                <hr />
              </div>

              <div className="row">
                {order.slice(1).map((item, idx) => (
                  <div key={idx} className="col-12 col-md-6 col-lg-3">
                    <div className="card mt-3" style={{ width: "16rem" }}>
                      <img
                        src={item.img}
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: "120px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="container p-0">
                          <span className="m-1">Qty: {item.qty}</span>
                          <span className="m-1">Size: {item.size}</span>
                          <div className="fs-5 mt-2">
                            ₹{item.price}/-
                          </div>
                        </div>
                      </div>
                    </div>
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
